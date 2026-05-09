import axios from 'axios';

const AI_SERVER_URL = process.env.AI_SERVER_URL || 'http://localhost:5000/ask-ai';

/**
 * Handles chat requests by proxying to the AI server
 * @param req - Express request object
 * @param res - Express response object
 */
export const chat = async (req: any, res: any) => {
  try {
    const { message } = req.body;

    if (!message) {
      console.warn('⚠️  Chat Request Error: Message is required');
      return res.status(400).json({ error: 'Message is required' });
    }

    const requestPayload = { message };

    console.log('📤 Forwarding to AI Server:', {
      url: AI_SERVER_URL,
      payload: requestPayload,
      timestamp: new Date().toISOString()
    });

    const aiResponse = await axios.post(AI_SERVER_URL, requestPayload);

    console.log('📥 AI Server Response:', {
      status: aiResponse.status,
      payload: aiResponse.data,
      timestamp: new Date().toISOString()
    });

    res.json(aiResponse.data);
  } catch (error: any) {
    console.error('❌ AI Server Error:', {
      url: AI_SERVER_URL,
      error: error.message,
      statusCode: error.response?.status,
      errorData: error.response?.data,
      timestamp: new Date().toISOString()
    });
    res.status(500).json({ error: 'Failed to get response from AI server' });
  }
};
