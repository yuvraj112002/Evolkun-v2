// app/api/contact/route.js
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, service, message } = body;

    // Validate required fields
    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { error: 'Please fill in all required fields.' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // Create nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Email content for admin notification
    const adminMailOptions = {
      from: `"Evolkun Contact Form" <${process.env.SMTP_FROM_EMAIL}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background: #f9fafb;
              }
              .header {
                background: linear-gradient(135deg, #7c3aed 0%, #2563eb 100%);
                color: white;
                padding: 30px;
                border-radius: 12px 12px 0 0;
                text-align: center;
              }
              .header h1 {
                margin: 0;
                font-size: 24px;
              }
              .content {
                background: white;
                padding: 30px;
                border-radius: 0 0 12px 12px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
              }
              .field {
                background: #f9fafb;
                padding: 15px;
                margin-bottom: 15px;
                border-radius: 8px;
                border-left: 4px solid #7c3aed;
              }
              .label {
                font-weight: 600;
                color: #7c3aed;
                font-size: 12px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin-bottom: 5px;
              }
              .value {
                color: #1f2937;
                font-size: 15px;
              }
              .message-box {
                background: #f9fafb;
                padding: 20px;
                border-radius: 8px;
                border: 2px solid #e5e7eb;
                margin-top: 20px;
              }
              .footer {
                text-align: center;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 2px solid #e5e7eb;
                color: #6b7280;
                font-size: 13px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>New Contact Form Submission</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Full Name</div>
                <div class="value">${name}</div>
              </div>
              
              <div class="field">
                <div class="label">Email Address</div>
                <div class="value"><a href="mailto:${email}" style="color: #7c3aed;">${email}</a></div>
              </div>
              
              ${phone ? `
                <div class="field">
                  <div class="label">Phone Number</div>
                  <div class="value"><a href="tel:${phone}" style="color: #7c3aed;">${phone}</a></div>
                </div>
              ` : ''}
              
              <div class="field">
                <div class="label">Service Requested</div>
                <div class="value">${service}</div>
              </div>
              
              <div class="message-box">
                <div class="label">Message</div>
                <div class="value" style="margin-top: 10px; white-space: pre-wrap;">${message}</div>
              </div>
              
              <div class="footer">
                <p>Submitted on ${new Date().toLocaleString('en-US', { 
                  dateStyle: 'full', 
                  timeStyle: 'short' 
                })}</p>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    // Email content for user confirmation
    const userMailOptions = {
      from: `"Evolkun Team" <${process.env.SMTP_FROM_EMAIL}>`,
      to: email,
      subject: 'Thanks for reaching out to Evolkun!',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background: #f9fafb;
              }
              .header {
                background: linear-gradient(135deg, #7c3aed 0%, #2563eb 100%);
                color: white;
                padding: 40px;
                border-radius: 12px 12px 0 0;
                text-align: center;
              }
              .header h1 {
                margin: 0;
                font-size: 28px;
              }
              .header p {
                margin: 10px 0 0 0;
                opacity: 0.9;
              }
              .content {
                background: white;
                padding: 40px;
                border-radius: 0 0 12px 12px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
              }
              .greeting {
                font-size: 18px;
                color: #1f2937;
                margin-bottom: 20px;
              }
              .message {
                color: #4b5563;
                line-height: 1.8;
                margin-bottom: 25px;
              }
              .summary-box {
                background: #f9fafb;
                padding: 20px;
                border-radius: 8px;
                border-left: 4px solid #7c3aed;
                margin: 25px 0;
              }
              .summary-box h3 {
                margin: 0 0 15px 0;
                color: #7c3aed;
                font-size: 16px;
              }
              .summary-item {
                padding: 8px 0;
                border-bottom: 1px solid #e5e7eb;
              }
              .summary-item:last-child {
                border-bottom: none;
              }
              .summary-label {
                font-weight: 600;
                color: #6b7280;
                font-size: 13px;
              }
              .summary-value {
                color: #1f2937;
                margin-top: 3px;
              }
              .next-steps {
                background: #eff6ff;
                padding: 20px;
                border-radius: 8px;
                margin: 25px 0;
              }
              .next-steps h3 {
                margin: 0 0 15px 0;
                color: #1e40af;
                font-size: 16px;
              }
              .next-steps ul {
                margin: 0;
                padding-left: 20px;
                color: #1f2937;
              }
              .next-steps li {
                margin: 8px 0;
              }
              .footer {
                text-align: center;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 2px solid #e5e7eb;
                color: #6b7280;
                font-size: 13px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>Message Received!</h1>
              <p>We'll be in touch soon</p>
            </div>
            <div class="content">
              <div class="greeting">
                Hi ${name},
              </div>
              
              <div class="message">
                <p>Thank you for reaching out to Evolkun! We've received your message and are excited to learn more about your project.</p>
                
                <p>Our team reviews every inquiry carefully, and we'll get back to you within 24 hours with next steps.</p>
              </div>
              
              <div class="summary-box">
                <h3>Your Submission Summary</h3>
                <div class="summary-item">
                  <div class="summary-label">Service Requested</div>
                  <div class="summary-value">${service}</div>
                </div>
                <div class="summary-item">
                  <div class="summary-label">Submitted On</div>
                  <div class="summary-value">${new Date().toLocaleString('en-US', { 
                    dateStyle: 'full', 
                    timeStyle: 'short' 
                  })}</div>
                </div>
              </div>
              
              <div class="next-steps">
                <h3>What Happens Next?</h3>
                <ul>
                  <li>Our team will review your project details</li>
                  <li>We'll prepare a customized proposal for your needs</li>
                  <li>You'll receive a response within 24 hours</li>
                  <li>We'll schedule a call to discuss your vision</li>
                </ul>
              </div>
              
              <div class="footer">
                <p><strong>Evolkun</strong> - Building Amazing Solutions</p>
                <p>Need immediate assistance? Reply to this email or call us at +1 (555) 123-4567</p>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    // Send both emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your message! We\'ll get back to you within 24 hours.' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}