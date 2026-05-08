import { Request, Response } from 'express';
import JobPosting from '../models/JobPosting.js';
import { asyncHandler } from '../utils/asyncHandler.js';

interface JobEligibilityRequest {
  jobId?: string;
  age?: number;
  income?: number;
  category?: string;
  occupation?: string;
  resumeText?: string;
}

interface GeneralEligibilityRequest {
  age: number;
  income: number;
  state: string;
  category: string;
  occupation: string;
}

export const checkJobEligibility = asyncHandler(async (req: Request, res: Response) => {
  const { jobId, age, income, category, occupation, resumeText } = req.body as JobEligibilityRequest;

  if (jobId) {
    // Specific job eligibility check
    const job = await JobPosting.findById(jobId);

    if (!job) {
      res.status(404).json({ message: 'Job posting not found' });
      return;
    }

    const eligibilityResult = analyzeJobEligibility(job, { age, income, category, occupation }, resumeText);

    res.status(200).json({
      message: 'Job eligibility analysis completed',
      data: {
        jobId: job._id,
        jobTitle: job.title,
        department: job.department,
        ...eligibilityResult
      }
    });
  } else {
    // General eligibility check
    const { age: genAge, income: genIncome, state, category: genCategory, occupation: genOccupation } = req.body as GeneralEligibilityRequest;

    if (!genAge || !genIncome || !state || !genCategory || !genOccupation) {
      res.status(400).json({ message: 'Missing required fields for general eligibility check' });
      return;
    }

    const result = assessGeneralEligibility(genAge, genIncome, genCategory, genOccupation);

    res.status(200).json({
      message: 'General eligibility assessment completed',
      data: result
    });
  }
});

export const getJobPostings = asyncHandler(async (req: Request, res: Response) => {
  const jobPostings = await JobPosting.find({ active: true }).exec();

  res.status(200).json({
    message: 'Job postings retrieved successfully',
    data: jobPostings,
    total: jobPostings.length
  });
});

export const getJobPostingById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const jobPosting = await JobPosting.findById(id);

  if (!jobPosting) {
    res.status(404).json({ message: 'Job posting not found' });
    return;
  }

  res.status(200).json({
    message: 'Job posting retrieved successfully',
    data: jobPosting
  });
});

export const createJobPosting = asyncHandler(async (req: Request, res: Response) => {
  const { title, department, description, qualifications, minAge, maxAge, salary, deadline } = req.body;

  if (!title || !department || !minAge || !maxAge) {
    res.status(400).json({ message: 'Missing required fields' });
    return;
  }

  const jobPosting = new JobPosting({
    title,
    department,
    description,
    qualifications: qualifications || [],
    minAge,
    maxAge,
    salary: salary || { min: 0, max: 0 },
    deadline: deadline || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    active: true
  });

  await jobPosting.save();

  res.status(201).json({
    message: 'Job posting created successfully',
    data: jobPosting
  });
});

function analyzeJobEligibility(job: any, profile: any, resumeText?: string): any {
  let matchScore = 0;
  const factors = [];

  // Age check
  if (profile.age >= job.minAge && profile.age <= job.maxAge) {
    matchScore += 20;
    factors.push('Age requirement met');
  } else {
    factors.push('Age outside required range');
  }

  // Income consideration (government jobs often prefer moderate income)
  if (profile.income <= 800000) {
    matchScore += 15;
    factors.push('Income within acceptable range');
  }

  // Category benefits
  if (profile.category === 'OBC' || profile.category === 'SC/ST') {
    matchScore += 10;
    factors.push('Reserved category benefits apply');
  }

  // Government experience bonus
  if (profile.occupation === 'Government employee') {
    matchScore += 15;
    factors.push('Government experience preferred');
  }

  // Resume analysis if provided
  if (resumeText) {
    const resumeAnalysis = analyzeResumeForJob(resumeText, job);
    matchScore += resumeAnalysis.score;
    factors.push(...resumeAnalysis.factors);
  } else {
    // Basic qualification match
    matchScore += 25;
    factors.push('Basic qualification requirements met');
  }

  // Determine eligibility status
  let status: 'eligible' | 'conditional' | 'ineligible' = 'ineligible';
  if (matchScore >= 70) {
    status = 'eligible';
  } else if (matchScore >= 50) {
    status = 'conditional';
  }

  return {
    status,
    matchScore: Math.min(100, matchScore),
    factors,
    recommendations: generateJobRecommendations(status, matchScore, factors),
    analysisDetails: {
      ageMatch: profile.age >= job.minAge && profile.age <= job.maxAge,
      incomeSuitable: profile.income <= 800000,
      categoryBenefits: profile.category === 'OBC' || profile.category === 'SC/ST',
      governmentExperience: profile.occupation === 'Government employee'
    }
  };
}

