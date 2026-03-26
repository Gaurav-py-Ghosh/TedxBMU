const QRCode = require("qrcode");
const { generateSignature } = require("./signQR");

const generateQR = async (ticketId) => {
  try {
    // Create signed QR payload
    const signature = generateSignature(ticketId);
    const payload = JSON.stringify({ ticket_id: ticketId, signature });

    const qr = await QRCode.toDataURL(payload);
    return qr; // base64 image
  } catch (err) {
    throw err;
  }
};

module.exports = generateQR;
