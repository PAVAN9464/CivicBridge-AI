import Chatbot from './components/Chatbot';
import Dashboard from './components/Dashboard';
import EligibilityChecker from './components/EligibilityChecker';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import ReminderManager from './components/ReminderManager';

function App() {
  return (
    <div className="min-h-screen bg-civic-navy text-slate-100">
      <Navbar />

      <main>
        <Hero />

        <section id="schemes" className="bg-slate-950/80 px-6 py-20 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-civic-gold">Scheme highlights</p>
                <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">A modern government-tech toolkit built for digital-first service delivery.</h2>
              </div>
              <p className="max-w-2xl text-sm leading-6 text-slate-400">From policy-aware workflows to resident-facing chat experiences, CivicBridge AI puts public service teams in control of secure, connected programs.</p>
            </div>

            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              <article className="rounded-3xl border border-white/10 bg-civic-navy/80 p-8 shadow-xl shadow-black/20">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-civic-gold">Connected cases</p>
                <h3 className="mt-4 text-xl font-semibold text-white">Intelligent case orchestration</h3>
                <p className="mt-3 text-slate-400">Automate eligibility decisions, manage approvals, and keep stakeholders aligned with one consistent service workflow.</p>
              </article>
              <article className="rounded-3xl border border-white/10 bg-civic-navy/80 p-8 shadow-xl shadow-black/20">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-civic-gold">Citizen first</p>
                <h3 className="mt-4 text-xl font-semibold text-white">Conversational service access</h3>
                <p className="mt-3 text-slate-400">Deliver secure AI chat guidance for applications, requests, and eligibility questions that keeps residents moving forward.</p>
              </article>
              <article className="rounded-3xl border border-white/10 bg-civic-navy/80 p-8 shadow-xl shadow-black/20">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-civic-gold">Compliance</p>
                <h3 className="mt-4 text-xl font-semibold text-white">Policy-aware decision support</h3>
                <p className="mt-3 text-slate-400">Embed regulations, privacy requirements, and audit trails into every workflow for safe, accountable delivery.</p>
              </article>
            </div>
          </div>
        </section>

        <section id="chatbot" className="border-t border-white/10 bg-gradient-to-b from-slate-950/90 to-civic-navy/95 px-6 py-20 sm:px-8 lg:px-12">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-civic-gold">Chatbot preview</p>
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">AI-guided citizen support for every request.</h2>
              <p className="max-w-xl text-base leading-7 text-slate-400">Embed conversational access across digital forms, service portals, and outreach channels so residents can get answers, status updates, and next steps anytime.</p>
            </div>
            <Chatbot />
          </div>
        </section>

        <EligibilityChecker />

        <ReminderManager />

        <Dashboard />
      </main>

      <footer id="contact" className="border-t border-white/10 bg-slate-950/90 px-6 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-civic-gold">CivicBridge AI</p>
              <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">Modern digital services for local and regional government teams. Build trust, reduce friction, and scale service access with AI-first solutions.</p>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-civic-gold">Quick Links</p>
              <div className="mt-4 space-y-2">
                <a href="#schemes" className="block text-sm text-slate-300 transition hover:text-white">Schemes</a>
                <a href="#chatbot" className="block text-sm text-slate-300 transition hover:text-white">Chatbot</a>
                <a href="#eligibility" className="block text-sm text-slate-300 transition hover:text-white">Eligibility</a>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-civic-gold">Contact</p>
              <div className="mt-4 space-y-3">
                <div>
                  <p className="text-xs text-slate-400">Email:</p>
                  <a href="mailto:pavannp756@gmail.com" className="block text-sm font-medium text-civic-gold transition hover:text-white">pavannp756@gmail.com</a>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Phone:</p>
                  <a href="tel:+918660055177" className="block text-sm font-medium text-civic-gold transition hover:text-white">+91-8660055177</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-10 text-center text-xs uppercase tracking-[0.32em] text-slate-600">© 2026 CivicBridge AI. Designed for secure public service delivery.</p>
      </footer>
    </div>
  );
}

export default App;
