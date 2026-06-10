const supabase = require("../../config/db");
const { getEmailService } = require("../../services/email");
const { findCertificateRecipient } = require("./certificateRecipients");
const { getCertificateBuffer } = require("./certificateStorage");

const createFeedbackError = (message, code) => {
  const error = new Error(message);
  error.code = code;
  return error;
};

const saveFeedbackSubmission = async ({
  name,
  email,
  phone,
  rating,
  feedback,
  recipient,
  emailResult,
}) => {
  try {
    const { error } = await supabase.from("feedback_submissions").insert([
      {
        name,
        email,
        phone,
        rating,
        feedback,
        recipient_name: recipient.name,
        recipient_role: recipient.role,
        match_type: recipient.matchType,
        certificate_file: recipient.certificateFile,
        certificate_sent: emailResult.success,
        certificate_email_id: emailResult.emailId || null,
      },
    ]);

    if (error) {
      console.error("[FEEDBACK] Feedback DB insert failed:", error.message || error);
    }
  } catch (error) {
    console.error("[FEEDBACK] Feedback DB insert exception:", error.message || error);
  }
};

const processFeedback = async ({ name, email, phone, rating, feedback }) => {
  const recipient = findCertificateRecipient({ email, name });

  if (!recipient) {
    throw createFeedbackError(
      "We could not find a certificate mapped to this email/name. Please check your details and try again.",
      "CERTIFICATE_NOT_FOUND"
    );
  }

  let certificateBuffer;

  try {
    certificateBuffer = await getCertificateBuffer(recipient.certificateFile);
  } catch (error) {
    console.error("[FEEDBACK] Certificate fetch failed:", error.message || error);
    throw createFeedbackError("Certificate file is not available", "CERTIFICATE_FILE_MISSING");
  }

  const emailService = getEmailService();
  const emailResult = await emailService.sendCertificateEmail({
    to: email,
    name: recipient.name,
    role: recipient.role,
    certificateBuffer,
    certificateFile: recipient.certificateFile,
  });

  await saveFeedbackSubmission({
    name,
    email,
    phone,
    rating,
    feedback,
    recipient,
    emailResult,
  });

  if (!emailResult.success) {
    throw createFeedbackError(
      emailResult.error || "Unable to send certificate email right now. Please try again later.",
      "CERTIFICATE_EMAIL_FAILED"
    );
  }

  return {
    recipient: recipient.name,
    role: recipient.role,
    matchType: recipient.matchType,
    certificateSent: true,
  };
};

module.exports = {
  processFeedback,
};
