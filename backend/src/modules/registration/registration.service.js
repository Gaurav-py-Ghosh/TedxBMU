const generateTicketId = require("../../../utils/generateTicketId");
const generateQR = require("../../../utils/generateQR");
const { uploadQR, deleteQR } = require("../../../utils/uploadQR");
const supabase = require("../../config/db");
const { getEmailService } = require("../../services/email");
const { syncToGoogleSheet } = require("../../../utils/syncToGoogleSheet");

/**
 * Create a full registration.
 * Works standalone (free) or called by payment.service.verifyAndRegister() (paid).
 *
 * Flow: duplicate check → generate ticket → QR → upload → email → DB insert
 * Rolls back QR on any failure.
 */
const createRegistration = async (data) => {
  const { name, email, phone, college, shift, payment_id, order_id, amount, payment_status } = data;

  // ── 1. Sanitize ──────────────────────────────────────────────
  const cleanEmail = email.trim().toLowerCase();
  const cleanName = name.trim();
  const cleanPhone = phone.trim();
  const cleanCollege = college.trim();
  const cleanShift = shift.trim();

  // ── 2. Duplicate check (safety net) ──
  console.log("[REG] Checking for duplicate email:", cleanEmail);
  const { data: existingEmail, error: emailCheckErr } = await supabase
    .from("registrations")
    .select("email")
    .eq("email", cleanEmail)
    .maybeSingle();

  if (emailCheckErr) {
    console.error("[REG] Email duplicate check error:", emailCheckErr);
    throw new Error(`DB Error (email check): ${emailCheckErr.message}`);
  }

  if (existingEmail) {
    console.warn("[REG] Duplicate email found:", cleanEmail);
    const err = new Error(`User with email ${cleanEmail} is already registered`);
    err.code = "DUPLICATE_EMAIL";
    throw err;
  }

  console.log("[REG] Checking for duplicate phone:", cleanPhone);
  const { data: existingPhone, error: phoneCheckErr } = await supabase
    .from("registrations")
    .select("phone")
    .eq("phone", cleanPhone)
    .maybeSingle();

  if (phoneCheckErr) {
    console.error("[REG] Phone duplicate check error:", phoneCheckErr);
    throw new Error(`DB Error (phone check): ${phoneCheckErr.message}`);
  }

  if (existingPhone) {
    console.warn("[REG] Duplicate phone found:", cleanPhone);
    const err = new Error(`Phone number ${cleanPhone} is already registered`);
    err.code = "DUPLICATE_PHONE";
    throw err;
  }

  // ── 3. Generate ticket ID, QR code, and upload ──────────────
  console.log("[REG] Generating ticket and QR...");
  const ticket_id = generateTicketId();
  let qrUrl = null;

  try {
    const qrBase64 = await generateQR(ticket_id);
    console.log("[REG] Uploading QR to storage...");
    qrUrl = await uploadQR(ticket_id, qrBase64);
  } catch (err) {
    console.error("[REG] QR generation/upload failed:", err.message);
    throw new Error(`QR Error: ${err.message}`);
  }

  // ── 4. Send ticket email ────────────────────────────────────
  console.log("[REG] Sending ticket email...");
  const emailService = getEmailService();
  let emailSent = false;
  
  try {
    const emailResult = await emailService.sendTicketEmail({
      to: cleanEmail,
      name: cleanName,
      ticketId: ticket_id,
      qrCodeUrl: qrUrl,
      college: cleanCollege,
    });

    if (!emailResult.success) {
      console.error("[REG] Email failed (non-blocking):", emailResult.error);
    } else {
      emailSent = true;
    }
  } catch (err) {
    console.error("[REG] Email service error (non-blocking):", err.message);
  }

  // ── 5. Insert to DB ────────────────────────────────────────
  console.log("[REG] Inserting registration to DB...");
  const { data: result, error: insertError } = await supabase
    .from("registrations")
    .insert([
      {
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        college: cleanCollege,
        shift: cleanShift,
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
    console.error("[REG] Database insertion error:", insertError);
    
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
    throw new Error(`DB Insert Error: ${insertError.message}`);
  }

  // ── 6. Sync to Google Sheet (best-effort, awaited for serverless) ───────
  await syncToGoogleSheet({
    ...result[0],
    shift: cleanShift,
  });

  return {
    ...result[0],
    qr_url: qrUrl,
  };
};

module.exports = { createRegistration };
