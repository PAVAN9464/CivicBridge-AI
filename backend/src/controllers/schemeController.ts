import { Request, Response } from 'express';
import { ApiError } from '../middleware/errorHandler.js';
import { filterSchemes, FilterCriteria } from '../services/schemeFilterService.js';

interface EligibilityRequest {
  age: number;
  income: number;
  state: string;
  category: string;
  occupation: string;
}

interface EligibilityResult {
  eligible: boolean;
  score: number;
  schemes: Array<{
    name: string;
    match: number;
    status: 'eligible' | 'conditional' | 'ineligible';
  }>;
  recommendations: string[];
}

export const checkEligibility = (request: Request, response: Response) => {
  const { age, income, state, category, occupation } = request.body as EligibilityRequest;

  if (!age || !income || !state || !category || !occupation) {
    throw new ApiError(400, 'Missing required fields', 'VALIDATION_ERROR');
  }

  if (age < 0 || income < 0) {
    throw new ApiError(400, 'Age and income must be non-negative', 'VALIDATION_ERROR');
  }

  const isLowIncome = income <= 35000;
  const isSenior = age >= 65;
  const isSpecialCategory = category === 'Senior' || category === 'Disability' || category === 'Veteran';

  const schemes: Array<{ name: string; match: number; status: 'eligible' | 'conditional' | 'ineligible' }> = [
    {
      name: 'Housing Support',
      match: isLowIncome ? 95 : isSenior ? 85 : 60,
      status: (isLowIncome || isSenior) ? 'eligible' : ('conditional' as const)
    },
    {
      name: 'Small Business Relief',
      match: occupation === 'Small business owner' ? 90 : 40,
      status: occupation === 'Small business owner' ? ('eligible' as const) : ('ineligible' as const)
    },
    {
      name: 'Healthcare Access Program',
      match: isSpecialCategory ? 85 : 50,
      status: isSpecialCategory ? ('eligible' as const) : ('conditional' as const)
    }
  ];

  const eligibleSchemes = schemes.filter((s) => s.status !== 'ineligible');
  const avgScore = eligibleSchemes.length > 0 ? Math.round(eligibleSchemes.reduce((sum, s) => sum + s.match, 0) / eligibleSchemes.length) : 0;

  const recommendations = [];
  if (isLowIncome) recommendations.push('You qualify for income-based support programs.');
  if (isSenior) recommendations.push('Senior-specific benefits and services are available.');
  if (isSpecialCategory) recommendations.push('Special category programs offer enhanced support.');
  if (income > 0 && income < 25000) recommendations.push('Consider submitting documentation for expedited review.');

  const result: EligibilityResult = {
    eligible: avgScore >= 60,
    score: avgScore,
    schemes,
    recommendations: recommendations.length > 0 ? recommendations : ['Review available programs for your profile.']
  };

  response.status(200).json(result);
};

export const getSchemes = (request: Request, response: Response) => {
  const matched = filterSchemes({});
  
  response.status(200).json({
    schemes: matched.map(scheme => ({
      id: scheme.id,
      name: scheme.name,
      description: scheme.description,
      category: scheme.category,
      deadline: scheme.deadline,
      maxAmount: scheme.maxAmount,
      requirements: scheme.requirements
    })),
    total: matched.length
  });
};

export const filterSchemesForUser = (request: Request, response: Response) => {
  const { category, state, income, occupation, age } = request.body as FilterCriteria;

  // At least one filter criterion should be provided
  if (!category && !state && income === undefined && !occupation && age === undefined) {
    throw new ApiError(400, 'At least one filter criterion is required', 'VALIDATION_ERROR');
  }

  // Validate income if provided
  if (income !== undefined && income < 0) {
    throw new ApiError(400, 'Income must be non-negative', 'VALIDATION_ERROR');
  }

  // Validate age if provided
  if (age !== undefined && age < 0) {
    throw new ApiError(400, 'Age must be non-negative', 'VALIDATION_ERROR');
  }

  const matched = filterSchemes({ category, state, income, occupation, age });

  response.status(200).json({
    filters: { category, state, income, occupation, age },
    schemes: matched,
    total: matched.length,
    message: matched.length > 0 ? `Found ${matched.length} matching schemes` : 'No schemes match your criteria. Try adjusting your filters.'
  });
};
