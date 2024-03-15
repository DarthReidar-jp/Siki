// server.ts
// 環境変数をプロセスにロード
import dotenv from 'dotenv';
dotenv.config();

// 必要なモジュールをインポート
import createError from 'http-errors';
import express, { Express, Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from "cors";
import session from 'express-session';
import passport from 'passport';
import './config/passportSetup'; // Passport設定をインポート
import connectDB from './db'; // ここでdb.tsからconnectDBをインポートします

// インポートパスを修正する必要があります
import serverRouter from './routes/server'; // 正しいパスに注意してください
import authRoutes from './routes/auth';
import indexRouter from './routes/index'; 
import pageRouter from './routes/page';

const app: express.Express = express();

app.set('view engine', 'pug');
app.set('views', './views'); // pugファイルが格納されているディレクトリを指定

// ミドルウェアの設定
// CORS設定をカスタマイズ
const corsOptions = {
  origin: 'http://localhost:3000', // フロントエンドのオリジンを指定
  credentials: true, // クレデンシャル付きのリクエストを許可
};
app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
// セッションの設定
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// データベース接続
connectDB().then(() => {
  console.log('データベースへの接続が確立されました。');
}).catch((error) => {
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
  
// エラーハンドリング
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
    // 開発環境でのみエラー詳細を返す
    if (req.app.get('env') === 'development') {
      res.status(err.status || 500).json({ message: err.message, error: err });
    } else {
      res.status(err.status || 500).json({ message: err.message });
    }
  });

// appをエクスポートします
export default app;
