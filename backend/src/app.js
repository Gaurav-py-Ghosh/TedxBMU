const express = require("express");
const cors = require("cors");

const registrationRoutes = require("./modules/registration/registration.routes");
const adminRoutes = require("./modules/admin/admin.routes");
const attendanceRoutes = require("./modules/attendance/attendance.routes");
const paymentRoutes = require("./modules/payment/payment.routes");
const app = express();

const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(",") 
  : ["http://localhost:3000", "http://localhost:5002"];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes(origin + "/")) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));
app.use(express.json());
app.use("/api/admin", adminRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/payment", paymentRoutes);
app.get("/health", (req, res) => {
  res.status(200).json({ message: "Backend running" });
});

// [DEBUG] Test email route — remove in production
app.get("/api/test-email", async (req, res) => {
  try {
    const { getEmailService } = require("./services/email");
    const emailService = getEmailService();

    console.log("[TEST-EMAIL] Sending test email...");
    const result = await emailService.sendTicketEmail({
      to: process.env.ADMIN_EMAIL || "admin@tedxbmu.com",
      name: "Test User",
      ticketId: "TEST-" + Date.now(),
      qrCodeUrl: "https://placehold.co/200x200/png?text=TEST-QR",
      college: "Test College",
    });

    console.log("[TEST-EMAIL] Result:", result);
    return res.json({ message: "Test email attempted", result });
  } catch (err) {
    console.error("[TEST-EMAIL] Error:", err.message, err.stack);
    return res.status(500).json({ message: "Test email failed", error: err.message });
  }
});

app.use("/api/registration", registrationRoutes);

module.exports = app;
