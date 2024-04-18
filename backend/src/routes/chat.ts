import express from 'express';
import { verifyToken } from '../utils/verifyToken';
import { generateResponseUsingRAG } from '../utils/retrieverUtils';

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
        if (!userMessage) {
            return res.status(400).json({ error: 'Bad Request: No message provided.' });
        }
        
        const response = await generateResponseUsingRAG(userId, userMessage);
        res.json({ text: response });
    } catch (error) {
        console.error('Server Error: Error processing the message:', error);
        res.status(500).json({ error: 'Server Error: Unable to process your message.' });
    }
});

export default router;
