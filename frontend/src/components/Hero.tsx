export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-br from-civic-navy via-slate-900 to-slate-800 px-6 py-20 sm:px-8 lg:px-12">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.18),_transparent_55%)]" />
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="relative z-10">
          <span className="inline-flex rounded-full bg-civic-gold/10 px-3 py-1 text-sm font-semibold uppercase tracking-[0.25em] text-civic-gold ring-1 ring-civic-gold/20">
            Trusted by public sector teams
          </span>
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            CivicBridge AI helps governments deliver smarter citizen services with secure, AI-powered workflows.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
            Launch faster, reduce friction, and guide residents through eligibility, benefits, and support with an AI assistant built for public impact.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#platform"
              className="inline-flex items-center justify-center rounded-full bg-civic-gold px-6 py-3 text-sm font-semibold text-civic-navy shadow-lg shadow-civic-gold/20 transition hover:brightness-105"
            >
              Explore the platform
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-civic-gold/40 hover:text-civic-gold"
            >
              Talk to our team
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-2xl shadow-black/30 sm:p-8">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-civic-gold/10 blur-3xl" />
          <div className="absolute left-6 top-6 h-14 w-14 rounded-2xl border border-white/10 bg-white/5" />
          <div className="relative rounded-[1.75rem] border border-white/10 bg-slate-900/95 p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4 pb-4 text-sm text-slate-400">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-3.5 w-3.5 rounded-full bg-emerald-400" />
                <span>AI assistant online</span>
              </div>
              <span className="rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-300">Secure chat</span>
            </div>

            <div className="space-y-5">
              <div className="rounded-3xl bg-slate-950/90 p-5 text-slate-300 shadow-inner shadow-black/10">
                <p className="text-sm font-semibold text-white">CivicBridge Assistant</p>
                <p className="mt-3 text-base leading-7">
                  "I can help residents check eligibility, track application status, and find the right government program in seconds."
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-civic-navy/80 p-5 text-slate-200">
                  <p className="text-sm uppercase tracking-[0.2em] text-civic-gold">Eligibility</p>
                  <p className="mt-3 text-lg font-semibold text-white">Fast pre-screening</p>
                </div>
                <div className="rounded-3xl bg-civic-navy/80 p-5 text-slate-200">
                  <p className="text-sm uppercase tracking-[0.2em] text-civic-gold">Workflow</p>
                  <p className="mt-3 text-lg font-semibold text-white">Case routing</p>
                </div>
              </div>
              <div className="rounded-3xl bg-slate-950/90 p-5 text-slate-300">
                <div className="flex items-center justify-between text-sm text-slate-400">
                  <span>Resident request</span>
                  <span className="text-emerald-300">Answered</span>
                </div>
                <p className="mt-3 text-base leading-7 text-white">
                  "What documents do I need to apply for housing support?"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
