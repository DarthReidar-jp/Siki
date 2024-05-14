import express, { Request, Response } from 'express';
import Project from '../models/project';  // ここで定義した Mongoose モデルをインポート
import { verifyAccessToken } from '../utils/verifyAccessToken';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import Page, { IPage } from '../models/page';
import { parseSortOption } from "../utils/pageSortOption";
import { saveProjectPage } from "../data/savePages";
import { updatePages } from "../data/updatePages";

const router = express.Router();

//プロジェクトの作成
router.post('/create', async (req, res) => {
  const decoded = verifyAccessToken(req);
  if (!decoded) {
      return res.status(401).json({ message: 'No token provided or invalid token' });
  }
  const userId = decoded.userId;
  const { projectId, projectName, isPublic } = req.body;
  try {
      const newProject = new Project({
          projectId,
          projectName,
          createUserId: userId,
          isPublic,
          projectMemberUserIds: [userId],
          createdAt: new Date(),
          updatedAt: new Date()
      });

      const savedProject = await newProject.save();
      res.status(201).json(savedProject);
    } catch (error: unknown) {  // ここで `error` を `unknown` 型として宣言
      // エラーが具体的にどのような型であるかのチェックを行う
      if (error instanceof Error) {
          if ('code' in error && (error as any).code === 11000) {
              res.status(409).json({ message: 'このプロジェクトIDは既に使用されています。別のIDを選んでください。' });
          } else {
              res.status(500).json({ message: 'プロジェクトの作成に失敗しました。', error: error.message });
          }
      } else {
          res.status(500).json({ message: '予期せぬエラーが発生しました。' });
      }
  }
});

//プロジェクトのページの表示
router.get('/', async (req: Request, res: Response) => {
  try {
    const decoded = verifyAccessToken(req);
    if (!decoded) {
      return res.status(401).json({ message: 'No token provided or invalid token' });
    }
    const userId = decoded.userId;
    const sortOption = req.query.sort as string | undefined;
    const sort = parseSortOption(sortOption);
    const projectId = req.query.projectId as string;
    const project = await Project.findOne({ projectId });
    if (!project) {
        return res.status(404).json({ message: 'Project not found' });
    }
    const isMember = project.projectMemberUserIds.includes(userId);
    const isPublic = project.isPublic; 

    const page = parseInt(req.query.page as string || '1');
    const pageSize = parseInt(req.query.pageSize as string || '75');
    const pages: IPage[] = await Page.find({ projectId })
      .sort(sort)
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    // メンバーであるかつ公開設定に応じて、表示するかどうかのフラグを設定
    const shouldDisplay = (isPublic || isMember);

    res.json(pages);
  } catch (e) {
    // エラー処理
    res.status(500).json({ message: 'Internal server error' });
  }
});
//プロジェクト表示許可
router.get('/verify', async (req: Request, res: Response) => {
  try {
    const decoded = verifyAccessToken(req);
    if (!decoded) {
      return res.status(401).json({ message: 'No token provided or invalid token' });
    }
    const userId = decoded.userId;
    const projectId = req.query.projectId as string;
    console.log(projectId);
    const project = await Project.findOne({ projectId });
    if (!project) {
        return res.status(404).json({ message: 'Project not found' });
    }
    const isMember = project.projectMemberUserIds.includes(userId);
    const isPublic = project.isPublic; 
    // メンバーであるかつ公開設定に応じて、表示するかどうかのフラグを設定
    const shouldDisplay = (isPublic || isMember);

    res.json({isMember,shouldDisplay});
  } catch (e) {
    // エラー処理
    res.status(500).json({ message: 'Internal server error' });
  }
});
//プロジェクトリストの取得
router.get('/list', async (req, res) => {
  const decodedToken = verifyAccessToken(req);
  if (!decodedToken) {
      return res.status(401).json({ message: 'Unauthorized: No valid token provided.' });
  }
  const userId = decodedToken.userId; // TokenからuserIdを取得
  try {
      // 更新順に受け取るためのチャットデータの取得
      const project = await Project.find({ createUserId: userId }).sort({ updatedAt: -1 });

      // チャットのidとタイトルを更新順にフロントエンドへ渡す
      const formattedProject = project.map(project => ({
          projectId: project.projectId, // チャットのID
          projectName: project.projectName // チャットのタイトル
      }));
      
      // レスポンスの送信
      res.status(200).json(formattedProject);
  } catch (error) {
      // エラーハンドリング
      console.error('Error fetching chats:', error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});
//ページ作成
router.post('/newpage/:id', async (req: Request, res: Response) => {
  try {
    const decoded = verifyAccessToken(req);
    if (!decoded) {
      return res.status(401).json({ message: 'No token provided or invalid token' });
    }
    const projectId = req.params.id;
    console.log(projectId);
    const userId = decoded.userId;
    const { root } = req.body;
    const newPage = await saveProjectPage(root,userId,projectId);
    res.status(201).json({ message: 'ページの作成が成功しました', page: newPage });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: 'トークンが検証できません' });
    }
    handleError(error, req, res);
  }
});
//ページ更新
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const decoded = verifyAccessToken(req);
    if (!decoded) {
      return res.status(401).json({ message: 'No token provided or invalid token' });
    }
    const userId = decoded.userId;
    const { root } = req.body;  
    const pageId = req.params.id;
    const page = await Page.findOne({ _id: pageId, userId });
    const updatePage = await updatePages(page,root)
    res.json(updatePage);
  } catch (e) {
    handleError(e, req, res);
  }
});
//ページ削除
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const decoded = verifyAccessToken(req);
    if (!decoded) {
      return res.status(401).json({ message: 'No token provided or invalid token' });
    }
    const { projectId } = req.body
    const pageId = req.params.id;
    await Page.findOneAndDelete({ _id: pageId, projectId });
    res.json({ message: 'Page deleted successfully' });
  } catch (e) {
    handleError(e, req,res);
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