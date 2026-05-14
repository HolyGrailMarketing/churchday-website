import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy — ChurchDay',
  description: 'Privacy Policy for the ChurchDay church management app.',
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Nav */}
      <nav className="w-full bg-primary-900 border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="ChurchDay" width={28} height={28} className="rounded-lg" />
            <span className="font-bold text-gold-400">ChurchDay</span>
          </Link>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-primary-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-stone-500 mb-10">Last updated: May 13, 2025</p>

        <div className="prose prose-stone max-w-none space-y-8 text-stone-700 leading-relaxed">

          <section>
            <h2 className="text-xl font-semibold text-primary-800 mb-3">1. Introduction</h2>
            <p>
              ChurchDay ("we," "our," or "us") is a church management platform operated by Holy Grail Marketing.
              This Privacy Policy explains how we collect, use, and protect information when you use the ChurchDay
              mobile application ("App") and related services. By using the App, you agree to the practices
              described in this policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary-800 mb-3">2. Information We Collect</h2>
            <h3 className="font-semibold text-primary-700 mt-4 mb-2">Account Information</h3>
            <p>When you register, we collect your name, email address, phone number, and a password. You may also
              sign in using Google or Apple Sign In, in which case we receive basic profile information from those
              providers.</p>
            <h3 className="font-semibold text-primary-700 mt-4 mb-2">Location Data</h3>
            <p>With your permission, we collect your device location to display your position on the church map
              and to enable proximity-based check-in when you are near the church. Location is only accessed
              while you are using the App unless you grant "Always On" permission.</p>
            <h3 className="font-semibold text-primary-700 mt-4 mb-2">Donation & Financial Information</h3>
            <p>When you make a donation, your payment is processed securely by a third-party payment processor.
              We store the donation amount, date, and a reference ID, but we do not store full card numbers or
              bank account details.</p>
            <h3 className="font-semibold text-primary-700 mt-4 mb-2">Prayer Requests & User Content</h3>
            <p>Any prayer requests, event RSVPs, or other content you voluntarily submit is stored to provide
              the App's features and may be visible to church administrators.</p>
            <h3 className="font-semibold text-primary-700 mt-4 mb-2">Usage Data</h3>
            <p>We collect anonymized analytics (screen views, feature usage, crash reports) to improve the App.
              This data cannot be used to identify you individually.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary-800 mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Provide and operate the App and its features</li>
              <li>Authenticate your identity and maintain your account</li>
              <li>Process donations and display giving history</li>
              <li>Send push notifications about events and announcements (with your consent)</li>
              <li>Enable location-based check-in at church</li>
              <li>Improve and diagnose issues in the App</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary-800 mb-3">4. Sharing Your Information</h2>
            <p>We do not sell your personal information. We may share information with:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Church Administrators:</strong> Your name, profile, attendance, and submitted content
                may be visible to authorized staff of your church.</li>
              <li><strong>Firebase / Google:</strong> We use Firebase (Google LLC) for authentication, database,
                and analytics services.</li>
              <li><strong>Google Maps:</strong> Map features use the Google Maps SDK. Google's privacy policy
                applies to map interactions.</li>
              <li><strong>Apple:</strong> If you use Sign in with Apple, Apple's privacy policy governs that
                authentication.</li>
              <li><strong>Payment Processors:</strong> Donations are handled by our payment provider under their
                own privacy and security standards.</li>
              <li><strong>Legal Requirements:</strong> We may disclose information if required by law or to
                protect the rights and safety of our users.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary-800 mb-3">5. Data Retention</h2>
            <p>We retain your account data for as long as your account is active. You may request deletion of
              your account and associated data by contacting us at the email below. Donation records may be
              retained as required by law.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary-800 mb-3">6. Security</h2>
            <p>We use industry-standard security measures including encrypted connections (TLS), Firebase
              security rules, and access controls to protect your information. No method of transmission over
              the internet is 100% secure, and we cannot guarantee absolute security.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary-800 mb-3">7. Children's Privacy</h2>
            <p>The App is not directed to children under 13. We do not knowingly collect personal information
              from children under 13. If you believe a child has provided us personal information, please
              contact us and we will promptly delete it.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary-800 mb-3">8. Your Rights</h2>
            <p>Depending on your location, you may have the right to access, correct, or delete your personal
              information, or object to certain processing. To exercise these rights, contact us at the address
              below.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary-800 mb-3">9. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of significant changes
              by posting the new policy in the App or by email. Continued use of the App after changes
              constitutes acceptance of the updated policy.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary-800 mb-3">10. Contact Us</h2>
            <p>If you have questions about this Privacy Policy, please contact us at:</p>
            <div className="mt-2 pl-4 border-l-2 border-gold-400">
              <p className="font-semibold text-primary-900">Holy Grail Marketing</p>
              <p>ChurchDay Support</p>
              <p>
                Email:{' '}
                <a href="mailto:holygrail876@gmail.com" className="text-primary-600 underline">
                  holygrail876@gmail.com
                </a>
              </p>
            </div>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 mt-16 py-8 text-center text-sm text-stone-400">
        © {new Date().getFullYear()} Holy Grail Marketing. All rights reserved.{' '}
        <Link href="/" className="underline hover:text-primary-600">Back to ChurchDay</Link>
      </footer>
    </div>
  )
}
