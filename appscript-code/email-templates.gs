// ========================================================================
// EMAIL-TEMPLATES.GS - Email Templates for Notifications
// ========================================================================

const EmailTemplates = {
  /**
   * Get booking confirmation email HTML
   * Mobile-responsive with NCS brand colors
   */
  getBookingConfirmation: function (data) {
    const { orderNumber, name, email, service, budget, phone, company, message } = data

    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Booking Confirmation - ${orderNumber}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #1f2937;
      background-color: #f9fafb;
    }
    .email-wrapper { 
      max-width: 600px; 
      margin: 0 auto; 
      background: #ffffff;
    }
    
    /* Header with NCS gradient */
    .header {
      background: linear-gradient(92deg, #113561 -1.76%, #1e98d4 138.96%);
      padding: 40px 20px;
      text-align: center;
      color: #ffffff;
    }
    .header h1 {
      font-size: 28px;
      font-weight: 700;
      margin: 0 0 8px 0;
    }
    .header p {
      font-size: 16px;
      opacity: 0.95;
      margin: 0;
    }
    
    /* Content area */
    .content {
      padding: 32px 20px;
    }
    
    /* Order number box */
    .order-box {
      background: linear-gradient(135deg, #eff6ff 0%, #e0f2fe 100%);
      border-left: 4px solid #3b82f6;
      border-radius: 8px;
      padding: 24px;
      margin: 24px 0;
      text-align: center;
    }
    .order-label {
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #6b7280;
      font-weight: 600;
      margin-bottom: 8px;
    }
    .order-number {
      font-size: 32px;
      font-weight: 700;
      color: #113561;
      margin: 8px 0;
      letter-spacing: -0.02em;
    }
    .order-subtitle {
      font-size: 13px;
      color: #6b7280;
      margin-top: 8px;
    }
    
    /* Details table - mobile responsive */
    .details {
      margin: 24px 0;
    }
    .detail-item {
      padding: 16px 0;
      border-bottom: 1px solid #f3f4f6;
    }
    .detail-item:last-child {
      border-bottom: none;
    }
    .detail-label {
      font-size: 13px;
      font-weight: 600;
      color: #6b7280;
      margin-bottom: 6px;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }
    .detail-value {
      font-size: 15px;
      color: #111827;
      word-wrap: break-word;
    }
    
    /* Info box */
    .info-box {
      background: #fef9c3;
      border-left: 4px solid #f59e0b;
      border-radius: 8px;
      padding: 20px;
      margin: 24px 0;
    }
    .info-box strong {
      color: #92400e;
      display: block;
      margin-bottom: 12px;
      font-size: 15px;
    }
    .info-box ul {
      margin: 0;
      padding-left: 20px;
    }
    .info-box li {
      color: #78350f;
      margin: 6px 0;
      font-size: 14px;
    }
    
    /* Contact section */
    .contact {
      margin: 24px 0;
      padding: 20px;
      background: #f9fafb;
      border-radius: 8px;
    }
    .contact-item {
      display: flex;
      align-items: center;
      margin: 10px 0;
      font-size: 14px;
      color: #374151;
    }
    .contact-icon {
      margin-right: 10px;
      font-size: 18px;
    }
    
    /* Footer */
    .footer {
      padding: 32px 20px;
      text-align: center;
      background: #f9fafb;
      border-top: 1px solid #e5e7eb;
    }
    .footer p {
      font-size: 13px;
      color: #6b7280;
      margin: 4px 0;
    }
    .brand {
      font-weight: 600;
      color: #113561;
    }
    
    /* Mobile responsive */
    @media only screen and (max-width: 600px) {
      .header h1 { font-size: 24px; }
      .order-number { font-size: 28px; }
      .content { padding: 24px 16px; }
      .order-box { padding: 20px; }
    }
  </style>
</head>
<body>
  <div class="email-wrapper">
    <!-- Header -->
    <div class="header">
      <h1>✓ Booking Confirmed!</h1>
      <p>Thank you for choosing Nusa Creative Studio</p>
    </div>
    
    <!-- Content -->
    <div class="content">
      <p>Hi <strong>${name}</strong>,</p>
      <p style="margin-top: 12px; color: #6b7280;">Your project inquiry has been successfully received. Our team will review your request and contact you within 1-2 business days.</p>
      
      <!-- Order Number Box -->
      <div class="order-box">
        <div class="order-label">Your Order Number</div>
        <div class="order-number">${orderNumber}</div>
        <div class="order-subtitle">Please save this number for future reference</div>
      </div>
      
      <h3 style="color: #111827; margin: 32px 0 16px 0; font-size: 18px;">Booking Details</h3>
      
      <!-- Details - Mobile Responsive -->
      <div class="details">
        <div class="detail-item">
          <div class="detail-label">Service</div>
          <div class="detail-value">${service}</div>
        </div>
        <div class="detail-item">
          <div class="detail-label">Budget Range</div>
          <div class="detail-value">${budget}</div>
        </div>
        <div class="detail-item">
          <div class="detail-label">Phone</div>
          <div class="detail-value">${phone}</div>
        </div>
        ${
          company
            ? `
        <div class="detail-item">
          <div class="detail-label">Company</div>
          <div class="detail-value">${company}</div>
        </div>
        `
            : ''
        }
        <div class="detail-item">
          <div class="detail-label">Message</div>
          <div class="detail-value">${message}</div>
        </div>
      </div>
      
      <!-- What's Next Info Box -->
      <div class="info-box">
        <strong>📋 What's Next?</strong>
        <ul>
          <li>Our team will review your project requirements</li>
          <li>We'll contact you via email or phone within 1-2 business days</li>
          <li>Feel free to reply to this email if you have any questions</li>
        </ul>
      </div>
      
      <!-- Contact Section -->
      <div class="contact">
        <p style="font-weight: 600; color: #111827; margin-bottom: 12px;">Need Help?</p>
        <div class="contact-item">
          <span class="contact-icon">📧</span>
          <span>hello@nusacreativestudio.com</span>
        </div>
        <div class="contact-item">
          <span class="contact-icon">📱</span>
          <span>+62 812-3456-7890</span>
        </div>
      </div>
    </div>
    
    <!-- Footer -->
    <div class="footer">
      <p style="margin-bottom: 8px;">&copy; 2026 <span class="brand">Nusa Creative Studio</span></p>
      <p>Crafting Digital Excellence</p>
    </div>
  </div>
</body>
</html>
    `.trim()
  },

  /**
   * Get plain text version for email clients that don't support HTML
   */
  getBookingConfirmationPlainText: function (data) {
    const { orderNumber, name, service, budget, phone, company, message } = data

    return `
BOOKING CONFIRMED!

Hi ${name},

Your project inquiry has been successfully received.

ORDER NUMBER: ${orderNumber}
Please save this number for future reference.

BOOKING DETAILS:
- Service: ${service}
- Budget Range: ${budget}
- Phone: ${phone}
${company ? `- Company: ${company}\n` : ''}- Message: ${message}

WHAT'S NEXT?
• Our team will review your project requirements
• We'll contact you via email or phone within 1-2 business days
• Feel free to reply to this email if you have any questions

NEED HELP?
📧 Email: hello@nusacreativestudio.com
📱 Phone: +62 812-3456-7890

---
© 2026 Nusa Creative Studio
Crafting Digital Excellence
    `.trim()
  }
}
