import { generateResponse } from '../services/ollamaService.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SYSTEM_PROMPT = `You are CivicBridge AI, an AI assistant that helps users discover government schemes. Your role is to:
- Help users discover government schemes
- Explain eligibility simply
- Suggest relevant schemes
- Give concise answers
- Be beginner friendly

Always respond as CivicBridge AI in a helpful, clear, and concise manner.`;

/**
 * Searches for relevant schemes based on user query
 * @param {string} query - User message
 * @param {Array} schemes - Array of scheme objects
 * @returns {Array} Filtered relevant schemes
 */
const searchSchemes = (query, schemes) => {
  const lowerQuery = query.toLowerCase();
  const keywords = lowerQuery.split(' ').filter(word => word.length > 2);

  return schemes.filter(scheme => {
    const searchableText = `${scheme.schemeName} ${scheme.category} ${scheme.benefits} ${scheme.eligibility}`.toLowerCase();
    return keywords.some(keyword => searchableText.includes(keyword));
  }).slice(0, 5); // Limit to top 5 matches
};

/**
 * Handles the /ask-ai POST request
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const askAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Load schemes data
    const schemesPath = path.join(__dirname, '../data/schemes.json');
    const schemesData = await fs.readFile(schemesPath, 'utf8');
    const schemes = JSON.parse(schemesData);

    // Search for relevant schemes
    const relevantSchemes = searchSchemes(message, schemes);

    // Format schemes for prompt
    let schemesText = '';
    if (relevantSchemes.length > 0) {
      schemesText = '\n\nRelevant Government Schemes:\n' +
        relevantSchemes.map(scheme =>
          `- ${scheme.schemeName} (${scheme.category}): ${scheme.benefits}. Eligibility: ${scheme.eligibility}. Apply at: ${scheme.applicationLink}`
        ).join('\n');
    }

    // Format the prompt
    const formattedPrompt = `${SYSTEM_PROMPT}${schemesText}\n\nUser: ${message}\n\nCivicBridge AI:`;

    // Generate response
    const aiResponse = await generateResponse(formattedPrompt);

    res.json({ reply: aiResponse });
  } catch (error) {
    console.error('Error in askAI:', error.message);
    res.status(500).json({ error: 'Failed to get response from AI' });
  }
};