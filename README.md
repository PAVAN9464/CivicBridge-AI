# CivicBridge AI

A comprehensive AI-powered platform for government service discovery and citizen assistance. Built for hackathons and government innovation challenges.

## 🚀 Features

- **AI-Powered Chat Assistant**: Intelligent conversation interface for government scheme discovery
- **Scheme Database**: Curated database of government programs with eligibility criteria
- **Smart Matching**: AI-driven scheme recommendations based on user queries
- **Responsive Design**: Mobile-first design with government service aesthetics
- **Real-time Communication**: Seamless API integration between frontend, backend, and AI services

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   AI Server     │
│   (React)       │◄──►│   (Express)     │◄──►│   (Express)     │
│   Port: 5173    │    │   Port: 5000    │    │   Port: 5000    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │
                              ▼
                       ┌─────────────────┐
                       │   Ollama AI     │
                       │   Port: 11434   │
                       └─────────────────┘
```

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP client for API calls
- **Vite** - Fast build tool and dev server

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type-safe development
- **Axios** - HTTP client for AI server communication
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware

### AI Server
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Axios** - HTTP client for Ollama API
- **Ollama** - Local AI model server (Phi-3 3.8B)

## 📋 Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Ollama** (for AI functionality)
- **Phi-3 model** (`ollama pull phi3:3.8b`)

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/civicbridge-ai.git
cd civicbridge-ai
```

### 2. Install Dependencies

#### Frontend
```bash
cd frontend
npm install
```

#### Backend
```bash
cd ../backend
npm install
```

#### AI Server
```bash
cd ../ai-server
npm install
```

### 3. Setup Ollama (AI Model)
```bash
# Install Ollama (if not already installed)
# Visit: https://ollama.ai/download

# Pull the Phi-3 model
ollama pull phi3:3.8b

# Start Ollama server
ollama serve
```

### 4. Environment Configuration

#### Backend (.env)
```env
NODE_ENV=development
PORT=5000
HOST=localhost
API_VERSION=v1
LOG_LEVEL=debug
AI_SERVER_URL=http://localhost:5000/ask-ai
CORS_ORIGIN=http://localhost:5173
```

#### AI Server (.env)
```env
PORT=5000
OLLAMA_URL=http://localhost:11434/api/generate
MODEL=phi3:3.8b
```

## 🎯 Usage

### Development Mode

1. **Start AI Server** (Terminal 1)
```bash
cd ai-server
npm start
```

2. **Start Backend** (Terminal 2)
```bash
cd backend
npm run dev
```

3. **Start Frontend** (Terminal 3)
```bash
cd frontend
npm run dev
```

### Production Build

```bash
# Frontend build
cd frontend
npm run build

# Backend build
cd ../backend
npm run build
npm start
```

## 📡 API Documentation

### Backend API (Port 5000)

#### GET /
Returns API information and available endpoints.

#### POST /api/v1/chat
Send a message to the AI assistant.

**Request:**
```json
{
  "message": "What housing schemes are available?"
}
```

**Response:**
```json
{
  "reply": "Based on your query about housing schemes..."
}
```

### AI Server API (Port 5000)

#### POST /ask-ai
Direct AI interaction endpoint.

**Request:**
```json
{
  "message": "Tell me about education benefits"
}
```

**Response:**
```json
{
  "reply": "Here are some relevant education schemes..."
}
```

## 🎨 Features Overview

### AI Chat Interface
- **Welcome Screen**: Interactive onboarding with suggested prompts
- **Real-time Chat**: Message history with user/AI distinction
- **Loading States**: Animated indicators during AI processing
- **Error Handling**: User-friendly error messages
- **Responsive Design**: Optimized for mobile and desktop

### Government Scheme Database
- **12+ Schemes**: Comprehensive database of government programs
- **Smart Matching**: Keyword-based scheme recommendations
- **Detailed Information**: Eligibility, benefits, and application links
- **Categories**: Education, Health, Housing, Agriculture, etc.

### Professional UI/UX
- **Government Theme**: Civic colors (navy, gold) and professional styling
- **Accessibility**: Focus states and semantic HTML
- **Performance**: Optimized loading and smooth transitions
- **Mobile-First**: Responsive design across all devices

## 🔧 Development

### Project Structure
```
civicbridge-ai/
├── frontend/          # React application
│   ├── src/
│   │   ├── components/
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── package.json
├── backend/           # Express API server
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── index.ts
│   └── package.json
├── ai-server/         # AI integration server
│   ├── data/
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   └── server.js
└── README.md
```

### Available Scripts

#### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

#### Backend
```bash
npm run dev      # Start development server with hot reload
npm run build    # Compile TypeScript
npm start        # Start production server
```

#### AI Server
```bash
npm start        # Start the AI server
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Use TypeScript for type safety
- Follow ESLint configuration
- Write meaningful commit messages
- Test API endpoints thoroughly
- Maintain responsive design principles

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Ollama** for providing local AI model capabilities
- **Microsoft Phi-3** for the AI model
- **React & Express** communities for excellent frameworks
- **Tailwind CSS** for utility-first styling

## 📞 Support

For questions or support:
- Open an issue on GitHub
- Check the documentation
- Review the API logs for debugging

---

**Built with ❤️ for government innovation and citizen empowerment**</content>
<parameter name="filePath">/home/pavan/github-clones/CivicBridge-AI/README.md