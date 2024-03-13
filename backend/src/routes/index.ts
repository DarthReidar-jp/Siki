import express, { Request, Response } from 'express';
import Page, { IPage } from '../models/page';
import { IUser } from '../models/user'; // 適切なパスを使用してください
import jwt from 'jsonwebtoken';

const router = express.Router();

// ユーザーに関連するページデータを取得
router.get('/', async (req: Request, res: Response) => {
	const token = req.cookies['access_token']; // クッキーからトークンを取得
	  if (!token) {
	    return res.status(401).json({ message: 'No token provided' });
	  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as jwt.JwtPayload;
    const userId = decoded.userId;

    const pages: IPage[] = await Page.find({ userId });
    res.json(pages);
  } catch (e) {
    handleError(e, res);
  }
});

// エラーハンドリング関数
function handleError(error: any, res: Response) {
  if (error instanceof Error) {
    res.status(500).json({ error: error.message });
  } else {
    res.status(500).json({ error: String(error) });
  }
}

export default router;