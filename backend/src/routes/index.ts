import express, { Request, Response } from 'express';
import Page, { IPage } from '../models/page';
import { performVectorSearch } from '../utils/searchUtils'; 
import { verifyToken } from '../utils/verifyToken';


const router = express.Router();

// ユーザーに関連するページデータを取得
router.get('/', async (req: Request, res: Response) => {
  try {
    const decoded = verifyToken(req);
    if (!decoded) {
      return res.status(401).json({ message: 'No token provided or invalid token' });
    }
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

router.get('/search', async (req: Request, res: Response) => {
  try {
    const decoded = verifyToken(req);
    if (!decoded) {
      return res.status(401).json({ message: 'No token provided or invalid token' });
    }
    const userId = decoded.userId;
    const { query } = req.query;
    console.log('Query:', query); // デバッグ情報としてクエリをログに出力
    if (typeof query !== 'string') {
      return res.status(400).json({ message: 'Query must be a string.' });
    }
    const searchResults = await performVectorSearch(query,userId);
    res.json(searchResults);
  } catch (e) {
    console.error('Search error:', e);
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