//page.ts
import express, { Request, Response } from 'express';
import Page, { IPage } from '../models/page';
import { getPageVector } from '../utils/openaiUtils';
import { IUser } from '../models/user'; 
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const router = express.Router();
//ページ作成
router.post('/', async (req: Request, res: Response) => {
  const token = req.cookies['access_token'];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as jwt.JwtPayload;
    const userId = decoded.userId;
    const { title,lines } = req.body;
    const content = lines.join('');
    const newPage = new Page({
      userId,
      title,
      lines,
      content,
      createdAt:new Date(),
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
    handleError(e,req, res);
  }
});

// メモの編集処理
router.put('/:id', async (req: Request, res: Response) => {
  const token = req.cookies['access_token']; // クッキーからトークンを取得
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as jwt.JwtPayload;
    const userId = decoded.userId;
    const { title, lines } = req.body;
    const pageId = req.params.id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const page = await Page.findOne({ _id: pageId, userId });
    if (!page) {
      return res.status(404).json({ error: 'Page not found' });
    }
    page.title = title;
    page.lines = lines;
    page.content = lines.join('');
    page.vector = await getPageVector(page.content);
    await page.save();
    res.json(page);
  } catch (e) {
    handleError(e, req,res);
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  const token = req.cookies['access_token']; // クッキーからトークンを取得
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as jwt.JwtPayload;
    const userId = decoded.userId;
    const pageId = req.params.id;

    const page = await Page.findOneAndDelete({ _id: pageId, userId });
    res.json({ message: 'Page deleted successfully' });
  } catch (e) {
    handleError(e, req,res);
  }
});


function handleError(error: any, req: Request, res: Response) {
  console.error(`Error processing request ${req.method} ${req.url}`);
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