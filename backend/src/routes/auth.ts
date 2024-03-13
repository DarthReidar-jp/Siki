// src/routes/auth.ts
import express from 'express';
import passport from 'passport';
import { IUser } from '../models/user'; // 適切なパスを使用してください
import jwt from 'jsonwebtoken';

const router = express.Router();
// Google認証のためのルート
router.get('/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

// Googleからのコールバックを処理
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: 'http://localhost:3000/' }),
  (req, res) => {
    const user = req.user as IUser;
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY!, {
      expiresIn: '1d',
    });
    // HttpOnlyクッキーにJWTをセット
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
    // 認証確認ページにリダイレクト
    res.redirect('http://localhost:3000/auth/success');
  }
);
// ログイン状態を確認するためのエンドポイント
router.get('/verify', (req, res) => {
  // JWT がクッキーに存在するか確認
  const token = req.cookies['access_token'];
  if (!token) {
    return res.status(401).json({ isLoggedIn: false });
  }

  // JWT の検証
  jwt.verify(token, process.env.JWT_SECRET_KEY!, (err:any, decoded:any) => {
    if (err) {
      return res.status(500).json({ isLoggedIn: false });
    }
    // 検証が成功した場合
    return res.json({ isLoggedIn: true });
  });
});

export default router;
