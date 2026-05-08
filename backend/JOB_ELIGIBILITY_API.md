# Job Eligibility Checker API Documentation

## Overview
The Job Eligibility API allows users to check if they are eligible for specific job postings by analyzing their resume/CV. The system uses keyword matching and qualification analysis to determine eligibility.

## Base URL
`/api/v1/jobs`

## Endpoints

### 1. Get All Job Postings
**GET** `/postings`

Retrieve all active job postings.

**Response:**
```json
{
  "message": "Job postings retrieved successfully",
  "data": [
    {
      "_id": "ObjectId",
      "title": "Senior Software Engineer",
      "department": "Technology",
      "description": "Full job description...",
      "qualifications": ["Bachelor in CS", "5+ years experience", "Java", "REST APIs"],
      "minAge": 25,
      "maxAge": 65,
      "salary": {
        "min": 1200000,
        "max": 1800000
      },
      "deadline": "2026-06-30",
      "active": true,
      "createdAt": "ISO Date",
      "updatedAt": "ISO Date"
    }
  ],
  "total": 5
}
```

### 2. Get Job Posting by ID
**GET** `/postings/:id`

Retrieve a specific job posting.

**Parameters:**
- `id` (path): Job Posting ObjectId

**Response:**
```json
{
  "message": "Job posting retrieved successfully",
  "data": { /* Job Posting object */ }
}
```

### 3. Create Job Posting
**POST** `/postings`

Create a new job posting.

**Request Body:**
```json
{
  "title": "Senior Software Engineer",
  "department": "Technology",
  "description": "We are looking for...",
  "qualifications": ["Bachelor in CS", "5+ years", "Java"],
  "minAge": 25,
  "maxAge": 65,
  "salary": {
    "min": 1200000,
    "max": 1800000
  },
  "deadline": "2026-06-30"
}
```

**Response:**
```json
{
  "message": "Job posting created successfully",
  "data": { /* Created Job Posting object */ }
}
```

### 4. Check Job Eligibility (Resume Analysis)
**POST** `/check-eligibility`

Analyze a resume/CV to check eligibility for a specific job posting.

**Request Body:**
```json
{
  "jobId": "ObjectId",
  "resumeText": "Complete resume text extracted from PDF/TXT file"
}
```

**Response:**
```json
{
  "message": "Eligibility analysis completed",
  "data": {
    "jobId": "ObjectId",
    "jobTitle": "Senior Software Engineer",
    "department": "Technology",
    "status": "eligible|conditional|ineligible",
    "matchScore": 85,
    "skillMatches": [
      {
        "skill": "Java",
        "found": true
      },
      {
        "skill": "Python",
        "found": false
      }
    ],
    "matchedQualifications": [
      "Bachelor in CS",
      "5+ years experience",
      "REST APIs"
    ],
    "missingQualifications": [
      "Kubernetes"
    ],
    "recommendations": [
      "Your profile is a strong match for this position.",
      "Consider applying immediately as you meet the key requirements."
    ],
    "analysisDetails": {
      "totalQualifications": 5,
      "matchedQualifications": 4,
      "skillsFound": 6,
      "totalSkills": 10
    }
  }
}
```

## Response Fields

### Status Values
- `eligible`: Candidate meets 70% or more match score
- `conditional`: Candidate meets 40-70% match score
- `ineligible`: Candidate meets less than 40% match score

### Match Score
- Score from 0-100 indicating how well the resume matches the job requirements
- Based on qualifications match and relevant skills found

### Skill Matches
Array of skills extracted from job description with indicators of whether they were found in the resume

### Qualifications
- **matchedQualifications**: Qualifications from the job that are found in the resume
- **missingQualifications**: Required qualifications not found in the resume

### Recommendations
- AI-generated recommendations based on eligibility status
- Actionable next steps for the candidate

## Error Responses

### 400 Bad Request
```json
{
  "message": "Job ID and resume text are required"
}
```

### 404 Not Found
```json
{
  "message": "Job posting not found"
}
```

## Example Usage

### Upload PDF and Check Eligibility
```bash
# First, extract text from PDF using a tool like pdf-parse
# Then send to the API:

curl -X POST http://localhost:3000/api/v1/jobs/check-eligibility \
  -H "Content-Type: application/json" \
  -d '{
    "jobId": "507f1f77bcf86cd799439011",
    "resumeText": "John Doe\nSenior Software Engineer\n\nExperience:\n- 5+ years in software development\n- Expert in Java, Python, REST APIs\n- Strong experience with Docker and microservices\n\nEducation:\n- Bachelor in Computer Science\n\nSkills:\nJava, Python, JavaScript, Docker, AWS, MongoDB, PostgreSQL"
  }'
```

### Response Example for Eligible Candidate
```json
{
  "message": "Eligibility analysis completed",
  "data": {
    "jobId": "507f1f77bcf86cd799439011",
    "jobTitle": "Senior Software Engineer",
    "department": "Technology",
    "status": "eligible",
    "matchScore": 90,
    "skillMatches": [
      { "skill": "Java", "found": true },
      { "skill": "Python", "found": true },
      { "skill": "Docker", "found": true },
      { "skill": "AWS", "found": true },
      { "skill": "API", "found": true }
    ],
    "matchedQualifications": [
      "Bachelor in Computer Science",
      "5+ years experience",
      "REST APIs"
    ],
    "missingQualifications": [],
    "recommendations": [
      "Your profile is a strong match for this position.",
      "Consider applying immediately as you meet the key requirements."
    ],
    "analysisDetails": {
      "totalQualifications": 5,
      "matchedQualifications": 5,
      "skillsFound": 5,
      "totalSkills": 10
    }
  }
}
```

## Frontend Integration

### PDF to Text Extraction
Use a library like `pdfjs-dist` to extract text from PDFs:

```typescript
import * as pdfjsLib from 'pdfjs-dist';

async function extractTextFromPDF(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
  let text = '';
  
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    text += textContent.items.map((item: any) => item.str).join(' ');
  }
  
  return text;
}
```

### Check Eligibility
```typescript
async function checkJobEligibility(jobId: string, resumeText: string) {
  const response = await fetch('/api/v1/jobs/check-eligibility', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jobId, resumeText })
  });
  
  return response.json();
}
```

## Features

✅ **Resume Analysis** - Extract and analyze resume content
✅ **Skill Matching** - Match resume skills against job requirements
✅ **Qualification Validation** - Check for required qualifications
✅ **Smart Scoring** - AI-powered eligibility scoring (0-100%)
✅ **Recommendations** - Personalized recommendations for candidates
✅ **Department-Specific Analysis** - Smart keyword extraction based on department
✅ **Detailed Feedback** - Comprehensive analysis with matched and missing qualifications
