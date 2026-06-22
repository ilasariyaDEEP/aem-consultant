import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  try {
    const { name, email, subject, message, highPriority } = await request.json()

    // 1. Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields (name, email, subject, message) are required.' },
        { status: 400 }
      )
    }

    const recipient = 'ilasariyadeep13@gmail.com'
    const sender = process.env.EMAIL_SERVER_USER || recipient
    const password = process.env.EMAIL_SERVER_PASSWORD

    // 2. Check configuration
    if (!password) {
      console.warn(
        '[Contact API] EMAIL_SERVER_PASSWORD is not set in .env.local. Simulating success.'
      )
      // Fallback: simulate success so the client UI behaves correctly during dev/testing
      return NextResponse.json({
        success: true,
        message: 'Signal composed (Simulated - EMAIL_SERVER_PASSWORD not configured).',
      })
    }

    // 3. Nodemailer transporter setup
    // Configured for Gmail. User needs to generate a Gmail App Password
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: sender,
        pass: password,
      },
    })

    // 4. Construct email templates
    const priorityLabel = highPriority ? '🚨 HIGH PRIORITY' : '📡 Standard Priority'
    const emailSubject = `[Portfolio Signal] ${subject} - from ${name} [${priorityLabel}]`

    const textContent = `
=== Cosmic Portfolio Signal Received ===

Originator ID (Name): ${name}
Frequency (Email): ${email}
Priority: ${priorityLabel}
Subject Payload: ${subject}

Message Content:
--------------------------------------------------
${message}
--------------------------------------------------
    `

    const htmlContent = `
      <div style="background-color: #05070a; color: #f4f6fc; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px 20px; line-height: 1.6;">
        <div style="max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #0f172a 0%, #020617 100%); border: 1px solid #3b82f6; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(59, 130, 246, 0.15);">
          <!-- Header Banner -->
          <div style="background: linear-gradient(to right, #7c3aed, #0ea5e9); padding: 30px 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; color: #ffffff;">Cosmic Signal Detected</h1>
            <p style="margin: 5px 0 0 0; color: #e0f2fe; font-size: 14px;">Incoming message from your career portfolio</p>
          </div>
          
          <!-- Content Details -->
          <div style="padding: 30px 25px;">
            <div style="margin-bottom: 25px; border-bottom: 1px solid #1e293b; pb: 20px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #94a3b8; font-size: 12px; text-transform: uppercase; font-weight: bold; width: 35%;">Originator ID</td>
                  <td style="padding: 8px 0; color: #f4f6fc; font-weight: 600;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #94a3b8; font-size: 12px; text-transform: uppercase; font-weight: bold;">Frequency (Email)</td>
                  <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #38bdf8; text-decoration: none; font-weight: 600;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #94a3b8; font-size: 12px; text-transform: uppercase; font-weight: bold;">Subject Payload</td>
                  <td style="padding: 8px 0; color: #e2e8f0;">${subject}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #94a3b8; font-size: 12px; text-transform: uppercase; font-weight: bold;">Priority Status</td>
                  <td style="padding: 8px 0; color: ${highPriority ? '#f43f5e' : '#10b981'}; font-weight: bold;">
                    ${priorityLabel}
                  </td>
                </tr>
              </table>
            </div>

            <!-- Message Block -->
            <div style="background-color: #0b0f19; border: 1px solid #1e293b; border-radius: 12px; padding: 20px; margin-top: 20px;">
              <h3 style="margin-top: 0; color: #38bdf8; font-size: 14px; text-transform: uppercase; border-bottom: 1px dashed #1e293b; padding-bottom: 8px; letter-spacing: 1px;">Message Content</h3>
              <p style="white-space: pre-wrap; font-size: 15px; color: #cbd5e1; margin: 10px 0 0 0;">${message}</p>
            </div>
          </div>

          <!-- Footer -->
          <div style="background-color: #020617; padding: 20px; border-top: 1px solid #1e293b; text-align: center; font-size: 11px; color: #64748b;">
            <p style="margin: 0;">Transmission generated by Stitch Stellar Career Portfolio.</p>
            <p style="margin: 5px 0 0 0;">Sector: Mumbai, Maharashtra, India (IST UTC+5:30)</p>
          </div>
        </div>
      </div>
    `

    // 5. Send Mail
    await transporter.sendMail({
      from: `"${name}" <${sender}>`,
      to: recipient,
      replyTo: email,
      subject: emailSubject,
      text: textContent,
      html: htmlContent,
    })

    return NextResponse.json({
      success: true,
      message: 'Signal broadcasted successfully to orbital headquarters.',
    })
  } catch (error: any) {
    console.error('[Contact API] Error sending email:', error)
    return NextResponse.json(
      { error: 'Failed to broadcast signal. Please try again later.' },
      { status: 500 }
    )
  }
}
