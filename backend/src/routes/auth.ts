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
    const user = req.user as IUser; // userオブジェクトの型をIUserに設定
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY!, {
      expiresIn: '1d',
    });

    // HttpOnlyクッキーにJWTをセット
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    // 認証に成功したら、フロントエンドのホームページにリダイレクト
    res.redirect('http://localhost:3000');
  }
);

router.get("/current_user", (req, res) => {
  if (req.cookies.access_token) {
    try {
      const decoded = jwt.verify(req.cookies.access_token, process.env.JWT_SECRET_KEY!);
      // トークンが有効な場合は、ユーザー情報を返す
      return res.status(200).json({ isAuthenticated: true, user: decoded });
    } catch (err) {
      // トークンが無効な場合
      return res.status(200).json({ isAuthenticated: false });
    }
  } else {
    return res.status(200).json({ isAuthenticated: false });
  }
});

// src/routes/auth.ts

router.post('/logout', (req, res) => {
  res.cookie('access_token', '', { expires: new Date(0) }); // クッキーを無効化
  res.status(200).send({ message: 'Logged out successfully' });
});


export default router;
