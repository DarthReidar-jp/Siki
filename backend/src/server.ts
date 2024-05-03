//server.ts
import dotenv from 'dotenv';
dotenv.config();

// モジュールをインポート
import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from "cors";
import session from 'express-session';
import createError from 'http-errors';
import path from 'path';
import './config/passportSetup';
import passport from 'passport';

// 設定とDB接続関連のインポート
import connectDB from './config/db';

//　ルートのインポート
import authRoutes from './routes/auth';
import indexRouter from './routes/index';
import pageRouter from './routes/page';
import chatRouter from './routes/chat';
import projectRouter from './routes/project';

const app: express.Express = express();

// ミドルウェアの設定
const corsOptions = {
  origin: process.env.FRONTEND_URL2,
  credentials: true,
};
app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

//データベースの接続
connectDB().then(() => { console.log('データベースへの接続が確立されました。'); }).catch((error) => {
  console.error('データベース接続に失敗しました:', error);
  process.exit(1);
});

// ルーターの設定
app.use('/api', indexRouter);
app.use('/api/auth', authRoutes);
app.use('/api/page', pageRouter);
app.use('/api/chat', chatRouter);
app.use('/api/project', projectRouter);

// Reactのビルドされた静的ファイルを提供
app.use(express.static(path.join(__dirname, '..', '..', 'frontend', 'build')));

// すべての未処理のGETリクエストをReactのindex.htmlにリダイレクト
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', '..', 'frontend', 'build', 'index.html'));
});

// 404 エラーのハンドリング
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  if (req.app.get('env') === 'development') {
    res.status(err.status || 500).json({ message: err.message, error: err });
  } else {
    res.status(err.status || 500).json({ message: err.message });
  }
});

export default app;
