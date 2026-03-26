/**
 * Email Service Configuration
 * Validates environment variables and initializes Nodemailer transporter
 */

const nodemailer = require("nodemailer");

class EmailConfig {
  constructor() {
    this.validateEnvironment();
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT, 10),
      secure: false, // true for 465, false for other ports (587 uses STARTTLS)
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    this.from = process.env.EMAIL_FROM;
    this.isProduction = process.env.NODE_ENV === "production";
  }

  /**
   * Validates required environment variables
   * @throws {Error} If any required variable is missing
   */
  validateEnvironment() {
    const required = {
      SMTP_HOST: process.env.SMTP_HOST,
      SMTP_PORT: process.env.SMTP_PORT,
      SMTP_USER: process.env.SMTP_USER,
      SMTP_PASS: process.env.SMTP_PASS,
      EMAIL_FROM: process.env.EMAIL_FROM,
    };

    const missing = Object.entries(required)
      .filter(([_, value]) => !value)
      .map(([key]) => key);

    if (missing.length > 0) {
      throw new Error(
        `Missing required email environment variables: ${missing.join(", ")}`
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(process.env.EMAIL_FROM)) {
      throw new Error("Invalid EMAIL_FROM format");
    }
  }

  /**
   * Get configured Nodemailer transporter
   * @returns {import('nodemailer').Transporter}
   */
  getClient() {
    return this.transporter;
  }

  /**
   * Get sender email address
   * @returns {string}
   */
  getFromAddress() {
    return this.from;
  }

  /**
   * Check if running in production mode
   * @returns {boolean}
   */
  isProductionMode() {
    return this.isProduction;
  }

  /**
   * Verify SMTP connection
   * @returns {Promise<void>}
   */
  async verifyConnection() {
    await this.transporter.verify();
    console.log("[EmailConfig] ✅ SMTP connection verified");
  }
}

// Singleton instance
let emailConfigInstance = null;

/**
 * Get email configuration instance
 * @returns {EmailConfig}
 */
const getEmailConfig = () => {
  if (!emailConfigInstance) {
    emailConfigInstance = new EmailConfig();
  }
  return emailConfigInstance;
};

module.exports = { getEmailConfig };
