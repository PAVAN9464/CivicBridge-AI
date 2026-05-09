export interface OllamaGenerateResponse {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
  context?: number[];
  total_duration?: number;
  load_duration?: number;
  prompt_eval_count?: number;
  prompt_eval_duration?: number;
  eval_count?: number;
  eval_duration?: number;
}

const OLLAMA_API_URL = process.env.OLLAMA_API_URL || 'http://localhost:11434/api/generate';
const MODEL_NAME = 'phi3:3.8b';

/**
 * Connects to a local Ollama API to generate a simplified explanation
 * for government scheme documents.
 *
 * @param documentText The complex government document text
 * @returns A simplified explanation string
 */
export const generateSimplification = async (documentText: string): Promise<string> => {
  try {
    const prompt = `You are an expert assistant that simplifies complex government scheme documents for everyday citizens. 
Please read the following document and provide a clear, easy-to-understand explanation that highlights the key benefits, eligibility criteria, and application steps. Keep it concise and avoid bureaucratic jargon.

Document:
${documentText}

Simplified Explanation:`;

    const response = await fetch(OLLAMA_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL_NAME,
        prompt: prompt,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama API error! status: ${response.status}`);
    }

    const data = (await response.json()) as OllamaGenerateResponse;
    return data.response.trim();
  } catch (error) {
    console.error('Error generating simplification with Ollama:', error);
    throw new Error('Failed to generate simplified explanation from Ollama');
  }
};
