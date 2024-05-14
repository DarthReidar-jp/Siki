import express, { Request, Response } from 'express';
import Page, { IPage } from '../models/page';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { verifyAccessToken } from '../utils/verifyAccessToken';
import { savePage } from "../data/savePages";
import { updatePages } from "../data/updatePages";

const router = express.Router();

//ページ作成
router.post('/', async (req: Request, res: Response) => {
  try {
    const decoded = verifyAccessToken(req);
    if (!decoded) {
      return res.status(401).json({ message: 'No token provided or invalid token' });
    }
    const userId = decoded.userId;
    const { root } = req.body;
    const newPage = await savePage(root,userId);
    res.status(201).json({ message: 'ページの作成が成功しました', page: newPage});
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: 'トークンが検証できません' });
    }
    handleError(error, req, res);
  }
});
// メモの詳細を表示
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const decoded = verifyAccessToken(req);
    if (!decoded) {
      return res.status(401).json({ message: 'No token provided or invalid token' });
    }
    const userId = decoded.userId;
    const projectId = req.query.projectId;
    const pageId = req.params.id;
    const query = projectId ? { projectId, _id: pageId } : { userId, _id: pageId };
    const page: IPage | null = await Page.findOne(query);
    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }
    res.json(page);
  } catch (e) {
    handleError(e, req, res);
  }
});

//ページ更新
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const decoded = verifyAccessToken(req);
    if (!decoded) {
      return res.status(401).json({ message: 'No token provided or invalid token' });
    }
    const userId = decoded.userId;
    const { root } = req.body;  
    const pageId = req.params.id;
    const page = await Page.findOne({ _id: pageId, userId });
    const updatePage = await updatePages(page,root)
    res.json(updatePage);
  } catch (e) {
    handleError(e, req, res);
  }
});
//ページ削除
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const decoded = verifyAccessToken(req);
    if (!decoded) {
      return res.status(401).json({ message: 'No token provided or invalid token' });
    }
    const userId = decoded.userId;
    const pageId = req.params.id;
    await Page.findOneAndDelete({ _id: pageId, userId });
    res.json({ message: 'Page deleted successfully' });
  } catch (e) {
    handleError(e, req,res);
  }
});
//エラーハンドリング
function handleError(error: any, req: Request, res: Response) {
  console.error(`Error processing request ${req.method} ${req.url}`);
  console.error('Request body:', req.body); // リクエストボディの内容をログに出力
  
  console.error(error);
  if (error instanceof jwt.JsonWebTokenError) {
    console.error("JWT verification error:", error.message);
    res.status(401).json({ message: 'Invalid token', error: error.message });
  } else if (error instanceof mongoose.Error) {
    console.error("Database error:", error.message);
    res.status(500).json({ message: 'Database error', error: error.message });
  } else if (error instanceof Error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  } else {
    res.status(500).json({ message: 'Unexpected error', error: String(error) });
  }
}
export default router;