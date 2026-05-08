# CivicBridge AI Backend

A Node.js Express server providing government scheme management and eligibility checking APIs.

## Project Structure

```
backend/
├── src/
│   ├── index.ts                 # Main server entry point
│   ├── middleware/              # Express middleware
│   │   ├── cors.ts             # CORS configuration
│   │   ├── logger.ts           # Request logging
│   │   ├── errorHandler.ts     # Error handling
│   │   └── index.ts            # Middleware exports
│   ├── routes/                  # API route handlers
│   │   ├── health.ts           # Health check endpoint
│   │   ├── schemes.ts          # Scheme management routes
│   │   ├── reminders.ts        # Reminder management routes
│   │   └── index.ts            # Route exports
│   ├── controllers/             # Business logic
│   │   ├── healthController.ts
│   │   ├── schemeController.ts
│   │   ├── reminderController.ts
│   │   └── index.ts            # Controller exports
│   └── utils/                   # Utility functions
│       └── asyncHandler.ts     # Async error wrapper
├── package.json
├── tsconfig.json
├── .env.example
└── .gitignore
```

## Setup

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
cd backend
npm install
```

### Configuration

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Update environment variables as needed:
```env
NODE_ENV=development
PORT=3000
HOST=localhost
CORS_ORIGIN=http://localhost:5173
```

## Running the Server

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Type Checking
```bash
npm run type-check
```

### Linting
```bash
npm run lint
```

## API Endpoints

### Health Check
- **GET** `/api/v1/health` - Server health status

### Schemes
- **GET** `/api/v1/schemes` - List all available government schemes
- **POST** `/api/v1/schemes/filter` - Filter schemes based on user criteria
  - Request body (at least one parameter required):
    ```json
    {
      "age": 35,
      "income": 50000,
      "state": "California",
      "category": "General",
      "occupation": "Small business owner"
    }
    ```
  - Response: Returns array of matching schemes sorted by match score
    ```json
    {
      "filters": { ...applied filters },
      "schemes": [
        {
          "id": "scheme-001",
          "name": "City Housing Grant",
          "description": "...",
          "category": "Housing",
          "deadline": "2026-06-15",
          "maxAmount": 15000,
          "requirements": ["Income verification", "Proof of residency"],
          "matchScore": 85,
          "matchReasons": ["Available in California", "Income range qualifies"]
        }
      ],
      "total": 8,
      "message": "Found 8 matching schemes"
    }
    ```
- **POST** `/api/v1/schemes/check-eligibility` - Check user eligibility for schemes
  - Request body:
    ```json
    {
      "age": 35,
      "income": 50000,
      "state": "California",
      "category": "General",
      "occupation": "Small business owner"
    }
    ```

### Reminders
- **GET** `/api/v1/reminders` - Get all saved reminders
- **POST** `/api/v1/reminders` - Create a new reminder
  - Request body:
    ```json
    {
      "scheme": "Housing Grant",
      "deadline": "2026-05-30",
      "notes": "Submit income documents"
    }
    ```
- **PUT** `/api/v1/reminders/:id` - Update a reminder
- **DELETE** `/api/v1/reminders/:id` - Delete a reminder

## Middleware Stack

- **helmet** - Security headers
- **cors** - Cross-origin requests
- **morgan** - Request logging
- **express.json()** - JSON request parsing
- **Error handling** - Global error middleware
- **404 handler** - Not found responses

## Error Handling

All errors follow a consistent JSON format:

```json
{
  "error": {
    "status": 400,
    "code": "VALIDATION_ERROR",
    "message": "Missing required fields"
  }
}
```

## Future Enhancements

- [ ] Database integration (PostgreSQL)
- [ ] Authentication/JWT
- [ ] User profiles
- [ ] Case management
- [ ] AI chatbot integration
- [ ] Document upload handling
- [ ] Notification system
