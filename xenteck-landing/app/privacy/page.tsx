import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | XenTeck',
  description: 'Privacy Policy for XenTeck - AI Automation Solutions',
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-slate-400 mb-8">Last Updated: December 21, 2025</p>
        
        <div className="space-y-8 text-slate-300 leading-relaxed">
          
          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">1. Introduction</h2>
            <p>XenTeck, a division of LevEL 7 Media LLC ("we," "us," or "our"), is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website xenteck.com, use our services, or communicate with us via SMS, email, or other channels.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">2. Information We Collect</h2>
            <p className="mb-4">We may collect the following types of information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Personal Information:</strong> Name, email address, phone number, company name, and other contact details you provide through our forms or communications.</li>
              <li><strong>Business Information:</strong> Information about your business operations, automation needs, and service requirements.</li>
              <li><strong>Technical Data:</strong> IP address, browser type, device information, and usage data collected automatically when you visit our website.</li>
              <li><strong>Communication Data:</strong> Records of correspondence, including SMS messages, emails, and chat transcripts.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">3. SMS/Text Message Privacy</h2>
            <p className="mb-4">When you opt in to receive SMS messages from XenTeck:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Your phone number will NOT be sold, rented, or shared with third parties for their marketing purposes.</strong></li>
              <li>We use your phone number solely to send you service-related notifications, appointment reminders, and information you have requested.</li>
              <li>Message frequency varies based on your interactions with our services.</li>
              <li>Message and data rates may apply depending on your mobile carrier plan.</li>
              <li>You can opt out at any time by replying <strong>STOP</strong> to any message.</li>
              <li>Reply <strong>HELP</strong> for assistance or contact us at admin@xenteck.com.</li>
              <li>Carriers are not liable for delayed or undelivered messages.</li>
            </ul>
            <p className="mt-4">Our SMS services are powered by Twilio. For information about how Twilio handles your data, please review <a href="https://www.twilio.com/en-us/legal/privacy" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 underline">Twilio's Privacy Policy</a>.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">4. How We Use Your Information</h2>
            <p className="mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Respond to your inquiries and fulfill your requests</li>
              <li>Send service-related communications including SMS notifications</li>
              <li>Process transactions and send related information</li>
              <li>Personalize your experience and deliver relevant content</li>
              <li>Analyze usage patterns to improve our website and services</li>
              <li>Protect against fraudulent or unauthorized activity</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">5. Information Sharing</h2>
            <p className="mb-4">We do not sell your personal information. We may share your information with:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Service Providers:</strong> Third-party vendors who assist us in operating our business (e.g., Twilio for SMS, hosting providers, analytics services).</li>
              <li><strong>Legal Requirements:</strong> When required by law, court order, or governmental authority.</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">6. Data Security</h2>
            <p>We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">7. Your Rights</h2>
            <p className="mb-4">Depending on your location, you may have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Opt out of marketing communications</li>
              <li>Withdraw consent where processing is based on consent</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">8. Third-Party Links</h2>
            <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">9. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Last Updated" date and will be effective as soon as it is accessible.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">10. Contact Us</h2>
            <p className="mb-4">If you have questions about this Privacy Policy or our data practices, please contact us:</p>
            <div className="bg-slate-900 p-4 rounded-lg">
              <p><strong>XenTeck (LevEL 7 Media LLC)</strong></p>
              <p>Email: <a href="mailto:admin@xenteck.com" className="text-cyan-400 hover:text-cyan-300">admin@xenteck.com</a></p>
              <p>Phone: <a href="tel:+18102920007" className="text-cyan-400 hover:text-cyan-300">(810) 292-0007</a></p>
              <p>Website: <a href="https://xenteck.com" className="text-cyan-400 hover:text-cyan-300">xenteck.com</a></p>
            </div>
          </section>

        </div>

        <div className="mt-12 pt-8 border-t border-slate-800">
          <Link href="/" className="text-cyan-400 hover:text-cyan-300">← Back to Home</Link>
          <span className="mx-4 text-slate-600">|</span>
          <Link href="/terms" className="text-cyan-400 hover:text-cyan-300">Terms of Service →</Link>
        </div>
      </div>
    </main>
  )
}
