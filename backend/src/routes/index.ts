import express, { Request, Response } from 'express';
import Page, { IPage } from '../models/page';
import { mongoDBAtlasVectorSearch } from '../utils/mongoDBAtlasVectorSearch';
import { verifyAccessToken } from '../utils/verifyAccessToken';
import { createEditorState } from '../utils/linesToEditorState';
import { parseSortOption } from "../utils/pageSortOption";
import { savePages } from "../data/savePages";

const router = express.Router();

// ユーザーに関連するページデータを取得
router.get('/', async (req: Request, res: Response) => {
  try {
    const decoded = verifyAccessToken(req);
    if (!decoded) {
      return res.status(401).json({ message: 'No token provided or invalid token' });
    }
    const userId = decoded.userId;
    const sortOption = req.query.sort as string | undefined;
    const sort = parseSortOption(sortOption);
    const page = parseInt(req.query.page as string || '1');
    const pageSize = parseInt(req.query.pageSize as string || '20');
    const pages: IPage[] = await Page.find({ userId }).sort(sort).skip((page - 1) * pageSize).limit(pageSize);
    res.json(pages);
  } catch (e) {
    handleError(e, res);
  }
});
//検索
router.get('/search', async (req: Request, res: Response) => {
  try {
    const decoded = verifyAccessToken(req);
    if (!decoded) {
      return res.status(401).json({ message: 'No token provided or invalid token' });
    }
    const userId = decoded.userId;
    const { query, projectId } = req.query;
    if (typeof query !== 'string') {
      return res.status(400).json({ message: 'Query must be a string.' });
    }
    const identifier = projectId || userId; // projectIdがあればそれを、なければuserIdを使用
    const searchResults = await mongoDBAtlasVectorSearch(query, identifier, !!projectId);
    res.json(searchResults);
  } catch (e) {
    console.error('Search error:', e);
    handleError(e, res);
  }
});
//JSONimport関数
router.post('/json', async (req: Request, res: Response) => {
  const decoded = verifyAccessToken(req);
  if (!decoded) {
    return res.status(401).json({ message: 'No token provided or invalid token' });
  }
  const userId = decoded.userId;

  let jsonData = JSON.parse(req.body.data);
  let projectId: string | undefined;

  // req.query.projectId が文字列の場合のみ projectId を設定
  if (typeof req.query.projectId === 'string') {
    projectId = req.query.projectId;
  }
  const pages = createEditorState(jsonData);
  
  await savePages(pages, userId, projectId);
  res.status(201).json({ message: 'All pages saved successfully' });
});
// エラーハンドリング関数
function handleError(error: any, res: Response) {
  if (error instanceof Error) {
    console.error("Server Error:", error); // ここでエラー内容を詳しくログに記録
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
    res.status(500).json({ error: error.message });
  } else {
    res.status(500).json({ error: String(error) });
  }

}

export default router;