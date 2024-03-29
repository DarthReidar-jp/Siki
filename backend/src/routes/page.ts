//page.ts
import express, { Request, Response } from 'express';
import Page, { IPage } from '../models/page';
import { getPageVector } from '../utils/openaiUtils';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { verifyToken } from '../utils/verifyToken';

const router = express.Router();
//ページ作成
router.post('/', async (req: Request, res: Response) => {
  try {
    const decoded = verifyToken(req);
    if (!decoded) {
      return res.status(401).json({ message: 'No token provided or invalid token' });
    }
    const userId = decoded.userId;
    const { root } = req.body;
    console.log(root);
    const lines = extractTexts(root.root);
    const title = lines.length > 0 ? lines[0] : 'デフォルトタイトル';
    const content = lines.join('');
    const newPage = new Page({
      userId,
      title,
      root,
      lines,
      content,
      createdAt: new Date(),
    });
    await newPage.save();
    res.status(201).json({ message: 'Page created successfully', page: newPage });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    handleError(error, req, res);
  }
});
// メモの詳細を表示
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const decoded = verifyToken(req);
    if (!decoded) {
      return res.status(401).json({ message: 'No token provided or invalid token' });
    }
    const userId = decoded.userId;
    const pageId = req.params.id;
    const page: IPage | null = await Page.findOne({ userId, _id: pageId });
    res.json(page);
  } catch (e) {
    handleError(e, req, res);
  }
});
//ページ更新
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const decoded = verifyToken(req);
    if (!decoded) {
      return res.status(401).json({ message: 'No token provided or invalid token' });
    }
    const userId = decoded.userId;
    const { root } = req.body;
    const { root: rootNode } = root;   
    const pageId = req.params.id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const page = await Page.findOne({ _id: pageId, userId });
    if (!page) {
      return res.status(404).json({ error: 'Page not found' });
    }
    page.root = root;
    page.lines = extractTexts(rootNode);
    page.title =  page.lines.length > 0 ? page.lines[0] : 'デフォルトタイトル';
    page.content = page.lines.join('');
    page.vector = await getPageVector(page.content);
    await page.save();
    res.json(page);
  } catch (e) {
    handleError(e, req, res);
  }
});
//ページ削除
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const decoded = verifyToken(req);
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

//文字列抽出関数
const extractTexts = (node: any): string[] => {
  if (!node) return [];
  if (node.text) return [node.text]; 
  return node.children?.flatMap(extractTexts) || [];
};
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