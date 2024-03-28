// server.ts
// 環境変数を最初に読み込む
import dotenv from 'dotenv';
dotenv.config();

// 一括でモジュールをインポート
import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from "cors";
import session from 'express-session';
import passport from 'passport';
import createError from 'http-errors';

// 設定とDB接続関連のインポート
import './config/passportSetup';
import connectDB from './db';

//　ルートのインポート
import serverRouter from './routes/server';
import authRoutes from './routes/auth';
import indexRouter from './routes/index'; 
import pageRouter from './routes/page';

const app: express.Express = express();

// viewsの設定
app.set('view engine', 'pug');
app.set('views', './views');

// ミドルウェアの設定
const corsOptions = {
  origin: 'http://localhost:3000',
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

connectDB().then(() => {console.log('データベースへの接続が確立されました。');}).catch((error) => {
  console.error('データベース接続に失敗しました:', error);
  process.exit(1);
});

// ルーターの設定
app.use('/', serverRouter); 
app.use('/api',indexRouter);
app.use('/api/auth', authRoutes);
app.use('/api/page', pageRouter);

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
