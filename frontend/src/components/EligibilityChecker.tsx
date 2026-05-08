import { FormEvent, useState, ChangeEvent } from 'react';

type EligibilityStatus = 'eligible' | 'conditional' | 'notEligible' | 'checking';

type EligibilityResult = {
  status: EligibilityStatus;
  title: string;
  description: string;
  cards: { label: string; value: string; tone: 'success' | 'warning' | 'danger' }[];
  jobTitle?: string;
  matchPercentage?: number;
};

const states = ['Maharashtra', 'Karnataka', 'Tamil Nadu', 'Delhi', 'Uttar Pradesh', 'West Bengal', 'Gujarat', 'Rajasthan', 'Kerala', 'Punjab'];
const categories = ['General', 'OBC', 'SC/ST'];
const occupations = ['Government employee', 'Healthcare worker', 'Small business owner', 'Unemployed', 'Student'];

function analyzeResumeForJob(resumeText: string, job: any): { score: number; factors: string[] } {
  const resumeUpper = resumeText.toUpperCase();
  let score = 0;
  const factors = [];

  // Check for qualifications
  const qualifications = job.qualifications.split('/').map((q: string) => q.trim());
  qualifications.forEach((qualification: string) => {
    const qualUpper = qualification.toUpperCase();
    if (resumeUpper.includes(qualUpper)) {
      score += 15;
      factors.push(`Qualification found: ${qualification}`);
    }
  });

  // Department-specific keywords
  const deptKeywords = getDepartmentKeywords(job.department);
  deptKeywords.forEach(keyword => {
    if (resumeUpper.includes(keyword.toUpperCase())) {
      score += 8;
      factors.push(`Relevant experience: ${keyword}`);
    }
  });

  // Experience indicators
  if (resumeUpper.includes('EXPERIENCE') || resumeUpper.includes('WORKED') || resumeUpper.includes('YEARS')) {
    score += 10;
    factors.push('Professional experience detected');
  }

  return { score, factors };
}

function getDepartmentKeywords(department: string): string[] {
  const keywords: { [key: string]: string[] } = {
    'Social Welfare': ['Social Work', 'Welfare', 'Community', 'NGO', 'Development', 'Sociology'],
    'IT & Digital Services': ['Digital', 'IT', 'Technology', 'Software', 'Portal', 'Online', 'Computer', 'Programming'],
    'Health Department': ['Health', 'Medical', 'Healthcare', 'Clinical', 'Public Health', 'Nursing'],
    'Municipal Corporation': ['Urban', 'Planning', 'Infrastructure', 'Municipal', 'Development', 'Architecture'],
    'Education Department': ['Education', 'Teaching', 'School', 'Curriculum', 'Learning', 'Academic'],
    'Revenue Department': ['Tax', 'Revenue', 'Finance', 'Compliance', 'Audit', 'Financial'],
    'Environment Department': ['Environment', 'Ecology', 'Sustainability', 'Green', 'Conservation', 'Environmental'],
    'General Administration': ['Administration', 'Management', 'Coordination', 'Documentation', 'Governance']
  };

  return keywords[department] || [];
}

const governmentJobPostings = [
  { id: 1, title: 'Government Scheme Officer', department: 'Social Welfare', minAge: 21, maxAge: 35, qualifications: 'Bachelor Degree in Social Work/Sociology', salary: '₹4.5-7.5 LPA' },
  { id: 2, title: 'Digital Services Coordinator', department: 'IT & Digital Services', minAge: 22, maxAge: 40, qualifications: 'BE/B.Tech in CS/IT or MCA', salary: '₹6-10 LPA' },
  { id: 3, title: 'Public Health Inspector', department: 'Health Department', minAge: 21, maxAge: 45, qualifications: 'Bachelor in Public Health/Nursing', salary: '₹3.5-6 LPA' },
  { id: 4, title: 'Urban Planning Assistant', department: 'Municipal Corporation', minAge: 21, maxAge: 35, qualifications: 'Bachelor in Urban Planning/Architecture', salary: '₹4-7 LPA' },
  { id: 5, title: 'Education Welfare Officer', department: 'Education Department', minAge: 22, maxAge: 40, qualifications: 'Bachelor/Master in Education', salary: '₹4.5-8 LPA' },
  { id: 6, title: 'Tax Compliance Officer', department: 'Revenue Department', minAge: 21, maxAge: 35, qualifications: 'Bachelor in Commerce/Finance', salary: '₹5-8.5 LPA' },
  { id: 7, title: 'Environmental Officer', department: 'Environment Department', minAge: 22, maxAge: 40, qualifications: 'Bachelor in Environmental Science', salary: '₹4-7 LPA' },
  { id: 8, title: 'Administrative Assistant', department: 'General Administration', minAge: 18, maxAge: 35, qualifications: 'Bachelor Degree', salary: '₹3-5.5 LPA' }
];

