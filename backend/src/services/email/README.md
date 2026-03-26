# Email Service Documentation

## Overview

Production-ready email service for TedxBMU backend using Resend API. Includes environment validation, error handling, retry logic, structured logging, and email templates.

## Architecture

```
src/services/email/
├── index.js                          # Main exports
├── email.config.js                   # Configuration & validation
├── email.service.js                  # Core email service
└── templates/
    └── ticket.template.js            # Ticket email template
```

## Features

✅ **Environment Validation** - Validates all required env vars on startup  
✅ **Error Handling** - Custom errors with codes and contextual information  
✅ **Retry Logic** - Automatic retries with exponential backoff  
✅ **Structured Logging** - JSON logs for easy parsing and monitoring  
✅ **Email Templates** - HTML + Plain text versions with XSS protection  
✅ **Singleton Pattern** - Single instance across application  
✅ **Type Safety** - Input validation for all parameters  
✅ **Non-blocking** - Email sending doesn't block user registration

## Environment Variables

Required variables in `.env`:

```bash
RESEND_API_KEY=re_xxxxxxxxxxxxx    # Resend API key (starts with 're_')
EMAIL_FROM=noreply@tedxbmu.com      # Verified sender email
NODE_ENV=production                 # Environment (production/development)
```

## Usage

### Sending Ticket Email

```javascript
const { getEmailService } = require('./services/email');

const emailService = getEmailService();

const result = await emailService.sendTicketEmail({
  to: 'user@example.com',
  name: 'John Doe',
  ticketId: 'TEDXBMU-2026-ABC123',
  qrCodeUrl: 'https://storage.supabase.co/...',
  college: 'BMU College of Engineering'
});

if (result.success) {
  console.log('Email sent:', result.emailId);
} else {
  console.error('Email failed:', result.error);
}
```

### Response Format

```javascript
{
  success: true,           // Boolean indicating success
  emailId: 'abc123',       // Resend email ID (null on failure)
  error: null,             // Error message (null on success)
  code: null               // Error code (null on success)
}
```

### Error Codes

| Code | Description |
|------|-------------|
| `INIT_ERROR` | Service initialization failed |
| `VALIDATION_ERROR` | Invalid input parameters |
| `SEND_ERROR` | Generic send failure |
| `RATE_LIMIT` | Rate limit exceeded |
| `SERVICE_ERROR` | Resend service unavailable |

## Email Template

The ticket email includes:

- **Professional Header** - TedxBMU branding with gradient
- **Personalized Greeting** - User's name
- **Ticket Details Box** - Ticket ID and college info
- **QR Code** - Large, scannable QR code for entry
- **Instructions** - Event entry requirements
- **Footer** - Support contact and copyright

### Template Security

- **XSS Protection** - All user inputs are HTML-escaped
- **URL Validation** - QR code URLs must start with `http`
- **Input Sanitization** - Trims and validates all strings

## Logging

All logs are JSON formatted for easy parsing:

```json
{
  "timestamp": "2026-02-22T10:30:00.000Z",
  "level": "info",
  "service": "EmailService",
  "message": "Email sent successfully",
  "to": "user@example.com",
  "ticketId": "TEDXBMU-2026-ABC123",
  "emailId": "xyz789",
  "duration": "1250ms"
}
```

### Log Levels

- **info** - Normal operations (email sent, service initialized)
- **warn** - Recoverable issues (retry attempts)
- **error** - Failures requiring attention

## Retry Logic

The service automatically retries failed sends:

- **Attempts**: 3 total (1 initial + 2 retries)
- **Backoff**: Exponential (1s, 2s, 4s)
- **Smart Retry**: Skips retry on client errors (4xx)

## Health Check

```javascript
const health = await emailService.healthCheck();

// Returns:
{
  healthy: true,
  message: "Email service is operational",
  from: "noreply@tedxbmu.com"
}
```

## Integration

The email service is integrated into the registration flow non-blockingly:

1. User registers
2. Registration saved to database
3. QR code generated and uploaded
4. **Email sent asynchronously** (doesn't block response)
5. Registration response sent to user immediately

If email fails, the registration still succeeds. Email errors are logged for manual follow-up.

## Best Practices

### ✅ DO

- Use the singleton `getEmailService()` function
- Handle email failures gracefully
- Check `result.success` before assuming email was sent
- Log email failures for monitoring
- Use structured logging for production

### ❌ DON'T

- Don't create new `EmailService()` instances directly
- Don't block user flows waiting for email
- Don't expose Resend API keys in client code
- Don't send emails without validating inputs

## Testing

### Development Mode

In development, all emails are logged but sent to real addresses. Use test emails:

```bash
# Use test recipient
to: 'test@example.com'
```

### Production Mode

In production:
- Ensure `RESEND_API_KEY` is a production key
- Verify `EMAIL_FROM` domain is verified in Resend
- Monitor logs for delivery issues
- Set up Resend webhooks for bounce tracking

## Monitoring

Key metrics to monitor:

1. **Email Send Rate** - Track sends per minute
2. **Success Rate** - Percentage of successful sends
3. **Error Types** - Which error codes are most common
4. **Delivery Time** - Duration from send to delivery

## Troubleshooting

### "Missing required email environment variables"

- Check `.env` file has `RESEND_API_KEY` and `EMAIL_FROM`
- Restart server after updating `.env`

### "Invalid RESEND_API_KEY format"

- API key must start with `re_`
- Generate new key in Resend dashboard

### "Bucket not found" during QR upload

- This is a storage issue, not email
- Create `qr-codes` bucket in Supabase Storage

### Rate limit errors

- Resend free tier: 100 emails/day
- Upgrade plan or implement queuing

## Future Enhancements

- [ ] Email queue for high volume
- [ ] Template variations (premium, VIP)
- [ ] Email analytics integration
- [ ] Bounced email handling
- [ ] Unsubscribe management
- [ ] A/B testing support

## Support

For issues with the email service:
- Check logs for detailed error messages
- Verify Resend dashboard for API status
- Review environment variables
- Contact: tech@tedxbmu.com
