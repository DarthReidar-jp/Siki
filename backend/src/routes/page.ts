import express, { Request, Response } from 'express';
import Page, { IPage } from '../models/page';
import { getPageVector } from '../utils/openaiUtils';
import { IUser } from '../models/user'; // 適切なパスを使用してください

const router = express.Router();

// メモの詳細を表示
router.get('/:title', async (req: Request, res: Response) => {
  try {
    const userId = (req.user as IUser)?._id.toString(); // IUser型へのアサーションを使
    const title = req.params.title;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const page: IPage | null = await Page.findOne({ userId, title });

    if (!page) {
      return res.status(404).json({ error: 'Page not found' });
    }

    res.json(page);
  } catch (e) {
    handleError(e, res);
  }
});

// 新規メモの作成
router.post('/', async (req: Request, res: Response) => {
  try {
    const userId = (req.user as IUser)?._id.toString(); // IUser型へのアサーションを使
    const { title } = req.body;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    // 同じユーザーの中で重複するタイトルがないかチェック
    let existingPage = await Page.findOne({ userId, title });
    let newTitle = title;
    let counter = 1;

    // タイトルが重複する場合、(n)を付与する
    while (existingPage) {
      newTitle = `${title} (${counter})`;
      counter++;
      existingPage = await Page.findOne({ userId, title: newTitle });
    }

    const page = new Page({ userId, title: newTitle, content: '', vector: [] });
    await page.save();
    res.json(page);
  } catch (e) {
    handleError(e, res);
  }
});

// メモの編集とエンベディングの更新を処理
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const userId = (req.user as IUser)?._id.toString(); // IUser型へのアサーションを使
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

    const vector = await getPageVector(content);
    page.title = newTitle;
    page.content = content;
    page.vector = vector;
    await page.save();
    res.json(page);
  } catch (e) {
    handleError(e, res);
  }
});

// 削除
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const userId = (req.user as IUser)?._id.toString(); // IUser型へのアサーションを使
    const pageId = req.params.id;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const page = await Page.findOneAndDelete({ _id: pageId, userId });

    if (!page) {
      return res.status(404).json({ error: 'Page not found' });
    }

    res.json({ message: 'Page deleted successfully' });
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