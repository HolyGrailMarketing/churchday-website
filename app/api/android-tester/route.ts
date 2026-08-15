import { Resend } from 'resend'
import { NextResponse } from 'next/server'

// The closed test needs roughly 20 testers, so the list lives in the inbox
// rather than a contacts store: every signup sends a notification whose subject
// is `Android tester: <email>`, which searches into a complete list on demand.
// Revisit if this ever needs to scale past a couple of dozen.

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    const body = await request.json()
    const email = String(body.email ?? '').trim().toLowerCase()
    const name = String(body.name ?? '').trim()
    const church = String(body.church ?? '').trim()

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'A valid email address is required' }, { status: 400 })
    }

    // This email is the record of the signup, so it must not be best-effort:
    // a failure here propagates and the tester is shown an error to retry.
    const { error: notifyError } = await resend.emails.send({
      from: 'ChurchDay <demos@church-day.com>',
      to: process.env.DEMO_EMAIL!,
      replyTo: email,
      subject: `Android tester: ${email}`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background:#142535;padding:20px;border-radius:12px 12px 0 0;">
            <h1 style="color:#d4a85e;margin:0;font-size:20px;">New Android tester</h1>
          </div>
          <div style="background:#fff;padding:20px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;">
            <p style="margin:0 0 12px;color:#374151;"><strong>Google account:</strong> ${email}</p>
            <p style="margin:0 0 12px;color:#374151;"><strong>Name:</strong> ${name || 'Not given'}</p>
            <p style="margin:0 0 12px;color:#374151;"><strong>Church:</strong> ${church || 'Not given'}</p>
            <p style="margin:16px 0 0;color:#6b7280;font-size:13px;">
              Add this Google account to the closed test in Play Console, then send the opt-in link.
            </p>
          </div>
        </div>
      `,
    })

    if (notifyError) {
      console.error('Failed to record Android tester:', notifyError.message)
      return NextResponse.json({ error: 'Failed to sign up' }, { status: 500 })
    }

    // Best effort: a mistyped address must not fail the signup itself.
    try {
      await resend.emails.send({
        from: 'ChurchDay <demos@church-day.com>',
        to: email,
        subject: "You're on the ChurchDay Android test list",
        html: `
        <div style="margin:0;padding:0;background:#f4f2ee;">
          <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif;max-width:560px;margin:0 auto;padding:32px 16px;">
            <div style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 10px 30px rgba(20,37,53,0.08);">
              <div style="background:linear-gradient(135deg,#142535,#1f3a52);padding:32px;text-align:center;">
                <div style="font-size:22px;font-weight:700;color:#d4a85e;">ChurchDay</div>
                <div style="margin-top:8px;font-size:11px;letter-spacing:3px;color:rgba(255,255,255,0.5);text-transform:uppercase;">Connect &nbsp;&bull;&nbsp; Worship &nbsp;&bull;&nbsp; Grow</div>
              </div>
              <div style="padding:32px;">
                <h1 style="margin:0 0 12px;font-size:22px;color:#142535;">You're on the list${name ? `, ${name.split(' ')[0]}` : ''}.</h1>
                <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#4b5563;">
                  Thanks for offering to test ChurchDay on Android. We're running a closed test on Google Play, and we've noted this address:
                </p>
                <p style="margin:0 0 20px;padding:12px 16px;background:#fbf6ec;border:1px solid #ecd9b4;border-radius:8px;font-size:15px;color:#142535;font-weight:600;">
                  ${email}
                </p>
                <p style="margin:0 0 12px;font-size:14px;font-weight:600;color:#142535;">What happens next</p>
                <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
                  <tr>
                    <td style="width:24px;vertical-align:top;padding:4px 0;font-size:14px;color:#d4a85e;font-weight:700;">1.</td>
                    <td style="padding:4px 0;font-size:14px;line-height:1.5;color:#4b5563;">We add this Google account to the test.</td>
                  </tr>
                  <tr>
                    <td style="width:24px;vertical-align:top;padding:4px 0;font-size:14px;color:#d4a85e;font-weight:700;">2.</td>
                    <td style="padding:4px 0;font-size:14px;line-height:1.5;color:#4b5563;">We email you a link to accept the invitation.</td>
                  </tr>
                  <tr>
                    <td style="width:24px;vertical-align:top;padding:4px 0;font-size:14px;color:#d4a85e;font-weight:700;">3.</td>
                    <td style="padding:4px 0;font-size:14px;line-height:1.5;color:#4b5563;">Once you accept, ChurchDay installs from Google Play as normal.</td>
                  </tr>
                </table>
                <p style="margin:0;font-size:14px;line-height:1.6;color:#4b5563;">
                  One thing worth checking: the address above has to be the Google account you use on your Android phone, or the invitation won't reach you. If it isn't, just reply and tell us the right one.
                </p>
              </div>
              <div style="padding:20px 32px;border-top:1px solid #f0eee9;text-align:center;">
                <p style="margin:0;font-size:13px;color:#142535;font-weight:600;">The ChurchDay Team</p>
                <p style="margin:12px 0 0;font-size:12px;color:#b6b3ad;">&copy; ${new Date().getFullYear()} ChurchDay &nbsp;&bull;&nbsp; <a href="https://church-day.com" style="color:#a07d3e;text-decoration:none;">church-day.com</a></p>
              </div>
            </div>
          </div>
        </div>
        `,
      })
    } catch (confirmationError) {
      console.error('Failed to send tester confirmation:', confirmationError)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Android tester signup failed:', error)
    return NextResponse.json({ error: 'Failed to sign up' }, { status: 500 })
  }
}
