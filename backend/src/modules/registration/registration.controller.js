const registrationService = require("./registration.service");
const generateQR = require("../../../utils/generateQR");
const supabase = require("../../config/db");

/**
 * Validate email format
 */
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

/**
 * Validate phone (10-digit, digits only after stripping common separators)
 */
const isValidPhone = (phone) => {
  const digits = phone.replace(/[\s\-().+]/g, "");
  return /^\d{10,13}$/.test(digits);
};

const registerUser = async (req, res) => {
  try {
    const { name, email, phone, college } = req.body;

    // ── Required field check ──
    if (!name || !email || !phone || !college) {
      return res.status(400).json({
        message: "All fields are required: name, email, phone, college",
      });
    }

    // ── Type checks ──
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof phone !== "string" ||
      typeof college !== "string"
    ) {
      return res.status(400).json({
        message: "All fields must be strings",
      });
    }

    // ── Sanitize ──
    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPhone = phone.trim();
    const trimmedCollege = college.trim();

    // ── Validate after trim ──
    if (!trimmedName || !trimmedEmail || !trimmedPhone || !trimmedCollege) {
      return res.status(400).json({
        message: "Fields cannot be empty or whitespace-only",
      });
    }

    if (!isValidEmail(trimmedEmail)) {
      return res.status(400).json({
        message: "Invalid email address format",
      });
    }

    if (!isValidPhone(trimmedPhone)) {
      return res.status(400).json({
        message: "Invalid phone number. Please provide a valid 10-digit number.",
      });
    }

    // ── Call service with sanitized data ──
    const user = await registrationService.createRegistration({
      name: trimmedName,
      email: trimmedEmail,
      phone: trimmedPhone,
      college: trimmedCollege,
    });

    res.status(201).json({
      message: "Registration created successfully",
      data: user,
    });
  } catch (error) {
    // ── Specific error handling by code ──
    if (error.code === "DUPLICATE_EMAIL") {
      return res.status(409).json({
        message: error.message,
        code: "DUPLICATE_EMAIL",
      });
    }

    if (error.code === "DUPLICATE_PHONE") {
      return res.status(409).json({
        message: error.message,
        code: "DUPLICATE_PHONE",
      });
    }

    if (error.code === "DUPLICATE_RACE") {
      return res.status(409).json({
        message: error.message,
        code: "DUPLICATE_RACE",
      });
    }

    if (error.code === "EMAIL_FAILED") {
      return res.status(502).json({
        message: error.message,
        code: "EMAIL_FAILED",
      });
    }

    // Legacy check for backwards compat
    if (error.message && error.message.includes("already registered")) {
      return res.status(409).json({
        message: error.message,
      });
    }

    console.error("Registration error:", error);
    res.status(500).json({
      message: "Internal server error. Please try again later.",
      debug: error.message, // Temporarily added for production debugging
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

const getQR = async (req, res) => {
  try {
    const { ticket_id } = req.params;

    if (!ticket_id || typeof ticket_id !== "string") {
      return res.status(400).json({ message: "Ticket ID is required" });
    }

    const { data, error } = await supabase
      .from("registrations")
      .select("ticket_id")
      .eq("ticket_id", ticket_id.trim())
      .maybeSingle();

    if (error) {
      console.error("QR lookup error:", error);
      return res.status(500).json({ message: "Failed to look up ticket" });
    }

    if (!data) {
      return res.status(404).json({ message: "Invalid ticket ID" });
    }

    const qr_code = await generateQR(ticket_id);

    return res.json({ qr_code });
  } catch (error) {
    console.error("getQR error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  registerUser,
  getQR,
};
