import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

interface Message {
  type: 'user' | 'ai';
  text: string;
}

const AIChat: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    "What housing schemes are available?",
    "Tell me about education benefits for children",
    "How can I get health insurance?",
    "What schemes help farmers?"
  ];

  const handleSend = async (text?: string) => {
    const msgToSend = text || message;
    if (!msgToSend.trim() || loading) return;

    const userMessage: Message = { type: 'user', text: msgToSend };
    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setLoading(true);

    const requestPayload = { message: userMessage.text };
    const apiUrl = 'http://localhost:5000/api/v1/chat';

    try {
      console.log('📤 API Request:', {
        url: apiUrl,
        method: 'POST',
        payload: requestPayload,
        timestamp: new Date().toISOString()
      });

      const res = await axios.post(apiUrl, requestPayload);

      console.log('📥 API Response:', {
        status: res.status,
        payload: res.data,
        timestamp: new Date().toISOString()
      });

      const aiMessage: Message = { type: 'ai', text: res.data.reply };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error: any) {
      console.error('❌ API Error:', {
        url: apiUrl,
        method: 'POST',
        error: error.message,
        statusCode: error.response?.status,
        errorData: error.response?.data,
        timestamp: new Date().toISOString()
      });
      const errorMessage: Message = { type: 'ai', text: 'Sorry, I\'m having trouble connecting right now. Please try again later.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestedPrompt = (prompt: string) => {
    handleSend(prompt);
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-slate-50 rounded-xl shadow-xl border border-slate-200 transition-all duration-300 hover:shadow-2xl">
      <h2 className="text-2xl font-bold mb-6 text-center text-slate-800 leading-tight">
        CivicBridge AI Assistant
      </h2>

      {messages.length === 0 ? (
        // Welcome State
        <div className="text-center py-12 transition-all duration-500">
          <div className="mb-8">
            <div className="w-16 h-16 bg-civic-gold rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-slate-800" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-700 mb-2">Welcome to CivicBridge AI</h3>
            <p className="text-slate-600 max-w-md mx-auto leading-relaxed">
              I'm here to help you discover government schemes and services. Ask me about housing, education, health, or any other government programs.
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium text-slate-700 mb-4">Try asking:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto">
              {suggestedPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestedPrompt(prompt)}
                  className="p-3 bg-white border border-slate-200 rounded-lg text-left hover:bg-civic-gold hover:border-civic-gold transition-all duration-200 text-slate-700 hover:text-slate-900 shadow-sm hover:shadow-md"
                  disabled={loading}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        // Chat Interface
        <>
          <div
            ref={chatRef}
            className="h-80 sm:h-96 overflow-y-auto mb-6 p-4 border border-slate-300 rounded-lg bg-white transition-all duration-300"
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-4 p-4 rounded-xl max-w-lg transition-all duration-300 ${
                  msg.type === 'user'
                    ? 'bg-civic-gold text-slate-900 ml-auto shadow-md'
                    : 'bg-slate-100 text-slate-800 mr-auto shadow-sm'
                }`}
              >
                <p className="leading-relaxed">{msg.text}</p>
              </div>
            ))}
            {loading && (
              <div className="mb-4 p-4 rounded-xl max-w-lg bg-slate-100 text-slate-800 mr-auto shadow-sm transition-all duration-300">
                <div className="flex items-center space-x-1">
                  <span className="text-slate-600">Thinking</span>
                  <span className="animate-bounce">.</span>
                  <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>.</span>
                  <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>.</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask about government schemes..."
              className="flex-1 p-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-civic-gold focus:border-transparent transition-all duration-200 text-slate-700 placeholder-slate-400"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSend();
                }
              }}
              disabled={loading}
            />
            <button
              onClick={() => handleSend()}
              disabled={loading || !message.trim()}
              className="px-8 py-4 bg-civic-navy text-white rounded-lg hover:bg-slate-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-md hover:shadow-lg"
            >
              {loading ? 'Sending...' : 'Send'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AIChat;