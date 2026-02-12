import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { name, email, church, phone } = await request.json()

    if (!name || !email || !church) {
      return NextResponse.json(
        { error: 'Name, email, and church name are required' },
        { status: 400 }
      )
    }

    await resend.emails.send({
      from: 'ChurchDay <onboarding@resend.dev>',
      to: process.env.DEMO_EMAIL!,
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
                <td style="padding: 12px 0; font-weight: 600; color: #142535;">Phone</td>
                <td style="padding: 12px 0; color: #374151;">${phone || 'Not provided'}</td>
              </tr>
            </table>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to send demo request email:', error)
    return NextResponse.json(
      { error: 'Failed to send demo request' },
      { status: 500 }
    )
  }
}
