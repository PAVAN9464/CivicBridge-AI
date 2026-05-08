import { FormEvent, useState } from 'react';

type EligibilityStatus = 'eligible' | 'conditional' | 'notEligible';

type EligibilityResult = {
  status: EligibilityStatus;
  title: string;
  description: string;
  cards: { label: string; value: string; tone: 'success' | 'warning' | 'danger' }[];
};

const states = ['California', 'Texas', 'New York', 'Florida', 'Illinois'];
const categories = ['General', 'Senior', 'Veteran', 'Disability'];
const occupations = ['Public servant', 'Healthcare worker', 'Small business owner', 'Unemployed', 'Student'];

function assessEligibility(age: number, income: number, category: string, occupation: string): EligibilityResult {
  if (age < 18) {
    return {
      status: 'notEligible',
      title: 'Not eligible yet',
      description: 'Applicants must be at least 18 years old to qualify for most CivicBridge programs.',
      cards: [
        { label: 'Required age', value: '18+', tone: 'danger' },
        { label: 'Current age', value: `${age}`, tone: 'danger' },
        { label: 'Next step', value: 'Wait until you turn 18 or contact support for youth services.', tone: 'warning' }
      ]
    };
  }

  const lowIncome = income <= 35000;
  const mediumIncome = income <= 60000;
  const highIncome = income > 60000;
  const specialCategory = category === 'Senior' || category === 'Disability' || category === 'Veteran';
  const frontline = occupation === 'Public servant' || occupation === 'Healthcare worker';

  if (specialCategory && age >= 55) {
    return {
      status: 'eligible',
      title: 'Eligible for priority support',
      description: 'Your profile matches criteria for accelerated service and tailored government benefits.',
      cards: [
        { label: 'Program fit', value: 'High', tone: 'success' },
        { label: 'Income threshold', value: income <= 75000 ? 'Met' : 'Review needed', tone: income <= 75000 ? 'success' : 'warning' },
        { label: 'Recommended action', value: 'Submit application with priority review.', tone: 'success' }
      ]
    };
  }

  if (lowIncome || frontline) {
    return {
      status: 'eligible',
      title: 'Likely eligible',
      description: 'Your income and occupation profile fit the eligibility window for public support services.',
      cards: [
        { label: 'Income status', value: lowIncome ? 'Low income' : 'Within threshold', tone: 'success' },
        { label: 'Occupation support', value: frontline ? 'Frontline priority' : 'Standard review', tone: 'success' },
        { label: 'Next step', value: 'Complete the application and upload documents.', tone: 'success' }
      ]
    };
  }

  if (mediumIncome) {
    return {
      status: 'conditional',
      title: 'Conditional eligibility',
      description: 'Your profile may qualify after further assessment or document verification.',
      cards: [
        { label: 'Income status', value: 'Moderate income', tone: 'warning' },
        { label: 'Required documents', value: 'Proof of residency / income', tone: 'warning' },
        { label: 'Next step', value: 'Submit for eligibility review.', tone: 'warning' }
      ]
    };
  }

  return {
    status: 'notEligible',
    title: 'Not eligible at this time',
    description: 'Your current income and profile indicate that this program is not the best match right now.',
    cards: [
      { label: 'Income status', value: 'Above threshold', tone: 'danger' },
      { label: 'Category match', value: category === 'General' ? 'Standard' : category, tone: 'warning' },
      { label: 'Recommendation', value: 'Review alternative programs or lower-income services.', tone: 'danger' }
    ]
  };
}

export default function EligibilityChecker() {
  const [age, setAge] = useState(34);
  const [income, setIncome] = useState(42000);
  const [state, setState] = useState(states[0]);
  const [category, setCategory] = useState(categories[0]);
  const [occupation, setOccupation] = useState(occupations[0]);
  const [result, setResult] = useState<EligibilityResult | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult(assessEligibility(age, income, category, occupation));
  };

  const toneStyles = {
    success: 'bg-emerald-500/10 border-emerald-400/20 text-emerald-200',
    warning: 'bg-amber-500/10 border-amber-400/20 text-amber-200',
    danger: 'bg-rose-500/10 border-rose-400/20 text-rose-200'
  } as const;

  return (
    <section id="eligibility" className="px-6 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-civic-gold">Eligibility checker</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Check your fit for CivicBridge AI services.</h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-400">Enter a few details to evaluate eligibility and see personalized guidance in real time.</p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-slate-950/90 p-8 shadow-2xl shadow-black/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm text-slate-300">
                  Age
                  <input
                    type="number"
                    min={0}
                    value={age}
                    onChange={(event) => setAge(Number(event.target.value))}
                    className="w-full rounded-2xl border border-white/10 bg-slate-900/90 px-4 py-3 text-white outline-none transition focus:border-civic-gold/50"
                  />
                </label>
                <label className="space-y-2 text-sm text-slate-300">
                  Annual income ($)
                  <input
                    type="number"
                    min={0}
                    value={income}
                    onChange={(event) => setIncome(Number(event.target.value))}
                    className="w-full rounded-2xl border border-white/10 bg-slate-900/90 px-4 py-3 text-white outline-none transition focus:border-civic-gold/50"
                  />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm text-slate-300">
                  State
                  <select
                    value={state}
                    onChange={(event) => setState(event.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-slate-900/90 px-4 py-3 text-white outline-none transition focus:border-civic-gold/50"
                  >
                    {states.map((option) => (
                      <option key={option} value={option} className="bg-slate-950 text-white">
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="space-y-2 text-sm text-slate-300">
                  Category
                  <select
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-slate-900/90 px-4 py-3 text-white outline-none transition focus:border-civic-gold/50"
                  >
                    {categories.map((option) => (
                      <option key={option} value={option} className="bg-slate-950 text-white">
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="space-y-2 text-sm text-slate-300">
                Occupation
                <select
                  value={occupation}
                  onChange={(event) => setOccupation(event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-slate-900/90 px-4 py-3 text-white outline-none transition focus:border-civic-gold/50"
                >
                  {occupations.map((option) => (
                    <option key={option} value={option} className="bg-slate-950 text-white">
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-full bg-civic-gold px-6 py-3 text-sm font-semibold text-civic-navy transition hover:brightness-105"
              >
                Check eligibility
              </button>
            </form>

            <div className="mt-10 space-y-5">
              {result ? (
                <>
                  <div className="rounded-3xl border border-white/10 bg-slate-900/95 p-6">
                    <h3 className="text-xl font-semibold text-white">{result.title}</h3>
                    <p className="mt-3 text-slate-400">{result.description}</p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    {result.cards.map((card) => (
                      <div
                        key={card.label}
                        className={`rounded-3xl border px-5 py-5 ${toneStyles[card.tone]} border-white/10`}
                      >
                        <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{card.label}</p>
                        <p className="mt-3 text-lg font-semibold">{card.value}</p>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="rounded-3xl border border-dashed border-white/10 bg-slate-900/90 p-6 text-slate-400">
                  <p className="text-sm">Complete the form above to see your eligibility status and recommended next steps.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
