import axios from 'axios';

const OLLAMA_URL = process.env.OLLAMA_URL;
const MODEL = process.env.MODEL;

/**
 * Calls the Ollama API to generate a response
 * @param {string} prompt - The formatted prompt to send
 * @returns {Promise<string>} The AI response
 */
export const generateResponse = async (prompt) => {
  try {
    const response = await axios.post(OLLAMA_URL, {
      model: MODEL,
      prompt: prompt,
      stream: false,
    });
    return response.data.response;
  } catch (error) {
    throw new Error(`Ollama API error: ${error.message}`);
  }
};