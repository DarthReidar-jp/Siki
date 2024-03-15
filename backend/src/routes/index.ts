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
    const sortOption = req.query.sort; // クエリパラメータから並べ替えオプションを取得
    let sort = {};

    switch(sortOption) {
      case 'createdAsc':
        sort = { createdAt: 1 };
        break;
      case 'updatedDesc':
        sort = { updatedAt: -1 };
        break;
      case 'titleAsc':
        sort = { title: 1 };
        break;
      case 'titleDesc':
        sort = { title: -1 };
        break;
      default:
        // デフォルトのソートオプション、必要に応じて変更してください
        sort = { createdAt: -1 };
    }

    const pages: IPage[] = await Page.find({ userId }).sort(sort);
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