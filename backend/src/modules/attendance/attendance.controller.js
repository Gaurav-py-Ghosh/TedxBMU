const supabase = require("../../config/db");
const { verifySignature } = require("../../../utils/signQR");

const markAttendance = async (req, res) => {
  try {
    const { qr_data } = req.body;

    // --- Step 1: Parse QR payload ---
    if (!qr_data) {
      return res.status(400).json({ message: "QR data is required" });
    }

    let parsed;
    try {
      parsed = JSON.parse(qr_data);
    } catch {
      return res.status(400).json({ message: "Invalid QR format" });
    }

    const { ticket_id, signature } = parsed;

    if (!ticket_id || !signature) {
      return res.status(400).json({ message: "Invalid QR payload" });
    }

    // --- Step 2: Verify HMAC signature BEFORE any DB query ---
    const isValid = verifySignature(ticket_id, signature);
    if (!isValid) {
      return res.status(403).json({ message: "Invalid QR Signature" });
    }

    // --- Step 3: Proceed with attendance logic ---
    const { data, error } = await supabase
      .from("registrations")
      .select("*")
      .eq("ticket_id", ticket_id)
      .single();

    if (error || !data) {
      return res.status(404).json({ message: "Invalid ticket" });
    }

    if (data.attendance_marked) {
      return res.status(400).json({ message: "Attendance already marked" });
    }

    const { error: updateError } = await supabase
      .from("registrations")
      .update({ attendance_marked: true })
      .eq("ticket_id", ticket_id);

    if (updateError) {
      console.error("Attendance update error:", updateError);
      return res.status(500).json({ message: "Failed to mark attendance" });
    }

    return res.json({ message: "Attendance marked successfully", name: data.name });
  } catch (err) {
    console.error("Attendance error:", err.message || err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { markAttendance };
