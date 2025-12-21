import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Privacy | XenTeck', description: 'Privacy Policy' }
export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-slate-400 mb-6">Last Updated: December 21, 2025</p>
        <div className="space-y-6 text-slate-300">
          <section><h2 className="text-xl font-bold mb-2">1. Introduction</h2><p>XenTeck (LevEL 7 Media LLC) respects your privacy.</p></section>
          <section><h2 className="text-xl font-bold mb-2">2. SMS Privacy</h2><p>Your phone number will not be sold. Message frequency varies. Standard rates may apply. Reply STOP to opt out. Carriers not liable for delays.</p></section>
          <section><h2 className="text-xl font-bold mb-2">3. Contact</h2><p>XenTeck (LevEL 7 Media LLC) - admin@xenteck.com - (810) 292-0007</p></section>
        </div>
        <a href="/" className="text-cyan-400 mt-8 inline-block">Back to Home</a>
      </div>
    </main>
  )
}