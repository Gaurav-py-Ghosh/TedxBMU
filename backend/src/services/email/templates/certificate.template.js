const escapeHtml = (text) => {
  if (!text) return "";
  return text
    .toString()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

const generateCertificateEmail = ({ name, role }) => {
  const safeName = escapeHtml(name);
  const safeRole = escapeHtml(role);

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your TEDxBMU Certificate</title>
</head>
<body style="margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;background:#f4f4f4;color:#222;">
  <table role="presentation" style="width:100%;border-collapse:collapse;">
    <tr>
      <td align="center" style="padding:36px 16px;">
        <table role="presentation" style="width:600px;max-width:100%;background:#fff;border-radius:8px;overflow:hidden;">
          <tr>
            <td style="background:#e62b1e;padding:28px;text-align:center;color:#fff;">
              <h1 style="margin:0;font-size:30px;letter-spacing:.02em;">TEDxBMU</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 28px;">
              <h2 style="margin:0 0 16px;color:#111;font-size:24px;">Hi ${safeName},</h2>
              <p style="margin:0 0 16px;line-height:1.6;color:#444;font-size:16px;">
                Thank you for sharing your feedback with TEDxBMU. Your certificate of appreciation is attached to this email.
              </p>
              <p style="margin:0 0 22px;line-height:1.6;color:#444;font-size:16px;">
                We appreciate your contribution as ${safeRole === "OC" ? "an" : "a"} <strong>${safeRole}</strong> member of the TEDxBMU event.
              </p>
              <p style="margin:0;line-height:1.6;color:#444;font-size:16px;">
                Warm regards,<br />
                <strong>Team TEDxBMU</strong>
              </p>
            </td>
          </tr>
          <tr>
            <td style="background:#f8f8f8;padding:20px 28px;text-align:center;color:#888;font-size:12px;">
              TEDxBMU 2026
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
};

const generateCertificateEmailText = ({ name, role }) => `
Hi ${name},

Thank you for sharing your feedback with TEDxBMU. Your certificate of appreciation is attached to this email.

We appreciate your contribution as ${role === "OC" ? "an" : "a"} ${role} member of the TEDxBMU event.

Warm regards,
Team TEDxBMU
`.trim();

module.exports = {
  generateCertificateEmail,
  generateCertificateEmailText,
};
