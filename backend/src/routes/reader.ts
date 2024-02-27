import express, { Request, Response } from 'express';
import { ObjectId } from 'mongodb'; // MongoDBドライバーからObjectIdをインポート
import { Memo } from '../models/memo';
import { getDBCollection } from '../utils/dbUtils'; // getDBCollectionの実装がどこにあるかに基づいて適宜パスを修正してください
import { getMemoVector } from '../utils/openaiUtils';

const router = express.Router();

// 特定のBookの編集画面を表示
router.get('/:bookId', async (req: Request, res: Response) => {
    try {
        const { bookId } = req.params;

        // パラメータから取得したbookIdを使用してMongoDBのObjectIdを生成
        const objectId = new ObjectId(bookId);
        const collection = await getDBCollection('books');

        // 指定されたIDを持つBookをデータベースから検索
        const book = await collection.findOne({ _id: objectId });
        if (book) {
            // マークダウンをHTMLに変換
            book.contentHtml = (book.content);
            res.json(book);
        } else {
            // Bookが見つからない場合、404エラーを表示
            res.status(404).send('Book not found');
        }
    } catch (e) {
        if (e instanceof Error) {
            res.status(500).send(e.message);
        } else {
            res.status(500).send(String(e));
        }
    }
});

// メモ作成のルーティング
router.post('/createMemo', async (req, res) => {
    try {
        const { title, content } = req.body;
        const vector = await getMemoVector(content);
        // Memoの型が正確には不明ですが、ここでは適切な型を持つと仮定します。
        const memo = new Memo(title, content, vector,);
        const collection = await getDBCollection('memos');
        await collection.insertOne(memo);
        console.log('memoは保存されました')
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