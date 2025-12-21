import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Terms | XenTeck', description: 'Terms of Service' }
export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        <p className="text-slate-400 mb-6">Last Updated: December 21, 2025</p>
        <div className="space-y-6 text-slate-300">
          <section><h2 className="text-xl font-bold mb-2">1. Acceptance</h2><p>By using XenTeck (LevEL 7 Media LLC) services, you agree to these terms.</p></section>
          <section><h2 className="text-xl font-bold mb-2">2. SMS Terms</h2><p>By opting in to SMS, you consent to receive service notifications. Message rates may apply. Reply STOP to opt out, HELP for help. Contact: admin@xenteck.com</p></section>
          <section><h2 className="text-xl font-bold mb-2">3. Contact</h2><p>XenTeck (LevEL 7 Media LLC) - admin@xenteck.com - (810) 292-0007</p></section>
        </div>
        <a href="/" className="text-cyan-400 mt-8 inline-block">Back to Home</a>
      </div>
    </main>
  )
}