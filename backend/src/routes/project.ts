import express, { Request, Response } from 'express';
import Project,{ IProject } from '../models/project';  // ここで定義した Mongoose モデルをインポート
import { verifyToken } from '../utils/verifyToken';
import { getPageVector } from '../llm/openaiUtils';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import Page, { IPage } from '../models/page';
import { extractTexts } from '../utils/extractTextUtils';

const router = express.Router();

router.post('/create', async(req,res) =>{
    const decoded = verifyToken(req);
    if (!decoded) {
      return res.status(401).json({ message: 'No token provided or invalid token' });
    }
    const userId = decoded.userId;
    const { projectId, projectName, isPublic } = req.body;
    try {
        const newProject = new Project({
            projectId,
            projectName,
            createUserId:userId,
            isPublic,
            projectMemberUserIds: userId,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        const savedProject = await newProject.save();
        res.status(201).json(savedProject);
    } catch (error) {
        res.status(400).json({ message: 'プロジェクトの作成に失敗しました', error });
    }
});

// プロジェクトのページデータを取得
router.get('/', async (req: Request, res: Response) => {
    try {
      const decoded = verifyToken(req);
      if (!decoded) {
        return res.status(401).json({ message: 'No token provided or invalid token' });
      }
      const sortOption = req.query.sort;
      let sort = {};
  
      // ソートオプションの設定
      switch (sortOption) {
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
          sort = { createdAt: -1 };
      }
      // ページネーションのパラメータ
      const projectId = req.query.projectId as string; // projectId をクエリパラメータから取得
      if (!projectId) {
          return res.status(400).json({ message: 'Project ID is required' });
      }
      const page = parseInt(req.query.page as string || '1'); // デフォルトは1ページ目
      const pageSize = parseInt(req.query.pageSize as string || '75'); // デフォルトのページサイズ
      const pages: IPage[] = await Page.find({ projectId })
        .sort(sort)
        .skip((page - 1) * pageSize)
        .limit(pageSize);
  
      res.json(pages);
    } catch (e) {
    }
  });


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