const jwt = require("jsonwebtoken");
const supabase = require("../../config/db");
const ExcelJS = require("exceljs");

const loginAdmin = (req, res) => {
  const email = (req.body?.email || "").trim().toLowerCase();
  const password = (req.body?.password || "").trim();

  const allowedEmails = (process.env.ADMIN_EMAILS || process.env.ADMIN_EMAIL || "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  if (!process.env.ADMIN_PASSWORD || !process.env.JWT_SECRET || allowedEmails.length === 0) {
    return res.status(500).json({ message: "Admin auth is not configured on server" });
  }

  if (allowedEmails.includes(email) && password === process.env.ADMIN_PASSWORD.trim()) {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "6h",
    });

    return res.json({
      message: "Login successful",
      token,
    });
  }

  return res.status(401).json({ message: "Invalid credentials" });
};

const getStats = async (req, res) => {
  try {
    // Single query: fetch only the column we need for counting
    const { data, error } = await supabase
      .from("registrations")
      .select("attendance_marked");

    if (error) {
      console.error("Stats query error:", error);
      return res.status(500).json({ message: "Failed to fetch stats" });
    }

    const total_registrations = data.length;
    const total_attended = data.filter((r) => r.attendance_marked === true).length;
    const total_remaining = total_registrations - total_attended;
    const attendance_percentage =
      total_registrations > 0
        ? Math.round((total_attended / total_registrations) * 100 * 10) / 10
        : 0;

    return res.json({
      total_registrations,
      total_attended,
      total_remaining,
      attendance_percentage,
    });
  } catch (err) {
    console.error("Stats error:", err.message || err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const downloadRegistered = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("registrations")
      .select("name, email, phone, college, ticket_id, payment_status, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Download registered query error:", error);
      return res.status(500).json({ message: "Failed to fetch data" });
    }

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Registered People");

    sheet.columns = [
      { header: "Name", key: "name", width: 25 },
      { header: "Email", key: "email", width: 30 },
      { header: "Phone", key: "phone", width: 18 },
      { header: "College", key: "college", width: 30 },
      { header: "Ticket ID", key: "ticket_id", width: 20 },
      { header: "Payment Status", key: "payment_status", width: 18 },
      { header: "Registered At", key: "created_at", width: 22 },
    ];

    // Style header row
    sheet.getRow(1).font = { bold: true };

    data.forEach((row) => {
      sheet.addRow({
        ...row,
        created_at: row.created_at
          ? new Date(row.created_at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
          : "",
      });
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=registered_people.xlsx"
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    console.error("Download registered error:", err.message || err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const downloadAttended = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("registrations")
      .select("name, email, phone, college, ticket_id, created_at")
      .eq("attendance_marked", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Download attended query error:", error);
      return res.status(500).json({ message: "Failed to fetch data" });
    }

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Attended People");

    sheet.columns = [
      { header: "Name", key: "name", width: 25 },
      { header: "Email", key: "email", width: 30 },
      { header: "Phone", key: "phone", width: 18 },
      { header: "College", key: "college", width: 30 },
      { header: "Ticket ID", key: "ticket_id", width: 20 },
      { header: "Attended At", key: "created_at", width: 22 },
    ];

    // Style header row
    sheet.getRow(1).font = { bold: true };

    data.forEach((row) => {
      sheet.addRow({
        ...row,
        created_at: row.created_at
          ? new Date(row.created_at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
          : "",
      });
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=attended_people.xlsx"
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    console.error("Download attended error:", err.message || err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { loginAdmin, getStats, downloadRegistered, downloadAttended };
