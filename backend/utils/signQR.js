const crypto = require("crypto");

/**
 * Generate HMAC-SHA256 signature for a ticket ID.
 * @param {string} ticketId - The ticket ID to sign.
 * @returns {string} Hex-encoded HMAC signature.
 */
const generateSignature = (ticketId) => {
  const secret = process.env.QR_SECRET;
  if (!secret) {
    throw new Error("QR_SECRET environment variable is not set");
  }

  return crypto
    .createHmac("sha256", secret)
    .update(ticketId)
    .digest("hex");
};

/**
 * Verify HMAC-SHA256 signature for a ticket ID.
 * Uses timing-safe comparison to prevent timing attacks.
 * @param {string} ticketId - The ticket ID to verify.
 * @param {string} signature - The signature to compare against.
 * @returns {boolean} True if signature is valid.
 */
const verifySignature = (ticketId, signature) => {
  const expected = generateSignature(ticketId);

  // Ensure both buffers are the same length for timingSafeEqual
  const sigBuffer = Buffer.from(signature, "hex");
  const expectedBuffer = Buffer.from(expected, "hex");

  if (sigBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(sigBuffer, expectedBuffer);
};

module.exports = { generateSignature, verifySignature };
