import express, { Request, Response } from 'express';
import Page, { IPage } from '../models/page';
import { IUser } from '../models/user'; // 適切なパスを使用してください


const router = express.Router();

// ユーザーに関連するページデータを取得
router.get('/', async (req: Request, res: Response) => {
  try {
    const userId = (req.user as IUser)?._id.toString(); // IUser型へのアサーションを使

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

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