require("dotenv").config();
const { startSheetSyncScheduler } = require("./services/sheetSync/scheduler");

// --- Startup env validation ---
const requiredEnvVars = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "EMAIL_FROM", "QR_SECRET", "JWT_SECRET"];
console.log("[STARTUP] Environment variable check:");
requiredEnvVars.forEach((key) => {
  const value = process.env[key];
  if (!value) {
    console.error(`  ❌ ${key} is MISSING`);
  } else {
    // Show first 6 chars only for secrets
    const preview = value.length > 8 ? value.slice(0, 6) + "..." : "***";
    console.log(`  ✅ ${key} = ${preview}`);
  }
});

const app = require("./app");

const PORT = process.env.PORT || 5002;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  // Verify SMTP connection on startup
  try {
    const { getEmailService } = require("./services/email");
    const emailService = getEmailService();
    await emailService.verifyConnection();
  } catch (err) {
    console.error("[STARTUP] ⚠️ Email service failed to initialize:", err.message);
  }

  // Keep Google Sheet in sync with recent registrations every interval.
  startSheetSyncScheduler();
});
