import { useState } from 'react';

type Reminder = {
  id: string;
  scheme: string;
  deadline: string;
  notes: string;
};

export default function ReminderManager() {
  const [scheme, setScheme] = useState('');
  const [deadline, setDeadline] = useState('');
  const [notes, setNotes] = useState('');
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: 'rem-1',
      scheme: 'City Housing Grant',
      deadline: '2026-05-18',
      notes: 'Upload income verification before the deadline.'
    },
    {
      id: 'rem-2',
      scheme: 'Small Business Relief',
      deadline: '2026-05-28',
      notes: 'Confirm your business license and tax ID.'
    }
  ]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!scheme.trim() || !deadline) {
      return;
    }

    const newReminder: Reminder = {
      id: `rem-${Date.now()}`,
      scheme: scheme.trim(),
      deadline,
      notes: notes.trim() || 'No additional notes.'
    };

    setReminders((current) => [newReminder, ...current]);
    setScheme('');
    setDeadline('');
    setNotes('');
  };

  const handleRemove = (id: string) => {
    setReminders((current) => current.filter((reminder) => reminder.id !== id));
  };

  return (
    <section className="bg-slate-950/80 px-6 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-civic-gold">Reminder manager</p>
            <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Save and track scheme deadlines.</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400">Keep your government scheme deadlines in one place and never miss an important filing date.</p>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] border border-white/10 bg-slate-900/90 p-8 shadow-2xl shadow-black/20">
            <h3 className="text-xl font-semibold text-white">Add a new reminder</h3>
            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <label className="block text-sm text-slate-300">
                Scheme name
                <input
                  type="text"
                  value={scheme}
                  onChange={(event) => setScheme(event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-civic-gold/50"
                  placeholder="e.g. Transportation Support"
                />
              </label>
              <label className="block text-sm text-slate-300">
                Deadline
                <input
                  type="date"
                  value={deadline}
                  onChange={(event) => setDeadline(event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-civic-gold/50"
                />
              </label>
              <label className="block text-sm text-slate-300">
                Notes
                <textarea
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-civic-gold/50"
                  rows={4}
                  placeholder="Optional details about the deadline or required documents."
                />
              </label>

              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-civic-gold px-6 py-3 text-sm font-semibold text-civic-navy transition hover:brightness-105"
              >
                Save reminder
              </button>
            </form>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-slate-900/90 p-8 shadow-2xl shadow-black/20">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-civic-gold">Upcoming deadlines</p>
                <h3 className="mt-3 text-xl font-semibold text-white">Saved deadlines</h3>
              </div>
              <span className="rounded-full bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.24em] text-slate-300">{reminders.length} reminders</span>
            </div>
            <div className="mt-8 space-y-4">
              {reminders.length === 0 ? (
                <p className="rounded-3xl border border-dashed border-white/10 bg-slate-950/90 p-6 text-sm text-slate-400">No reminders yet. Add a scheme deadline to stay on top of filings.</p>
              ) : (
                reminders.map((reminder) => (
                  <div key={reminder.id} className="rounded-3xl border border-white/10 bg-slate-950/90 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-white">{reminder.scheme}</p>
                        <p className="mt-2 text-sm text-slate-400">Deadline: <span className="font-semibold text-slate-200">{reminder.deadline}</span></p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemove(reminder.id)}
                        className="rounded-full bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300 transition hover:bg-white/10"
                      >
                        Remove
                      </button>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-slate-300">{reminder.notes}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
