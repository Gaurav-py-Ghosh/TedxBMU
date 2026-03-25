const generateTicketId = require("../../../utils/generateTicketId");
const generateQR = require("../../../utils/generateQR");
const { uploadQR, deleteQR } = require("../../../utils/uploadQR");
const supabase = require("../../config/db");
const { getEmailService } = require("../../services/email");
const syncToGoogleSheet = require("../../../utils/syncToGoogleSheet");

/**
 * Create a full registration.
 * Works standalone (free) or called by payment.service.verifyAndRegister() (paid).
 *
 * Flow: duplicate check → generate ticket → QR → upload → email → DB insert
 * Rolls back QR on any failure.
 */
const createRegistration = async (data) => {
  const { name, email, phone, college, payment_id, order_id, amount, payment_status } = data;

  // ── 1. Sanitize ──────────────────────────────────────────────
  const cleanEmail = email.trim().toLowerCase();
  const cleanName = name.trim();
  const cleanPhone = phone.trim();
  const cleanCollege = college.trim();

  // ── 2. Duplicate check (safety net — also checked in createOrder) ──
  const { data: existing, error: checkErr } = await supabase
    .from("registrations")
    .select("email")
    .eq("email", cleanEmail)
    .maybeSingle();

  if (checkErr) {
    console.error("Duplicate check error:", checkErr);
    throw new Error("Failed to verify registration. Please try again.");
  }

  if (existing) {
    const err = new Error(`User with email ${cleanEmail} is already registered`);
    err.code = "DUPLICATE_EMAIL";
    throw err;
  }

  // ── 3. Generate ticket ID, QR code, and upload ──────────────
  const ticket_id = generateTicketId();
  let qrUrl = null;

  const qrBase64 = await generateQR(ticket_id);
  qrUrl = await uploadQR(ticket_id, qrBase64);

  // ── 4. Send ticket email ────────────────────────────────────
  const emailService = getEmailService();
  let emailSent = false;

  const emailResult = await emailService.sendTicketEmail({
    to: cleanEmail,
    name: cleanName,
    ticketId: ticket_id,
    qrCodeUrl: qrUrl,
    college: cleanCollege,
  });

  if (!emailResult.success) {
    // Payment is already done — log error but DON'T block registration
    console.error("Email failed after payment (non-blocking):", {
      ticket_id,
      email: cleanEmail,
      error: emailResult.error,
    });
  } else {
    emailSent = true;
  }

  // ── 5. Insert to DB ────────────────────────────────────────
  const { data: result, error: insertError } = await supabase
    .from("registrations")
    .insert([
      {
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        college: cleanCollege,
        ticket_id,
        payment_status: payment_status || "free",
        payment_id: payment_id || null,
        order_id: order_id || null,
        amount: amount || null,
        qr_code_url: qrUrl,
        email_sent: emailSent,
      },
    ])
    .select();

  if (insertError) {
    console.error("Database insertion error:", insertError);

    // Race-condition duplicate (DB unique constraint)
    if (
      insertError.code === "23505" ||
      (insertError.message && insertError.message.includes("duplicate"))
    ) {
      await deleteQR(ticket_id);
      const err = new Error("This email or phone is already registered");
      err.code = "DUPLICATE_RACE";
      throw err;
    }

    await deleteQR(ticket_id);
    throw new Error("Failed to save registration. Please contact support.");
  }

  // ── 6. Sync to Google Sheet (non-blocking) ─────────────────
  syncToGoogleSheet(result[0]);

  return {
    ...result[0],
    qr_url: qrUrl,
  };
};

module.exports = { createRegistration };
