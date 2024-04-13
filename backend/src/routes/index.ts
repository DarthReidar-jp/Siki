import express, { Request, Response } from 'express';
import Page, { IPage } from '../models/page';
import { performVectorSearch } from '../utils/searchUtils'; 
import { verifyToken } from '../utils/verifyToken';
import { createEditorState } from '../utils/jsonConversion';
import { getPageVector } from '../utils/openaiUtils';


const router = express.Router();

// ユーザーに関連するページデータを取得
router.get('/', async (req: Request, res: Response) => {
  try {
    const decoded = verifyToken(req);
    if (!decoded) {
      return res.status(401).json({ message: 'No token provided or invalid token' });
    }
    const userId = decoded.userId;
    const sortOption = req.query.sort;
    let sort = {};

    switch(sortOption) {
      case 'createdAsc':
        sort = { createdAt: 1 };
        break;
      case 'updatedDesc':
        sort = { updatedAt: -1 };
        break;
      case 'titleAsc':
        sort = { title: 1 };
        break;
      case 'titleDesc':
        sort = { title: -1 };
        break;
      default:
        // デフォルトのソートオプション、必要に応じて変更してください
        sort = { createdAt: -1 };
    }

    const pages: IPage[] = await Page.find({ userId }).sort(sort);
    res.json(pages);
  } catch (e) {
    handleError(e, res);
  }
});

router.get('/search', async (req: Request, res: Response) => {
  try {
    const decoded = verifyToken(req);
    if (!decoded) {
      return res.status(401).json({ message: 'No token provided or invalid token' });
    }
    const userId = decoded.userId;
    const { query } = req.query;
    console.log('Query:', query); // デバッグ情報としてクエリをログに出力
    if (typeof query !== 'string') {
      return res.status(400).json({ message: 'Query must be a string.' });
    }
    const searchResults = await performVectorSearch(query,userId);
    res.json(searchResults);
  } catch (e) {
    console.error('Search error:', e);
    handleError(e, res);
  }
});

//JSONimport関数
router.post('/json', async (req: Request, res: Response) => {
  // トークン検証
  const decoded = verifyToken(req);
  if (!decoded) {
      return res.status(401).json({ message: 'No token provided or invalid token' });
  }
  const userId = decoded.userId;

  // JSONファイルの読み込みと前処理
  // req.bodyからJSONデータを取得する
  const jsonData = JSON.parse(req.body.data);  // JSON文字列をオブジェクトに変換
  const pages = createEditorState(jsonData);  // createEditorStateが正しくJSONオブジェクトを受け取るようにする
  console.log(pages);
  // 各ページに対して以下の処理を繰り返す
  for (const page of pages) {
      const root = page.root;  // ページデータからroot nodeを取得

      const lines = extractTexts(root.root);
      const title = lines.length > 0 ? lines[0] : 'デフォルトタイトル';
      const content = lines.join('');
      const vector = await getPageVector(content);
      // 新しいページインスタンスの作成
      const newPage = new Page({
          userId,
          title,
          root,
          lines,
          content,
          vector,
          createdAt: new Date(),
      });

      // データベースへの保存
      try {
          await newPage.save();
          console.log({title},"をほぞんしました");
      } catch (error) {
          console.error('Error saving page:', error);
          res.status(500).json({ message: 'Error saving page', error });
          return;
      }
  }

  // すべてのページが正常に保存された場合
  res.status(201).json({ message: 'All pages saved successfully' });
});

//文字列抽出関数
const extractTexts = (node: any): string[] => {
  if (!node) return [];
  if (node.text) return [node.text]; 
  return node.children?.flatMap(extractTexts) || [];
};

// エラーハンドリング関数
function handleError(error: any, res: Response) {
  if (error instanceof Error) {
    res.status(500).json({ error: error.message });
  } else {
    res.status(500).json({ error: String(error) });
  }
}

export default router;