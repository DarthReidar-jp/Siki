// src/routes/auth.ts
import express from 'express';
import passport from 'passport';
import { IUser } from '../models/user'; 
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

  router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: `${process.env.FRONTEND_URL}login` }),
  (req, res) => {
    const user = req.user as IUser;
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY!, {
      expiresIn: '1d',
    });
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
    // リダイレクト先を環境変数で指定したURLの基に設定
    res.redirect(`${process.env.FRONTEND_URL}`);
  }
);
// ログイン状態を確認するためのエンドポイント
router.get('/verify', (req, res) => {
  const token = req.cookies['access_token'];
  if (!token) {
    return res.status(401).json({
      isLoggedIn: false,
      message: 'ログインされていません',
    });
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY!, (err:any, decoded:any) => {
    if (err) {
      return res.status(500).json({
        isLoggedIn: false,
        message: 'サーバーエラー: トークンの検証に失敗しました',
      });
    }
    return res.json({ isLoggedIn: true });
  });
});



export default router;
