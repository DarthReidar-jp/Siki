import express from 'express';
import { verifyAccessToken } from '../utils/verifyAccessToken';
import { generateResponseUsingRAGandHistory } from '../llm/generateChatHistoryRAG';
import Chat, { IChat } from '../models/chat';

interface Message {
    text: string;
    sender: 'user' | 'ai';
    timestamp: string;
}
const router = express.Router();

// メッセージを受け取り、AIメッセージの返信エンドポイント
router.post('/', async (req, res) => {
    try {
        const decodedToken = verifyAccessToken(req);
        if (!decodedToken) {
            return res.status(401).json({ message: 'Unauthorized: No valid token provided.' });
        }
        const userId = decodedToken.userId;
        const projectId = req.body.projectId;
        const userMessage = req.body.text;
        const chat_history = req.body.chatHistory;
        if (!userMessage) {
            return res.status(400).json({ error: 'Bad Request: No message provided.' });
        }
        const response = await generateResponseUsingRAGandHistory(chat_history, userId, userMessage,projectId);
        res.json({ answer: response.answer });
    } catch (error) {
        console.error('Server Error: Error processing the message:', error);
        res.status(500).json({ error: 'Server Error: Unable to process your message.' });
    }
});
// チャットIDの取得
router.get('/', async (req, res) => {
    const decodedToken = verifyAccessToken(req);
    if (!decodedToken) {
        return res.status(401).json({ message: 'Unauthorized: No valid token provided.' });
    }
    const userId = decodedToken.userId;
    const projectId = req.query.projectId; // QueryからprojectIdを取得

    try {
        // 検索条件の設定：projectIdがあればそれを使用し、なければuserIdを使用
        const searchCriteria = projectId ? { userId:userId,projectId: projectId } : { userId: userId };
        
        // 更新順に受け取るためのチャットデータの取得
        const chats = await Chat.find(searchCriteria).sort({ updatedAt: -1 });
        
        // チャットのidとタイトルを更新順にフロントエンドへ渡す
        const formattedChats = chats.map(chat => ({
            id: chat._id,
            title: chat.title 
        }));
        res.status(200).json(formattedChats);
    } catch (error) {
        console.error('Error fetching chats:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// メッセージの保存用エンドポイント
router.post('/save', async (req, res) => {
    try {
        const decodedToken = verifyAccessToken(req);
        if (!decodedToken) {
            return res.status(401).json({ message: 'Unauthorized: No valid token provided.' });
        }

        const userId = decodedToken.userId;
        const { messages, chatId, projectId } = req.body; 

        let chat: IChat | null = null; 
        if (chatId) {
            // 既存のチャットセッションを検索
            chat = await Chat.findOne({ _id: chatId, userId: userId });
            if (!chat) {
                return res.status(404).json({ message: 'Chat session not found.' });
            }
        } else {
            // 新しいチャットドキュメントを作成する場合
            const firstMessageText = messages.length > 0 ? messages[0].text : "チャット";
            chat = new Chat({
                userId,
                projectId,
                title: firstMessageText,
                messages: [] 
            });
        }

        // 受け取ったメッセージを追加
        messages.forEach((message: Message) => {
            chat!.messages.push({
                text: message.text,
                sender: message.sender,
                timestamp: new Date(message.timestamp)
            });
        });

        await chat.save();
        res.status(201).json({ message: 'Messages saved successfully.', chatId: chat._id });
    } catch (error) {
        console.error('Server Error: Error saving the messages:', error);
        res.status(500).json({ error: 'Server Error: Unable to save your messages.' });
    }
});
// チャット履歴取得エンドポイント
router.get('/:chatId', async (req, res) => {
    try {
        const { chatId } = req.params;
        const decodedToken = verifyAccessToken(req);
        if (!decodedToken) {
            return res.status(401).json({ message: 'Unauthorized: No valid token provided.' });
        }
        const userId = decodedToken.userId;

        // ユーザーIDとチャットIDでチャット履歴を検索
        const chat = await Chat.findOne({ _id: chatId, userId: userId });
        if (!chat) {
            return res.status(404).json({ message: 'Chat not found.' });
        }
        
        // チャット履歴を返す
        res.status(200).json({ messages: chat.messages });
    } catch (error) {
        console.error('Server Error: Error fetching chat history:', error);
        res.status(500).json({ error: 'Server Error: Unable to fetch chat history.' });
    }
});

export default router;
