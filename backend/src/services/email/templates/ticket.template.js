/**
 * Email Template for Event Ticket
 * Generates HTML email with ticket details and QR code
 */

/**
 * Escape HTML to prevent XSS
 * @param {string} text
 * @returns {string}
 */
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

/**
 * Generate ticket email HTML
 * @param {Object} params
 * @param {string} params.name - Recipient name
 * @param {string} params.ticketId - Unique ticket ID
 * @param {string} params.qrCodeUrl - Public URL to QR code image
 * @param {string} params.college - College name
 * @returns {string} HTML email content
 */
const generateTicketEmail = ({ name, ticketId, qrCodeUrl, college }) => {
  const safeName = escapeHtml(name);
  const safeTicketId = escapeHtml(ticketId);
  const safeCollege = escapeHtml(college);
  const safeQrUrl = escapeHtml(qrCodeUrl);

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your TEDxBMU Ticket</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; max-width: 90%; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #EB0028 0%, #FF4500 100%); padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: bold;">
                TED<sup style="font-size: 20px;">x</sup>BMU 2026
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="margin: 0 0 20px 0; color: #333333; font-size: 24px;">
                Hi ${safeName}! 🎉
              </h2>
              
              <p style="margin: 0 0 20px 0; color: #555555; font-size: 16px; line-height: 1.6;">
                Your registration for <strong>TEDxBMU 2026</strong> is confirmed! We're excited to have you join us for a day of ideas worth spreading.
              </p>

              <!-- Ticket Details Box -->
              <table role="presentation" style="width: 100%; background-color: #f8f9fa; border-radius: 6px; border-left: 4px solid #EB0028; margin: 30px 0;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 10px 0; color: #666666; font-size: 14px;">
                      <strong>Ticket ID:</strong>
                    </p>
                    <p style="margin: 0 0 15px 0; color: #EB0028; font-size: 20px; font-weight: bold; font-family: 'Courier New', monospace;">
                      ${safeTicketId}
                    </p>
                    <p style="margin: 0; color: #666666; font-size: 14px;">
                      <strong>College:</strong> ${safeCollege}
                    </p>
                  </td>
                </tr>
              </table>

              <!-- QR Code -->
              <div style="text-align: center; margin: 30px 0;">
                <p style="margin: 0 0 15px 0; color: #555555; font-size: 16px; font-weight: bold;">
                  Your Entry Pass
                </p>
                <p style="margin: 0 0 20px 0; color: #777777; font-size: 14px;">
                  Present this QR code at the venue entrance
                </p>
                <div style="display: inline-block; padding: 20px; background-color: #ffffff; border: 2px solid #e0e0e0; border-radius: 8px;">
                  <img src="${safeQrUrl}" alt="Event QR Code" style="display: block; width: 250px; height: 250px; margin: 0 auto;" />
                </div>
              </div>

              <!-- Instructions -->
              <table role="presentation" style="width: 100%; margin: 30px 0;">
                <tr>
                  <td style="padding: 20px; background-color: #fff3cd; border-radius: 6px; border-left: 4px solid #ffc107;">
                    <p style="margin: 0 0 10px 0; color: #856404; font-size: 14px; font-weight: bold;">
                      📌 Important Instructions:
                    </p>
                    <ul style="margin: 10px 0 0 0; padding-left: 20px; color: #856404; font-size: 14px; line-height: 1.8;">
                      <li>Save this QR code on your phone or print it</li>
                      <li>Arrive 30 minutes before the event starts</li>
                      <li>Carry a valid student ID or college ID card</li>
                      <li>Entry is non-transferable and strictly one-time</li>
                    </ul>
                  </td>
                </tr>
              </table>

              <p style="margin: 30px 0 0 0; color: #555555; font-size: 16px; line-height: 1.6;">
                See you at the event! 🚀
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px; background-color: #f8f9fa; text-align: center; border-radius: 0 0 8px 8px;">
              <p style="margin: 0 0 10px 0; color: #999999; font-size: 12px;">
                Need help? Contact us at <a href="mailto:support@tedxbmu.com" style="color: #EB0028; text-decoration: none;">support@tedxbmu.com</a>
              </p>
              <p style="margin: 0; color: #999999; font-size: 12px;">
                © 2026 TEDxBMU. All rights reserved.
              </p>
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

/**
 * Generate plain text version (fallback for email clients without HTML support)
 * @param {Object} params
 * @param {string} params.name
 * @param {string} params.ticketId
 * @param {string} params.qrCodeUrl
 * @param {string} params.college
 * @returns {string} Plain text email content
 */
const generateTicketEmailText = ({ name, ticketId, qrCodeUrl, college }) => {
  return `
Hi ${name}!

Your registration for TEDxBMU 2026 is confirmed!

TICKET DETAILS:
--------------
Ticket ID: ${ticketId}
College: ${college}

YOUR QR CODE:
${qrCodeUrl}

IMPORTANT INSTRUCTIONS:
• Save this QR code on your phone or print it
• Arrive 30 minutes before the event starts
• Carry a valid student ID or college ID card
• Entry is non-transferable and strictly one-time

See you at the event! 🚀

---
Need help? Contact us at support@tedxbmu.com
© 2026 TEDxBMU. All rights reserved.
  `.trim();
};

module.exports = {
  generateTicketEmail,
  generateTicketEmailText,
};
