const supabase = require("../src/config/db");

const uploadQR = async (ticketId, qrBase64) => {
  try {
    // Remove data URL prefix
    const base64Data = qrBase64.replace(/^data:image\/png;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");

    const fileName = `${ticketId}.png`;

    const { error } = await supabase.storage
      .from("qr-codes")
      .upload(fileName, buffer, {
        contentType: "image/png",
        upsert: true,
      });

    if (error) {
      // More specific error message for bucket not found
      if (error.statusCode === 404) {
        throw new Error(
          'Bucket "qr-codes" not found. Create it in Supabase Dashboard > Storage > New bucket'
        );
      }
      throw error;
    }

    // Get public URL (works only if bucket is public)
    const { data } = supabase.storage.from("qr-codes").getPublicUrl(fileName);

    return data.publicUrl;
  } catch (err) {
    console.error("QR Upload Error:", err.message || err);
    throw err;
  }
};

/**
 * Delete a QR code from storage (used for rollback on failed registration)
 * @param {string} ticketId
 */
const deleteQR = async (ticketId) => {
  try {
    const fileName = `${ticketId}.png`;
    const { error } = await supabase.storage
      .from("qr-codes")
      .remove([fileName]);

    if (error) {
      console.error("QR Cleanup Error:", error.message || error);
    }
  } catch (err) {
    // Non-blocking — just log, never throw during cleanup
    console.error("QR Cleanup Exception:", err.message || err);
  }
};

module.exports = { uploadQR, deleteQR };
