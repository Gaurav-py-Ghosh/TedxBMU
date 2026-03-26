/**
 * Email Service Test/Example
 * 
 * Run this file to test your email configuration:
 * node src/services/email/email.example.js
 */

require("dotenv").config();

const { getEmailService } = require("./index");

async function testEmailService() {
  console.log("\n🧪 Testing Email Service...\n");

  try {
    // Initialize service (will validate env vars)
    const emailService = getEmailService();
    console.log("✅ Email service initialized");

    // Health check
    const health = await emailService.healthCheck();
    console.log("✅ Health check:", health);

    // Test email parameters (replace with your test data)
    const testParams = {
      to: "test@example.com", // ⚠️ CHANGE THIS to your email
      name: "Test User",
      ticketId: "TEDXBMU-2026-TEST123",
      qrCodeUrl: "https://via.placeholder.com/250", // Placeholder QR
      college: "Test College",
    };

    console.log("\n📧 Sending test email to:", testParams.to);
    console.log("⚠️  Make sure to change the 'to' email address!\n");

    // Send test email
    const result = await emailService.sendTicketEmail(testParams);

    if (result.success) {
      console.log("✅ Email sent successfully!");
      console.log("   Email ID:", result.emailId);
      console.log("\n✨ Check your inbox at:", testParams.to);
    } else {
      console.error("❌ Email failed to send");
      console.error("   Error:", result.error);
      console.error("   Code:", result.code);
    }

    console.log("\n✅ Test completed\n");
  } catch (error) {
    console.error("\n❌ Test failed:");
    console.error("   Error:", error.message);
    
    if (error.code === "INIT_ERROR") {
      console.log("\n💡 Tips:");
      console.log("   - Check your .env file has RESEND_API_KEY and EMAIL_FROM");
      console.log("   - Ensure RESEND_API_KEY starts with 're_'");
      console.log("   - Verify EMAIL_FROM is a valid email address");
    }
    
    console.log("");
    process.exit(1);
  }
}

// Run test if executed directly
if (require.main === module) {
  testEmailService();
}

module.exports = { testEmailService };
