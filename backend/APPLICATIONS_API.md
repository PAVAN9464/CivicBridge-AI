# Applications API Documentation

## Overview
The Applications API provides endpoints for managing citizen applications, including document uploads, appointment scheduling, and case note management.

## Base URL
`/api/v1/applications`

## Endpoints

### 1. Get All Applications
**GET** `/`

Retrieve all applications with user and scheme details.

**Response:**
```json
{
  "message": "Applications retrieved successfully",
  "data": [
    {
      "_id": "ObjectId",
      "user": { /* User object */ },
      "scheme": { /* Scheme object */ },
      "status": "Draft|Submitted|Under Review|Approved|Rejected",
      "submittedAt": "ISO Date",
      "documents": [
        {
          "name": "Income Certificate",
          "url": "https://...",
          "verified": false
        }
      ],
      "notes": "Case notes",
      "appointment": {
        "date": "ISO Date",
        "time": "HH:mm",
        "notes": "Appointment notes"
      },
      "createdAt": "ISO Date",
      "updatedAt": "ISO Date"
    }
  ]
}
```

### 2. Get Application by ID
**GET** `/:id`

Retrieve a specific application.

**Parameters:**
- `id` (path): Application ObjectId

**Response:**
```json
{
  "message": "Application retrieved successfully",
  "data": { /* Application object */ }
}
```

### 3. Create Application
**POST** `/`

Create a new application for a user and scheme.

**Request Body:**
```json
{
  "userId": "ObjectId",
  "schemeId": "ObjectId"
}
```

**Response:**
```json
{
  "message": "Application created successfully",
  "data": { /* Application object */ }
}
```

### 4. Upload Income Proof
**POST** `/:id/upload-income-proof`

Upload an income verification document to an application.

**Parameters:**
- `id` (path): Application ObjectId

**Request Body:**
```json
{
  "documentName": "Income Certificate 2026",
  "documentUrl": "https://example.com/documents/income-cert.pdf"
}
```

**Response:**
```json
{
  "message": "Income proof uploaded successfully",
  "data": { /* Updated Application object */ }
}
```

### 5. Schedule Appointment
**POST** `/:id/schedule-appointment`

Schedule an appointment for the application review.

**Parameters:**
- `id` (path): Application ObjectId

**Request Body:**
```json
{
  "appointmentDate": "2026-05-15",
  "appointmentTime": "14:30",
  "notes": "Optional appointment notes"
}
```

**Response:**
```json
{
  "message": "Appointment scheduled successfully",
  "data": { /* Updated Application object */ }
}
```

### 6. Review Case Notes
**POST** `/:id/review-case-notes`

Add or update case notes and optionally change application status.

**Parameters:**
- `id` (path): Application ObjectId

**Request Body:**
```json
{
  "caseNotes": "Reviewed documents, all verified.",
  "status": "Under Review"
}
```

**Response:**
```json
{
  "message": "Case notes updated successfully",
  "data": { /* Updated Application object */ }
}
```

### 7. Update Application Status
**PATCH** `/:id/status`

Update the status of an application.

**Parameters:**
- `id` (path): Application ObjectId

**Request Body:**
```json
{
  "status": "Approved"
}
```

**Valid statuses:**
- `Draft`: Initial status
- `Submitted`: Application submitted
- `Under Review`: Being reviewed
- `Approved`: Application approved
- `Rejected`: Application rejected

**Response:**
```json
{
  "message": "Application status updated successfully",
  "data": { /* Updated Application object */ }
}
```

### 8. Delete Application
**DELETE** `/:id`

Delete an application.

**Parameters:**
- `id` (path): Application ObjectId

**Response:**
```json
{
  "message": "Application deleted successfully"
}
```

## Error Responses

### 400 Bad Request
```json
{
  "message": "Error description"
}
```

### 404 Not Found
```json
{
  "message": "Application not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Error description"
}
```

## Example Usage

### Upload Income Proof
```bash
curl -X POST http://localhost:3000/api/v1/applications/507f1f77bcf86cd799439011/upload-income-proof \
  -H "Content-Type: application/json" \
  -d '{
    "documentName": "Income Certificate",
    "documentUrl": "https://example.com/docs/income.pdf"
  }'
```

### Schedule Appointment
```bash
curl -X POST http://localhost:3000/api/v1/applications/507f1f77bcf86cd799439011/schedule-appointment \
  -H "Content-Type: application/json" \
  -d '{
    "appointmentDate": "2026-05-20",
    "appointmentTime": "10:00",
    "notes": "Please bring original documents"
  }'
```

### Review Case Notes
```bash
curl -X POST http://localhost:3000/api/v1/applications/507f1f77bcf86cd799439011/review-case-notes \
  -H "Content-Type: application/json" \
  -d '{
    "caseNotes": "All documents verified successfully.",
    "status": "Approved"
  }'
```
