//page.ts
import express, { Request, Response } from 'express';
import Page, { IPage } from '../models/page';
import { getPageVector } from '../utils/openaiUtils';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const token = req.cookies['access_token'];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as jwt.JwtPayload;
    const userId = decoded.userId;
    const { root } = req.body;
    const { root: rootNode } = root;
    console.log(rootNode);
    const extractTexts = (node: any): string[] => {
      if (!node) return [];
      if (node.text) return [node.text];
      return node.children?.flatMap(extractTexts) || [];
    };
    const lines = extractTexts(rootNode);
    const title = lines.length > 0 ? lines[0] : 'デフォルトタイトル';
    const content = lines.join('');
    console.log('Extracted title:', title); 
    console.log('Extracted content:', content);
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
  const token = req.cookies['access_token']; // クッキーからトークンを取得
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as jwt.JwtPayload;
    const userId = decoded.userId;
    const pageId = req.params.id;
    const page: IPage | null = await Page.findOne({ userId, _id: pageId });
    res.json(page);
  } catch (e) {
    handleError(e, req, res);
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  const token = req.cookies['access_token'];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as jwt.JwtPayload;
    const userId = decoded.userId;
    const { root } = req.body;
    const { root: rootNode } = root; // フロントエンドから送信されたrootオブジェクトから実際のrootノードを取り出す
    // テキストのみを抽出してlinesに格納
    const extractTexts = (node: any): string[] => {
      if (!node) return []; // ノードがnullまたはundefinedの場合、空の配列を返す
      if (node.text) return [node.text]; // テキストプロパティがある場合は、その値を含む配列を返す
      // childrenプロパティがある場合、その各子ノードに対してextractTextsを再帰的に呼び出し、
      // 結果をflatMapを使って平坦化する
      return node.children?.flatMap(extractTexts) || [];
    };
    
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