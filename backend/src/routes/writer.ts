import express, { Request, Response } from 'express';
import { Book } from '../models/book';
import { ObjectId } from 'mongodb'; // MongoDBドライバーからObjectIdをインポート
import { getDBCollection } from '../utils/dbUtils';


const router = express.Router();

// タイトル入力時にBookを作成するエンドポイント
router.post('/', async (req: Request, res: Response) => {
  try {
      const { title } = req.body;
      const collection = await getDBCollection('books');
      const result = await collection.insertOne({ title: title });

      if (result.acknowledged) {
          // res.redirectの代わりに、生成されたbookIdをクライアントに返す
          res.json({ bookId: result.insertedId.toString() });
      } else {
          res.status(500).send('Bookの作成に失敗しました。');
      }
  } catch (e) {
      if (e instanceof Error) {
          res.status(500).send(e.message);
      } else {
          res.status(500).send(String(e));
      }
  }
});


// Book執筆画面を表示
router.get('/:bookId', async (req: Request, res: Response) => {
  try {
      const { bookId } = req.params;
      // パラメータから取得したbookIdを使用してMongoDBのObjectIdを生成
      const objectId = new ObjectId(bookId);
      const collection = await getDBCollection('books');
      // 指定されたIDを持つBookをデータベースから検索
      const book = await collection.findOne({ _id: objectId });

      if (book) {
          res.render(book);
      } else {
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


// 本の編集
router.post('/edit/:bookid', async (req: Request, res: Response) => {
  try {
      const { title, content } = req.body;
      const collection = await getDBCollection('books');
      //ここらへんでマークダウンの処理しなくていいの？
      await collection.updateOne(
          { _id: new ObjectId(req.params.bookid) },
          { $set: { title, content } }
      );
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