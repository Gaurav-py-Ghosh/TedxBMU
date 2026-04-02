const contactService = require("./contact.service");

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const submitContactMessage = async (req, res) => {
  try {
    const { firstName, lastName, email, message } = req.body;

    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({
        message: "All fields are required: firstName, lastName, email, message",
      });
    }

    if (
      typeof firstName !== "string" ||
      typeof lastName !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string"
    ) {
      return res.status(400).json({
        message: "All fields must be strings",
      });
    }

    const cleanFirstName = firstName.trim();
    const cleanLastName = lastName.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanMessage = message.trim();

    if (!cleanFirstName || !cleanLastName || !cleanEmail || !cleanMessage) {
      return res.status(400).json({
        message: "Fields cannot be empty or whitespace-only",
      });
    }

    if (!isValidEmail(cleanEmail)) {
      return res.status(400).json({
        message: "Invalid email address format",
      });
    }

    if (cleanMessage.length < 10) {
      return res.status(400).json({
        message: "Message must be at least 10 characters long",
      });
    }

    if (cleanMessage.length > 3000) {
      return res.status(400).json({
        message: "Message is too long. Keep it under 3000 characters.",
      });
    }

    await contactService.sendContactMessage({
      firstName: cleanFirstName,
      lastName: cleanLastName,
      email: cleanEmail,
      message: cleanMessage,
    });

    return res.status(201).json({
      message: "Message sent successfully",
    });
  } catch (error) {
    if (error.code === "CONTACT_RECIPIENT_MISSING") {
      return res.status(500).json({
        message: "Contact service is not configured",
        code: error.code,
      });
    }

    if (error.code === "CONTACT_EMAIL_FAILED") {
      return res.status(502).json({
        message: error.message,
        code: error.code,
      });
    }

    console.error("Contact submission error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  submitContactMessage,
};
