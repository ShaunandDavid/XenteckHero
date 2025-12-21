import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service | XenTeck',
  description: 'Terms of Service for XenTeck - AI Automation Solutions',
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
        <p className="text-slate-400 mb-8">Last Updated: December 21, 2025</p>

        <div className="space-y-8 text-slate-300 leading-relaxed">

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">1. Acceptance of Terms</h2>
            <p>By accessing or using the services provided by XenTeck, a division of LevEL 7 Media LLC ("Company," "we," "us," or "our"), including our website xenteck.com and any related services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">2. Description of Services</h2>
            <p>XenTeck provides AI-powered automation consulting and implementation services, including but not limited to lead generation systems, workflow automation, CRM integrations, and business process optimization solutions.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">3. SMS/Text Messaging Terms</h2>
            <p className="mb-4">By providing your phone number and opting in to receive SMS messages from XenTeck, you agree to the following:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Consent:</strong> You expressly consent to receive automated text messages from XenTeck related to our services, including appointment reminders, service notifications, and follow-up communications.</li>
              <li><strong>Message Frequency:</strong> Message frequency varies based on your service interactions and inquiries.</li>
              <li><strong>Costs:</strong> Message and data rates may apply. Check with your mobile carrier for details about your plan.</li>
              <li><strong>Opt-Out:</strong> You may opt out at any time by replying <strong>STOP</strong> to any message. You will receive a confirmation message and no further messages unless you opt in again.</li>
              <li><strong>Help:</strong> Reply <strong>HELP</strong> for assistance or contact us at admin@xenteck.com or (810) 292-0007.</li>
              <li><strong>No Phone Number Sharing:</strong> Your phone number will not be sold, rented, or shared with third parties for their marketing purposes.</li>
              <li><strong>Carrier Liability:</strong> Carriers are not liable for delayed or undelivered messages.</li>
              <li><strong>Supported Carriers:</strong> Major US carriers are supported. Carrier participation may vary.</li>
            </ul>
            <p className="mt-4">Our SMS services are powered by Twilio. By using our SMS services, you also agree to <a href="https://www.twilio.com/en-us/legal/tos" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 underline">Twilio&apos;s Terms of Service</a> and <a href="https://www.twilio.com/en-us/legal/privacy" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 underline">Twilio&apos;s Privacy Policy</a>.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">4. User Responsibilities</h2>
            <p className="mb-4">You agree to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate and complete information when using our services</li>
              <li>Maintain the confidentiality of any account credentials</li>
              <li>Use our services only for lawful purposes</li>
              <li>Not interfere with or disrupt our services or servers</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">5. Intellectual Property</h2>
            <p>All content, features, and functionality of our services, including but not limited to text, graphics, logos, and software, are owned by XenTeck (LevEL 7 Media LLC) and are protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written consent.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">6. Payment Terms</h2>
            <p>For paid services, payment terms will be specified in a separate service agreement or proposal. All fees are non-refundable unless otherwise stated in writing. We reserve the right to modify pricing with reasonable notice.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">7. Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, XenTeck shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your use of our services.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">8. Disclaimer of Warranties</h2>
            <p>Our services are provided "as is" and "as available" without any warranties of any kind, either express or implied. We do not guarantee that our services will be uninterrupted, secure, or error-free.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">9. Indemnification</h2>
            <p>You agree to indemnify and hold harmless XenTeck (LevEL 7 Media LLC), its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses arising out of your use of our services or violation of these terms.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">10. Termination</h2>
            <p>We may terminate or suspend your access to our services immediately, without prior notice, for any reason, including breach of these Terms. Upon termination, your right to use our services will cease immediately.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">11. Governing Law</h2>
            <p>These Terms shall be governed by and construed in accordance with the laws of the State of Michigan, without regard to its conflict of law provisions.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">12. Changes to Terms</h2>
            <p>We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to our website. Your continued use of our services after any changes constitutes acceptance of the new Terms.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">13. Contact Information</h2>
            <p className="mb-4">For questions about these Terms of Service, please contact us:</p>
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
          <Link href="/privacy" className="text-cyan-400 hover:text-cyan-300">Privacy Policy →</Link>
        </div>
      </div>
    </main>
  )
}
