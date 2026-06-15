import { Resend } from 'resend'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const { name, email, church, phone, preferredDate, preferredTime } = await request.json()

    if (!name || !email || !church) {
      return NextResponse.json(
        { error: 'Name, email, and church name are required' },
        { status: 400 }
      )
    }

    await resend.emails.send({
      from: 'ChurchDay <demos@church-day.com>',
      to: process.env.DEMO_EMAIL!,
      replyTo: email,
      subject: `New Demo Request from ${name} - ${church}`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #142535; padding: 24px; border-radius: 12px 12px 0 0;">
            <h1 style="color: #d4a85e; margin: 0; font-size: 24px;">New Demo Request</h1>
          </div>
          <div style="background: #ffffff; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #142535; width: 120px;">Name</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #374151;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #142535;">Email</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #374151;"><a href="mailto:${email}" style="color: #4a7ba7;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #142535;">Church</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #374151;">${church}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #142535;">Phone</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #374151;">${phone || 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #142535;">Preferred Day</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #374151;">${preferredDate || 'No preference'}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; font-weight: 600; color: #142535;">Preferred Time</td>
                <td style="padding: 12px 0; color: #374151;">${preferredTime || 'No preference'}</td>
              </tr>
            </table>
          </div>
        </div>
      `,
    })

    // Best-effort confirmation email to the person booking the demo.
    // A failure here (e.g. a mistyped address) must not drop the captured lead.
    try {
      const firstName = String(name).trim().split(' ')[0]
      await resend.emails.send({
        from: 'ChurchDay <demos@church-day.com>',
        to: email,
        subject: 'Your ChurchDay demo is confirmed',
        html: `
        <div style="margin:0;padding:0;background:#f4f2ee;">
          <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif;max-width:560px;margin:0 auto;padding:32px 16px;">
            <div style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 10px 30px rgba(20,37,53,0.08);">

              <!-- Header -->
              <div style="background:linear-gradient(135deg,#142535,#1f3a52);padding:36px 32px;text-align:center;">
                <div style="font-size:24px;font-weight:700;color:#d4a85e;letter-spacing:-0.5px;">ChurchDay</div>
                <div style="margin-top:8px;font-size:11px;letter-spacing:3px;color:rgba(255,255,255,0.5);text-transform:uppercase;">Connect &nbsp;&bull;&nbsp; Worship &nbsp;&bull;&nbsp; Grow</div>
              </div>

              <!-- Body -->
              <div style="padding:36px 32px;">
                <h1 style="margin:0 0 12px;font-size:24px;color:#142535;font-weight:700;">You're all set, ${firstName}!</h1>
                <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#4b5563;">
                  Thanks for booking a personalized demo of ChurchDay. We've received your request and our team will reach out shortly to confirm the final time.
                </p>

                <!-- Appointment card -->
                <div style="border:1px solid #ecd9b4;background:#fbf6ec;border-radius:12px;padding:4px 20px;margin-bottom:28px;">
                  <table style="width:100%;border-collapse:collapse;">
                    <tr>
                      <td style="padding:16px 0;border-bottom:1px solid #efe3c8;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#a07d3e;font-weight:600;">Preferred Day</td>
                      <td style="padding:16px 0;border-bottom:1px solid #efe3c8;text-align:right;font-size:15px;color:#142535;font-weight:600;">${preferredDate || 'To be confirmed'}</td>
                    </tr>
                    <tr>
                      <td style="padding:16px 0;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#a07d3e;font-weight:600;">Preferred Time</td>
                      <td style="padding:16px 0;text-align:right;font-size:15px;color:#142535;font-weight:600;">${preferredTime || 'To be confirmed'}</td>
                    </tr>
                  </table>
                </div>

                <p style="margin:0 0 12px;font-size:14px;font-weight:600;color:#142535;">What happens next</p>
                <table style="width:100%;border-collapse:collapse;margin-bottom:28px;">
                  <tr>
                    <td style="width:28px;vertical-align:top;padding:4px 0;font-size:14px;color:#d4a85e;font-weight:700;">1.</td>
                    <td style="padding:4px 0;font-size:14px;line-height:1.5;color:#4b5563;">We'll confirm your demo time by email or phone.</td>
                  </tr>
                  <tr>
                    <td style="width:28px;vertical-align:top;padding:4px 0;font-size:14px;color:#d4a85e;font-weight:700;">2.</td>
                    <td style="padding:4px 0;font-size:14px;line-height:1.5;color:#4b5563;">A specialist walks your team through ChurchDay, tailored to your church.</td>
                  </tr>
                  <tr>
                    <td style="width:28px;vertical-align:top;padding:4px 0;font-size:14px;color:#d4a85e;font-weight:700;">3.</td>
                    <td style="padding:4px 0;font-size:14px;line-height:1.5;color:#4b5563;">You get a clear plan to bring your congregation closer together.</td>
                  </tr>
                </table>

                <p style="margin:0;font-size:14px;line-height:1.6;color:#4b5563;">
                  Need to make a change? Just reply to this email &mdash; we're happy to help.
                </p>
              </div>

              <!-- Footer -->
              <div style="padding:24px 32px;border-top:1px solid #f0eee9;text-align:center;">
                <p style="margin:0 0 4px;font-size:13px;color:#9ca3af;">With gratitude,</p>
                <p style="margin:0;font-size:13px;color:#142535;font-weight:600;">The ChurchDay Team</p>
                <p style="margin:16px 0 0;font-size:12px;color:#b6b3ad;">&copy; ${new Date().getFullYear()} ChurchDay &nbsp;&bull;&nbsp; <a href="https://church-day.com" style="color:#a07d3e;text-decoration:none;">church-day.com</a></p>
              </div>

            </div>
          </div>
        </div>
        `,
      })
    } catch (confirmationError) {
      console.error('Failed to send confirmation email to booker:', confirmationError)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to send demo request email:', error)
    return NextResponse.json(
      { error: 'Failed to send demo request' },
      { status: 500 }
    )
  }
}
