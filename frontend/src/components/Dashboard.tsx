const savedSchemes = [
  {
    name: 'City Housing Grant',
    status: 'In review',
    due: 'Apr 18',
    details: 'Housing support for low-income residents.'
  },
  {
    name: 'Small Business Relief',
    status: 'Approved',
    due: 'Completed',
    details: 'Financial assistance package for local vendors.'
  },
  {
    name: 'Senior Care Subsidy',
    status: 'Action needed',
    due: 'May 5',
    details: 'Subsidy for seniors with eligible household income.'
  }
];

const reminders = [
  { label: 'Upload proof of income', due: 'Today' },
  { label: 'Schedule appointment', due: 'May 9' },
  { label: 'Review case notes', due: 'May 12' }
];

const insights = [
  {
    title: 'Eligibility signal',
    text: 'Your profile is trending toward priority review for service programs.',
    tone: 'bg-emerald-500/10 text-emerald-200 border-emerald-400/20'
  },
  {
    title: 'AI recommendation',
    text: 'Consider submitting your documentation earlier to accelerate approval.',
    tone: 'bg-civic-gold/10 text-civic-gold border-civic-gold/20'
  },
  {
    title: 'Workflow insight',
    text: 'Case assignments are currently balanced across two support teams.',
    tone: 'bg-sky-500/10 text-sky-200 border-sky-400/20'
  }
];

export default function Dashboard() {
  return (
    <section id="dashboard" className="bg-slate-950/80 px-6 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-civic-gold">Dashboard</p>
            <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Your CivicBridge AI overview.</h2>
          </div>
          <div className="rounded-full bg-white/5 px-5 py-3 text-sm font-medium text-slate-300 ring-1 ring-white/10">
            Live insights updated just now
          </div>
        </div>

        <div className="mt-12 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <div className="rounded-[2rem] border border-white/10 bg-slate-900/90 p-8 shadow-2xl shadow-black/20">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-civic-gold">Saved schemes</p>
                  <h3 className="mt-3 text-2xl font-semibold text-white">Active program pipeline</h3>
                </div>
                <span className="rounded-full bg-slate-800/70 px-4 py-2 text-xs uppercase tracking-[0.24em] text-slate-300">3 schemes</span>
              </div>

              <div className="mt-8 space-y-4">
                {savedSchemes.map((scheme) => (
                  <div key={scheme.name} className="rounded-3xl border border-white/10 bg-slate-950/90 p-5 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-white">{scheme.name}</p>
                      <p className="mt-2 text-sm text-slate-400">{scheme.details}</p>
                    </div>
                    <div className="mt-4 flex flex-col gap-2 text-right text-sm sm:mt-0">
                      <span className="font-semibold text-slate-100">{scheme.status}</span>
                      <span className="text-slate-500">Due {scheme.due}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-slate-900/90 p-8 shadow-2xl shadow-black/20">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-civic-gold">AI insights</p>
                  <h3 className="mt-3 text-2xl font-semibold text-white">Actionable guidance</h3>
                </div>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {insights.map((insight) => (
                  <div key={insight.title} className={`rounded-3xl border p-5 ${insight.tone}`}>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-300">{insight.title}</p>
                    <p className="mt-4 text-sm leading-6 text-slate-100">{insight.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-white/10 bg-slate-900/90 p-8 shadow-2xl shadow-black/20">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-civic-gold">Eligibility status</p>
                  <h3 className="mt-3 text-2xl font-semibold text-white">Ready for review</h3>
                </div>
                <span className="rounded-full bg-emerald-500/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-emerald-200">High priority</span>
              </div>

              <div className="mt-8 space-y-5">
                <div className="rounded-3xl border border-emerald-400/20 bg-emerald-500/5 p-5">
                  <p className="text-sm uppercase tracking-[0.24em] text-emerald-200">Current eligibility</p>
                  <p className="mt-3 text-lg font-semibold text-white">75% match</p>
                  <p className="mt-2 text-slate-400">Most applications are likely to advance to the next phase after document submission.</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-5">
                  <div className="flex items-center justify-between text-sm text-slate-300">
                    <span>Verification progress</span>
                    <span>60%</span>
                  </div>
                  <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-3/5 rounded-full bg-civic-gold" />
                  </div>
                </div>
                <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-5">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Recommended next step</p>
                  <p className="mt-3 text-sm text-slate-200">Finalize supporting documents and confirm contact details for expedited approvals.</p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-slate-900/90 p-8 shadow-2xl shadow-black/20">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-civic-gold">Reminders</p>
                  <h3 className="mt-3 text-2xl font-semibold text-white">Stay on track</h3>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                {reminders.map((reminder) => (
                  <div key={reminder.label} className="rounded-3xl border border-white/10 bg-slate-950/90 px-5 py-4 text-slate-200">
                    <div className="flex items-center justify-between gap-3 text-sm text-slate-400">
                      <span>{reminder.label}</span>
                      <span className="rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-300">{reminder.due}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