function analyzeResumeForJob(resumeText: string, job: any): { score: number; factors: string[] } {
  const resumeUpper = resumeText.toUpperCase();
  let score = 0;
  const factors = [];

  // Check for qualifications
  job.qualifications.forEach((qualification: string) => {
    const qualUpper = qualification.toUpperCase();
    if (resumeUpper.includes(qualUpper)) {
      score += 10;
      factors.push(`Qualification found: ${qualification}`);
    }
  });

  // Department-specific keywords
  const deptKeywords = getDepartmentKeywords(job.department);
  deptKeywords.forEach(keyword => {
    if (resumeUpper.includes(keyword.toUpperCase())) {
      score += 5;
      factors.push(`Relevant experience: ${keyword}`);
    }
  });

  return { score, factors };
}

function getDepartmentKeywords(department: string): string[] {
  const keywords: { [key: string]: string[] } = {
    'Social Welfare': ['Social Work', 'Welfare', 'Community', 'NGO', 'Development'],
    'IT & Digital Services': ['Digital', 'IT', 'Technology', 'Software', 'Portal', 'Online'],
    'Health Department': ['Health', 'Medical', 'Public Health', 'Healthcare', 'Clinical'],
    'Municipal Corporation': ['Urban', 'Planning', 'Infrastructure', 'Municipal', 'Development'],
    'Education Department': ['Education', 'Teaching', 'School', 'Curriculum', 'Learning'],
    'Revenue Department': ['Tax', 'Revenue', 'Finance', 'Compliance', 'Audit'],
    'Environment Department': ['Environment', 'Ecology', 'Sustainability', 'Green', 'Conservation'],
    'General Administration': ['Administration', 'Management', 'Coordination', 'Documentation']
  };

  return keywords[department] || [];
}

function generateJobRecommendations(status: string, score: number, factors: string[]): string[] {
  const recommendations: string[] = [];

  if (status === 'eligible') {
    recommendations.push('Your profile is a strong match for this government position.');
    recommendations.push('Consider applying immediately as you meet the key requirements.');
    recommendations.push('Prepare for the application process and gather required documents.');
  } else if (status === 'conditional') {
    recommendations.push('Your profile partially matches the requirements.');
    recommendations.push('Consider submitting additional qualifications or experience.');
    recommendations.push('You may still apply and explain your relevant background.');
  } else {
    recommendations.push('Your profile does not currently match this position.');
    recommendations.push('Consider other positions that better match your qualifications.');
    recommendations.push('Focus on gaining relevant experience in the field.');
  }

  return recommendations;
}

function assessGeneralEligibility(age: number, income: number, category: string, occupation: string): any {
  if (age < 18) {
    return {
      eligible: false,
      score: 0,
      status: 'notEligible',
      title: 'Not eligible yet',
      description: 'Applicants must be at least 18 years old to qualify for most CivicBridge programs.',
      recommendations: ['Wait until you turn 18 or contact support for youth services.']
    };
  }

  const lowIncome = income <= 300000;
  const mediumIncome = income <= 600000;
  const specialCategory = category === 'OBC' || category === 'SC/ST';
  const frontline = occupation === 'Government employee' || occupation === 'Healthcare worker';

  if (specialCategory && age >= 50) {
    return {
      eligible: true,
      score: 85,
      status: 'eligible',
      title: 'Eligible for priority support',
      description: 'Your profile matches criteria for accelerated service and tailored government benefits.',
      recommendations: ['Submit application with priority review.', 'Contact support for expedited processing.']
    };
  }

  if (lowIncome || frontline) {
    return {
      eligible: true,
      score: 75,
      status: 'eligible',
      title: 'Likely eligible',
      description: 'Your income and occupation profile fit the eligibility window for public support services.',
      recommendations: ['Complete the application and upload documents.', 'Check for additional benefits based on your profile.']
    };
  }

  if (mediumIncome) {
    return {
      eligible: false,
      score: 45,
      status: 'conditional',
      title: 'Conditional eligibility',
      description: 'Your profile may qualify after further assessment or document verification.',
      recommendations: ['Submit for eligibility review.', 'Gather supporting documentation.', 'Consider additional qualification programs.']
    };
  }

  return {
    eligible: false,
    score: 25,
    status: 'notEligible',
    title: 'Not eligible at this time',
    description: 'Your current income and profile indicate that this program is not the best match right now.',
    recommendations: ['Review alternative programs for your profile.', 'Consider lower-income support services.', 'Check eligibility requirements again.']
  };
}
