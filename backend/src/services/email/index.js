/**
 * Email Service Exports
 * Central export point for email functionality
 */

const { getEmailService, EmailError } = require("./email.service");
const { getEmailConfig } = require("./email.config");

module.exports = {
  getEmailService,
  getEmailConfig,
  EmailError,
};
