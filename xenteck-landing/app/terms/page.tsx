import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | XenTeck',
  description: 'XenTeck Terms of Service',
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Terms of Service</h1>
        <p className="text-slate-400 mb-8">Last Updated: December 21, 2025</p>
        <div className="space-y-8 text-slate-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
            <p>By accessing or using the services provided by XenTeck, a division of LevEL 7 Media LLC, you agree to be bound by these Terms of Service.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. Services</h2>
            <p>XenTeck provides AI automation consulting services including business process automation, lead generation systems, CRM integration, speed-to-lead response systems, and workflow automation.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. SMS/Text Messaging</h2>
            <p>By providing your phone number and opting in to receive text messages from XenTeck, you consent to receive service-related notifications, appointment reminders, and responses to your inquiries. Message frequency varies. Message and data rates may apply. You may opt out at any time by replying STOP. For help, reply HELP or contact admin@xenteck.com.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Contact</h2>
            <div className="p-4 bg-slate-800/50 rounded-lg">
              <p><strong>XenTeck</strong> (a division of LevEL 7 Media LLC)</p>
              <p>Email: admin@xenteck.com</p>
              <p>Phone: (810) 292-0007</p>
            </div>
          </section>
        </div>
        <div className="mt-12 pt-8 border-t border-slate-800">
          <a href="/" className="text-cyan-400 hover:text-cyan-300">← Back to Home</a>
        </div>
      </div>
    </main>
  )
}