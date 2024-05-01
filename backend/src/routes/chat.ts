import express from 'express';
import { verifyToken } from '../utils/verifyToken';
import { generateResponseUsingRAGandHistory}  from '../utils/retrieverChatHistory';

const router = express.Router();

// メッセージを受け取るエンドポイント
router.post('/', async (req, res) => {
    try {
        const decodedToken = verifyToken(req);
        if (!decodedToken) {
            return res.status(401).json({ message: 'Unauthorized: No valid token provided.' });
        }
        const userId = decodedToken.userId;
        const userMessage = req.body.text;
        const chat_history = req.body.chatHistory;
        if (!userMessage) {
            return res.status(400).json({ error: 'Bad Request: No message provided.' });
        }
        
        const response = await generateResponseUsingRAGandHistory(chat_history,userId, userMessage);
        res.json({ answer: response.answer });
    } catch (error) {
        console.error('Server Error: Error processing the message:', error);
        res.status(500).json({ error: 'Server Error: Unable to process your message.' });
    }
});

export default router;
