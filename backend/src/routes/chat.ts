import express from 'express';
import { verifyToken } from '../utils/verifyToken';
import { generateResponseUsingRAGandHistory } from '../llm/retrieverChatHistory';
import  Chat, { IChat } from '../models/chat';


interface Message {
    text: string;
    sender: 'user' | 'ai';
    timestamp: string;  // ISO string format
  }
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

        const response = await generateResponseUsingRAGandHistory(chat_history, userId, userMessage);
        res.json({ answer: response.answer });
    } catch (error) {
        console.error('Server Error: Error processing the message:', error);
        res.status(500).json({ error: 'Server Error: Unable to process your message.' });
    }
});

// メッセージの保存用エンドポイント
router.post('/save', async (req, res) => {
    try {
        const decodedToken = verifyToken(req);
        if (!decodedToken) {
            return res.status(401).json({ message: 'Unauthorized: No valid token provided.' });
        }

        const userId = decodedToken.userId;
        const { messages, chatId } = req.body;  // 複数メッセージとchatIdを受け取る

        let chat: IChat | null = null;  // IChat型をchatに割り当て
        if (chatId) {
            // 既存のチャットセッションを検索
            chat = await Chat.findOne({ _id: chatId, userId: userId });
            if (!chat) {
                return res.status(404).json({ message: 'Chat session not found.' });
            }
        } else {
            // 新しいチャットドキュメントを作成する場合
            chat = new Chat({
                userId,
                title:"チャット",
                messages: []  // 最初は空のメッセージ配列で始める
            });
        }

        // 受け取ったメッセージを追加
        messages.forEach((message:Message) => {
            chat!.messages.push({
                text: message.text,
                sender: message.sender,
                timestamp: new Date(message.timestamp)  // タイムスタンプを適切に処理
            });
        });

        await chat.save();  // ドキュメントを保存または更新
        res.status(201).json({ message: 'Messages saved successfully.', chatId: chat._id });
    } catch (error) {
        console.error('Server Error: Error saving the messages:', error);
        res.status(500).json({ error: 'Server Error: Unable to save your messages.' });
    }
});

// チャット履歴取得エンドポイント
router.get('/:chatId', async (req, res) => {
    try {
        const { chatId } = req.params; // URLからchatIdを取得
        const decodedToken = verifyToken(req);
        if (!decodedToken) {
            return res.status(401).json({ message: 'Unauthorized: No valid token provided.' });
        }
        const userId = decodedToken.userId; // TokenからuserIdを取得

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
