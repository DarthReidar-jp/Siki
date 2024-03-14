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
  const token = req.cookies['access_token']; // クッキーからトークンを取得
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as jwt.JwtPayload;
    const userId = decoded.userId;
    const { title } = req.body;

    let existingPage = await Page.findOne({ userId, title });
    let newTitle = title;
    let counter = 1;
    while (existingPage) {
      newTitle = `${title} (${counter})`;
      counter++;
      existingPage = await Page.findOne({ userId, title: newTitle });
    }
    // 新しいページを保存
    const newPage = new Page({
      userId,
      title: newTitle,
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
    const { title, content } = req.body;
    const pageId = req.params.id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const page = await Page.findOne({ _id: pageId, userId });
    if (!page) {
      return res.status(404).json({ error: 'Page not found' });
    }
    // 同じユーザーの中で重複するタイトルがないかチェック
    let existingPage = await Page.findOne({ userId, title, _id: { $ne: pageId } });
    let newTitle = title;
    let counter = 1;
    // タイトルが重複する場合、(n)を付与する
    while (existingPage) {
      newTitle = `${title} (${counter})`;
      counter++;
      existingPage = await Page.findOne({ userId, title: newTitle, _id: { $ne: pageId } });
    }
    page.title = newTitle;
    page.content = content;
    await page.save();
    res.json(page);
  } catch (e) {
    handleError(e, req,res);
  }
});

// 削除
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

// エラーハンドリング関数
function handleError(error: any, req: Request, res: Response) {
  console.error(`Error processing request ${req.method} ${req.url}`);
  console.error(error); // スタックトレースをログに記録

  if (error instanceof jwt.JsonWebTokenError) {
    // JWT関連のエラー詳細
    console.error("JWT verification error:", error.message);
    res.status(401).json({ message: 'Invalid token', error: error.message });
  } else if (error instanceof mongoose.Error) {
    // Mongoose (MongoDB)関連のエラー詳細
    console.error("Database error:", error.message);
    res.status(500).json({ message: 'Database error', error: error.message });
  } else if (error instanceof Error) {
    // 一般的なエラー詳細
    res.status(500).json({ message: 'Internal server error', error: error.message });
  } else {
    // 予期せぬエラータイプ
    res.status(500).json({ message: 'Unexpected error', error: String(error) });
  }
}


export default router;