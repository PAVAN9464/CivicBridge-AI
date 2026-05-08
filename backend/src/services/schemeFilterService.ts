import schemesData from '../data/schemes.json' with { type: 'json' };

export interface FilterCriteria {
  category?: string;
  state?: string;
  income?: number;
  occupation?: string;
  age?: number;
}

export interface SchemeMatch {
  id: string;
  name: string;
  description: string;
  category: string;
  deadline: string;
  maxAmount: number;
  requirements: string[];
  matchScore: number;
  matchReasons: string[];
}

export const filterSchemes = (criteria: FilterCriteria): SchemeMatch[] => {
  const { category, state, income = 0, occupation, age } = criteria;

  const filtered = schemesData.schemes
    .map((scheme) => ({
      scheme,
      score: calculateMatchScore(scheme, { category, state, income, occupation, age }),
      reasons: getMatchReasons(scheme, { category, state, income, occupation, age })
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ scheme, score, reasons }) => ({
      id: scheme.id,
      name: scheme.name,
      description: scheme.description,
      category: scheme.category,
      deadline: scheme.deadline,
      maxAmount: scheme.maxAmount,
      requirements: scheme.requirements,
      matchScore: score,
      matchReasons: reasons
    }));

  return filtered;
};

const calculateMatchScore = (
  scheme: typeof schemesData.schemes[0],
  criteria: FilterCriteria
): number => {
  let score = 0;
  const { category, state, income = 0, occupation, age } = criteria;

  // State check
  if (state && !scheme.applicableStates.includes(state)) {
    return 0;
  }

  // Income range check
  if (income < scheme.minIncome || income > scheme.maxIncome) {
    return 0;
  }

  // Category check
  if (category && scheme.applicableCategories.includes(category)) {
    score += 25;
  } else if (category && !scheme.applicableCategories.includes(category)) {
    return 0;
  } else if (!category) {
    score += 15; // Default score if no category specified
  }

  // Occupation check
  if (occupation) {
    if (scheme.applicableOccupations.includes(occupation)) {
      score += 25;
      const bonus = (scheme.matchCriteria as any).occupationBonus || 0;
      score += bonus;
    } else if (!scheme.applicableOccupations.includes('*')) {
      return 0;
    }
  }

  // Income-based bonuses
  if (income <= 35000) {
    const lowIncomeBonus = (scheme.matchCriteria as any).lowIncomeBonus || 0;
    score += lowIncomeBonus;
  }

  // Age-based bonuses for seniors
  if (age && age >= 65) {
    const seniorBonus = (scheme.matchCriteria as any).seniorBonus || 0;
    score += seniorBonus;
  }

  // Category-specific bonuses
  if (category === 'Disability') {
    const disabilityBonus = (scheme.matchCriteria as any).disabilityBonus || 0;
    score += disabilityBonus;
  }

  if (category === 'Veteran') {
    const veteranBonus = (scheme.matchCriteria as any).veteranBonus || 0;
    score += veteranBonus;
  }

  return Math.min(score, 100); // Cap at 100
};

const getMatchReasons = (
  scheme: typeof schemesData.schemes[0],
  criteria: FilterCriteria
): string[] => {
  const reasons: string[] = [];
  const { category, state, income = 0, occupation, age } = criteria;

  if (state && scheme.applicableStates.includes(state)) {
    reasons.push(`Available in ${state}`);
  }

  if (income >= scheme.minIncome && income <= scheme.maxIncome) {
    reasons.push(`Income range qualifies`);
  }

  if (category && scheme.applicableCategories.includes(category)) {
    reasons.push(`Matches ${category} category`);
  }

  if (occupation && scheme.applicableOccupations.includes(occupation)) {
    reasons.push(`Tailored for ${occupation}`);
  }

  if (occupation && scheme.applicableOccupations.includes('*')) {
    reasons.push(`Open to all occupations`);
  }

  if (income <= 35000) {
    reasons.push(`Low-income priority`);
  }

  if (age && age >= 65 && scheme.applicableCategories.includes('Senior')) {
    reasons.push(`Senior-specific support`);
  }

  return reasons.length > 0 ? reasons : ['Matches scheme criteria'];
};
