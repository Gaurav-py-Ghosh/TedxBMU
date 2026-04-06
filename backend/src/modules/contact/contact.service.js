const { getEmailConfig } = require("../../services/email");

const CONTACT_SUBJECT = "New Contact Form Message | TEDxBMU";

const getRecipientList = () => {
  const raw = process.env.ADMIN_EMAILS || process.env.ADMIN_EMAIL || "";
  const recipients = raw
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  return recipients;
};

const buildHtmlBody = ({ firstName, lastName, email, message }) => {
  const safeMessage = message.replace(/\n/g, "<br />");

  return `
    <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.6;">
      <h2 style="margin: 0 0 16px; color: #e62b1e;">New Contact Form Submission</h2>
      <p style="margin: 0 0 8px;"><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p style="margin: 0 0 8px;"><strong>Email:</strong> ${email}</p>
      <p style="margin: 16px 0 8px;"><strong>Message:</strong></p>
      <p style="margin: 0; white-space: normal;">${safeMessage}</p>
    </div>
  `;
};

const buildTextBody = ({ firstName, lastName, email, message }) => {
  return [
    "New Contact Form Submission",
    "",
    `Name: ${firstName} ${lastName}`,
    `Email: ${email}`,
    "",
    "Message:",
    message,
  ].join("\n");
};

const sendContactMessage = async ({ firstName, lastName, email, message }) => {
  const recipients = getRecipientList();

  if (!recipients.length) {
    const err = new Error("No admin email configured");
    err.code = "CONTACT_RECIPIENT_MISSING";
    throw err;
  }

  const emailConfig = getEmailConfig();
  const transporter = emailConfig.getClient();

  const mailOptions = {
    from: emailConfig.getFromAddress(),
    to: recipients.join(","),
    replyTo: email,
    subject: CONTACT_SUBJECT,
    html: buildHtmlBody({ firstName, lastName, email, message }),
    text: buildTextBody({ firstName, lastName, email, message }),
  };

  try {
    const info = await transporter.sendMail(mailOptions);

    return {
      success: true,
      messageId: info.messageId || null,
    };
  } catch (error) {
    const err = new Error("Failed to deliver contact message");
    err.code = "CONTACT_EMAIL_FAILED";
    err.cause = error;
    throw err;
  }
};

module.exports = {
  sendContactMessage,
};
