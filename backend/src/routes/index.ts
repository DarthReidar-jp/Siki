import express, { Request, Response } from 'express';
import { getAllMemos } from '../utils/dataFetchUtils';

const router = express.Router();
// 表示画面（メモ一覧）
router.get('/', async (req: Request, res: Response) => {
  try {
    const { memos } = await getAllMemos();
    res.json( memos ); //メモのデータを渡す
  } catch (e) {
    if (e instanceof Error) {
      // eがErrorインスタンスである場合、そのmessageプロパティを使用
      res.status(500).send(e.message);
    } else {
      // eがErrorインスタンスではない場合（文字列など）、toStringで変換
      res.status(500).send(String(e));
    }
  }
});

export default router;
