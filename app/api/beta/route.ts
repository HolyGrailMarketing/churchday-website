import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const TESTFLIGHT_LINK = 'https://testflight.apple.com/join/bvmfMG9J'

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const { name, email, phone } = await request.json()

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    const firstName = String(name).trim().split(' ')[0]

    // TestFlight invite to the tester
    await resend.emails.send({
      from: 'ChurchDay <demos@church-day.com>',
      to: email,
      subject: 'Your ChurchDay TestFlight invite is here',
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
              <div style="display:inline-block;background:#fbf6ec;border:1px solid #ecd9b4;color:#a07d3e;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:6px 12px;border-radius:999px;margin-bottom:16px;">Public Beta</div>
              <h1 style="margin:0 0 12px;font-size:24px;color:#142535;font-weight:700;">Welcome to the beta, ${firstName}!</h1>
              <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#4b5563;">
                Thank you for helping us test ChurchDay. You're one of the first to try it, and your feedback will directly shape the app for churches everywhere.
              </p>

              <!-- CTA -->
              <a href="${TESTFLIGHT_LINK}" style="display:block;text-align:center;background:linear-gradient(135deg,#d4a85e,#ecc869);color:#142535;font-size:16px;font-weight:700;text-decoration:none;padding:16px 24px;border-radius:12px;margin-bottom:28px;">
                Open your TestFlight invite
              </a>
              <p style="margin:-16px 0 28px;font-size:12px;color:#9ca3af;text-align:center;word-break:break-all;">
                Or paste this link in Safari: <a href="${TESTFLIGHT_LINK}" style="color:#a07d3e;">${TESTFLIGHT_LINK}</a>
              </p>

              <p style="margin:0 0 12px;font-size:14px;font-weight:600;color:#142535;">How to get started</p>
              <table style="width:100%;border-collapse:collapse;margin-bottom:28px;">
                <tr>
                  <td style="width:28px;vertical-align:top;padding:4px 0;font-size:14px;color:#d4a85e;font-weight:700;">1.</td>
                  <td style="padding:4px 0;font-size:14px;line-height:1.5;color:#4b5563;">Install <strong>TestFlight</strong> (free) from the App Store on your iPhone or iPad.</td>
                </tr>
                <tr>
                  <td style="width:28px;vertical-align:top;padding:4px 0;font-size:14px;color:#d4a85e;font-weight:700;">2.</td>
                  <td style="padding:4px 0;font-size:14px;line-height:1.5;color:#4b5563;">Tap the invite button above, then tap <strong>Accept</strong> and <strong>Install</strong>.</td>
                </tr>
                <tr>
                  <td style="width:28px;vertical-align:top;padding:4px 0;font-size:14px;color:#d4a85e;font-weight:700;">3.</td>
                  <td style="padding:4px 0;font-size:14px;line-height:1.5;color:#4b5563;">Explore ChurchDay and tell us what you think &mdash; the good and the rough edges.</td>
                </tr>
              </table>

              <div style="background:#fbf6ec;border:1px solid #ecd9b4;border-radius:12px;padding:18px 20px;">
                <p style="margin:0;font-size:14px;line-height:1.6;color:#4b5563;">
                  <strong style="color:#142535;">We'd love your feedback.</strong> Just reply to this email with anything &mdash; bugs, ideas, or what you'd love to see next. Every note helps.
                </p>
              </div>
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

    // Best-effort internal notification so the team knows who joined the beta.
    try {
      await resend.emails.send({
        from: 'ChurchDay <demos@church-day.com>',
        to: process.env.DEMO_EMAIL!,
        replyTo: email,
        subject: `New beta tester: ${name}`,
        html: `
          <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #142535; padding: 24px; border-radius: 12px 12px 0 0;">
              <h1 style="color: #d4a85e; margin: 0; font-size: 24px;">New Beta Tester</h1>
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
                  <td style="padding: 12px 0; font-weight: 600; color: #142535;">Phone</td>
                  <td style="padding: 12px 0; color: #374151;">${phone || 'Not provided'}</td>
                </tr>
              </table>
            </div>
          </div>
        `,
      })
    } catch (notifyError) {
      console.error('Failed to send beta internal notification:', notifyError)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to send beta invite email:', error)
    return NextResponse.json(
      { error: 'Failed to send beta invite' },
      { status: 500 }
    )
  }
}
