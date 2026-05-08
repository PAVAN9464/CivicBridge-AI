// Example API requests for the Scheme Filtering Endpoint

// 1. Filter schemes for a low-income resident in California
POST /api/v1/schemes/filter
{
  "income": 30000,
  "state": "California"
}

// Response:
// {
//   "filters": {
//     "income": 30000,
//     "state": "California"
//   },
//   "schemes": [
//     {
//       "id": "scheme-001",
//       "name": "City Housing Grant",
//       "description": "Financial assistance for housing support and rent for low-income residents.",
//       "category": "Housing",
//       "deadline": "2026-06-15",
//       "maxAmount": 15000,
//       "requirements": ["Income verification", "Proof of residency", "Lease or rental agreement", "Tax documents (last 2 years)"],
//       "matchScore": 60,
//       "matchReasons": ["Available in California", "Income range qualifies", "Low-income priority"]
//     },
//     ...more schemes
//   ],
//   "total": 8,
//   "message": "Found 8 matching schemes"
// }

// 2. Filter schemes for a senior person aged 68
POST /api/v1/schemes/filter
{
  "age": 68,
  "category": "Senior",
  "income": 45000,
  "state": "Texas"
}

// 3. Filter schemes for a small business owner
POST /api/v1/schemes/filter
{
  "occupation": "Small business owner",
  "income": 85000,
  "state": "New York",
  "category": "General"
}

// 4. Filter schemes for a healthcare worker
POST /api/v1/schemes/filter
{
  "occupation": "Healthcare worker",
  "income": 60000,
  "state": "Florida"
}

// 5. Filter schemes for a veteran
POST /api/v1/schemes/filter
{
  "category": "Veteran",
  "income": 50000,
  "state": "Illinois",
  "age": 45
}

// 6. Filter schemes for an unemployed person
POST /api/v1/schemes/filter
{
  "occupation": "Unemployed",
  "income": 10000,
  "state": "California"
}

// 7. Filter schemes for a person with disability
POST /api/v1/schemes/filter
{
  "category": "Disability",
  "income": 32000,
  "state": "Texas",
  "occupation": "Student"
}

// Request/Response Details:

// Filter Criteria Parameters:
// - age (optional): number - User's age
// - income (optional): number - User's annual income
// - state (optional): string - User's state of residence
// - category (optional): string - User's category (General, Senior, Disability, Veteran)
// - occupation (optional): string - User's occupation
// At least one parameter is required

// Response Structure:
// {
//   "filters": { ...applied filters },
//   "schemes": [ array of matching schemes sorted by matchScore (highest first) ],
//   "total": number - count of matching schemes,
//   "message": string - summary message
// }

// Scheme Object Fields:
// - id: unique scheme identifier
// - name: scheme name
// - description: detailed description
// - category: scheme category
// - deadline: application deadline
// - maxAmount: maximum financial assistance amount
// - requirements: array of required documents/verifications
// - matchScore: relevance score 0-100
// - matchReasons: array of reasons why this scheme matches

// Matching Algorithm:
// The filtering engine uses a scoring system that considers:
// - Geographic availability (state matching)
// - Income range eligibility
// - Category-specific eligibility
// - Occupation-specific requirements
// - Demographic bonuses (age, disability status)
// Only schemes scoring > 0 are returned, sorted by score descending

// Example Matching Scenarios:

// Scenario 1: Low-income housing assistance
// Filter: { income: 25000, state: "California" }
// Result: Housing Grant (95), Healthcare Program (70), Family Services (85)
// Reason: All have low-income bonus applied

// Scenario 2: Business owner support
// Filter: { occupation: "Small business owner", income: 90000 }
// Result: Small Business Relief (90), Rural Development (85)
// Reason: Occupation-specific matching plus income in range

// Scenario 3: Senior care program
// Filter: { age: 72, category: "Senior", income: 55000 }
// Result: Senior Care Subsidy (100), Housing Grant (80), Healthcare (75)
// Reason: Senior category and age-based bonuses applied
