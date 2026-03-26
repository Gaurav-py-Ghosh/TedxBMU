const crypto = require("crypto");

const generateTicketId = () => {
  // Use crypto.randomBytes for true randomness (vs Math.random)
  // 6 bytes = 12 hex chars, take first 8 for ~4 billion unique IDs
  const random = crypto.randomBytes(6).toString("hex").substring(0, 8).toUpperCase();
  return `TEDXBMU-2026-${random}`;
};

module.exports = generateTicketId;
