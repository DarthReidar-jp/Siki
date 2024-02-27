// routes/detail.ts
import express, { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { getMemoVector } from '../utils/openaiUtils';
import { getDBCollection } from '../utils/dbUtils';

const router = express.Router();

// メモの詳細を表示
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const collection = await getDBCollection('memos');
        const memo = await collection.findOne({ _id: new ObjectId(req.params.id) });
        res.json(memo);
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

// メモの編集とエンベディングの更新を処理
router.post('/:id', async (req: Request, res: Response) => {
    const { title, content } = req.body;
    try {
        const collection = await getDBCollection('memos');
        const vector = await getMemoVector(content);
        await collection.updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: { title, content, vector } }
        );
        console.log("更新しました");
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

// 削除
router.post('/delete/:id', async (req: Request, res: Response) => {
    try {
        console.log('削除リクエスト受信:', req.params.id);
        const collection = await getDBCollection('memos');
        await collection.deleteOne({ _id: new ObjectId(req.params.id) });
        console.log("削除しました");
    } catch (e) {
        if (e instanceof Error) {
            // eがErrorインスタンスである場合、そのmessageプロパティを使用
            res.status(500).send(e.message);
            console.error('削除中のエラー:', e);
          } else {
            // eがErrorインスタンスではない場合（文字列など）、toStringで変換
            res.status(500).send(String(e));
          }
    }
});

export default router;