function assessEligibility(age: number, income: number, category: string, occupation: string, selectedJob?: number, resumeText?: string): EligibilityResult {
  // If a specific job is selected, check job-specific eligibility
  if (selectedJob) {
    const job = governmentJobPostings.find(j => j.id === selectedJob);
    if (!job) {
      return {
        status: 'notEligible',
        title: 'Job not found',
        description: 'The selected government job posting is not available.',
        cards: []
      };
    }

    // Check age eligibility for the job
    if (age < job.minAge || age > job.maxAge) {
      return {
        status: 'notEligible',
        title: 'Age requirement not met',
        description: `The ${job.title} position requires candidates between ${job.minAge}-${job.maxAge} years old.`,
        cards: [
          { label: 'Required Age Range', value: `${job.minAge}-${job.maxAge} years`, tone: 'danger' },
          { label: 'Your Age', value: `${age} years`, tone: 'danger' },
          { label: 'Next Step', value: 'Check other positions that match your age group', tone: 'warning' }
        ]
      };
    }

    // Check general eligibility factors
    const lowIncome = income <= 500000;
    const specialCategory = category === 'OBC' || category === 'SC/ST';
    const governmentExperience = occupation === 'Government employee';

    let matchScore = 0;
    const factors = [];

    // Age match (within range)
    matchScore += 20;
    factors.push('Age requirement met');

    // Income consideration (government jobs often prefer moderate income)
    if (income <= 800000) {
      matchScore += 15;
      factors.push('Income within acceptable range');
    }

    // Category benefits
    if (specialCategory) {
      matchScore += 10;
      factors.push('Reserved category benefits apply');
    }

    // Government experience bonus
    if (governmentExperience) {
      matchScore += 15;
      factors.push('Government experience preferred');
    }

    // Education and qualification match (simplified)
    if (resumeText) {
      // Analyze resume for job-specific qualifications
      const resumeAnalysis = analyzeResumeForJob(resumeText, job);
      matchScore += resumeAnalysis.score;
      factors.push(...resumeAnalysis.factors);
    } else {
      matchScore += 25;
      factors.push('Basic qualification requirements met');
    }

    let statusResult: EligibilityStatus;
    if (matchScore >= 70) {
      statusResult = 'eligible';
    } else if (matchScore >= 50) {
      statusResult = 'conditional';
    } else {
      statusResult = 'notEligible';
    }

    const statusTone = statusResult === 'eligible' ? 'success' : statusResult === 'conditional' ? 'warning' : 'danger';

    return {
      status: statusResult,
      title: statusResult === 'eligible' ? `Eligible for ${job.title}!` : statusResult === 'conditional' ? `Conditional eligibility for ${job.title}` : `Not eligible for ${job.title}`,
      description: statusResult === 'eligible'
        ? `Your profile matches the requirements for this government position.`
        : statusResult === 'conditional'
        ? `Your profile partially matches. Additional documentation may be required.`
        : `Your profile does not meet the current requirements for this position.`,
      cards: [
        { label: 'Position', value: job.title, tone: statusTone },
        { label: 'Department', value: job.department, tone: statusTone },
        { label: 'Match Score', value: `${matchScore}%`, tone: statusTone },
        { label: 'Salary Range', value: job.salary, tone: statusTone },
        { label: 'Eligibility Factors', value: factors.join(', '), tone: statusTone }
      ],
      jobTitle: job.title,
      matchPercentage: matchScore
    };
  }

  // Original general eligibility assessment
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

  const lowIncome = income <= 300000;
  const mediumIncome = income <= 600000;
  const highIncome = income > 600000;
  const specialCategory = category === 'OBC' || category === 'SC/ST';
  const frontline = occupation === 'Government employee' || occupation === 'Healthcare worker';

  if (specialCategory && age >= 50) {
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
  const [selectedJob, setSelectedJob] = useState<number | undefined>(undefined);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState<string>('');
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const [result, setResult] = useState<EligibilityResult | null>(null);

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      alert('Please upload a PDF file');
      return;
    }

    setResumeFile(file);
    setIsProcessingFile(true);

    try {
      const text = await readPdfFile(file);
      setResumeText(text);
    } catch (error) {
      console.error('Error reading PDF:', error);
      alert('Error reading PDF file. Please try again.');
    } finally {
      setIsProcessingFile(false);
    }
  };

  const readPdfFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        // For demo purposes, we'll simulate PDF text extraction
        // In a real app, you'd use a PDF parsing library like pdf-parse or pdfjs-dist
        const mockText = `RESUME CONTENT SIMULATION:
        Name: John Doe
        Education: Bachelor of Technology in Computer Science
        Experience: 3 years in software development
        Skills: JavaScript, React, Node.js, Python, SQL
        Certifications: AWS Certified Developer
        Previous Roles: Software Engineer at Tech Corp, Junior Developer at Startup Inc
        Projects: Built e-commerce platform, Developed mobile app
        Languages: English (Fluent), Hindi (Native)`;

        resolve(mockText);
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsArrayBuffer(file);
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult(assessEligibility(age, income, category, occupation, selectedJob, resumeText));
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
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Check your fit for government services and job opportunities.</h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-400">Enter your details to evaluate eligibility for government schemes and job postings. Select a specific government job to check targeted eligibility.</p>
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
                  Annual income (₹)
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

              <div>
                <label className="block space-y-2 text-sm text-slate-300">
                  Government Job Posting (Optional)
                  <select
                    value={selectedJob || ''}
                    onChange={(event) => setSelectedJob(event.target.value ? Number(event.target.value) : undefined)}
                    className="w-full rounded-2xl border border-white/10 bg-slate-900/90 px-4 py-3 text-white outline-none transition focus:border-civic-gold/50"
                  >
                    <option value="">General eligibility check</option>
                    {governmentJobPostings.map((job) => (
                      <option key={job.id} value={job.id}>
                        {job.title} - {job.department} ({job.salary})
                      </option>
                    ))}
                  </select>
                </label>
                {selectedJob && (
                  <p className="mt-2 text-xs text-slate-500">
                    {governmentJobPostings.find(j => j.id === selectedJob)?.qualifications}
                  </p>
                )}
              </div>

              {selectedJob && (
                <div>
                  <label className="block space-y-2 text-sm text-slate-300">
                    Upload Resume (PDF) - Optional but recommended for better analysis
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileUpload}
                      className="w-full rounded-2xl border border-white/10 bg-slate-900/90 px-4 py-3 text-white outline-none transition focus:border-civic-gold/50 file:mr-4 file:rounded-lg file:border-0 file:bg-civic-gold file:px-3 file:py-1 file:text-sm file:font-semibold file:text-slate-900"
                    />
                  </label>
                  {isProcessingFile && (
                    <p className="mt-2 text-xs text-civic-gold">Processing PDF...</p>
                  )}
                  {resumeText && (
                    <p className="mt-2 text-xs text-emerald-400">Resume uploaded and analyzed ✓</p>
                  )}
                </div>
              )}

              <button
                type="submit"
                disabled={selectedJob ? isProcessingFile : false}
                className="w-full rounded-2xl bg-civic-gold px-6 py-3 font-semibold text-slate-900 transition hover:bg-civic-gold/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {selectedJob ? (isProcessingFile ? 'Processing...' : 'Check Job Eligibility') : 'Check General Eligibility'}
              </button>
            </form>
          </div>
        </div>

        {result && (
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <div className={`rounded-[2rem] border p-8 ${result.status === 'eligible' ? 'border-emerald-400/20 bg-emerald-500/5' : result.status === 'conditional' ? 'border-amber-400/20 bg-amber-500/5' : 'border-rose-400/20 bg-rose-500/5'}`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className={`text-sm font-semibold uppercase tracking-[0.24em] ${result.status === 'eligible' ? 'text-emerald-200' : result.status === 'conditional' ? 'text-amber-200' : 'text-rose-200'}`}>
                    Eligibility Result
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold text-white">{result.title}</h3>
                </div>
                {result.matchPercentage && (
                  <div className={`rounded-full px-4 py-2 text-center text-sm font-semibold ${result.status === 'eligible' ? 'bg-emerald-500/20 text-emerald-200' : result.status === 'conditional' ? 'bg-amber-500/20 text-amber-200' : 'bg-rose-500/20 text-rose-200'}`}>
                    {result.matchPercentage}%
                  </div>
                )}
              </div>
              <p className="mt-4 text-slate-300">{result.description}</p>
            </div>

            <div className="space-y-4">
              {result.cards.map((card, idx) => (
                <div key={idx} className={`rounded-3xl border p-5 ${toneStyles[card.tone]}`}>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-300">{card.label}</p>
                  <p className="mt-2 text-sm font-medium text-white">{card.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
