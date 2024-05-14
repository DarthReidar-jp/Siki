import express from 'express';
import passport from 'passport';
import { IUser } from '../models/user';
import jwt from 'jsonwebtoken';
import { verifyAccessToken } from '../utils/verifyAccessToken';

const router = express.Router();

router.get('/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  }));
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: `${process.env.FRONTEND_URL}` }),
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
  const decodedToken = verifyAccessToken(req);
  if (!decodedToken) {
      return res.status(401).json({ message: 'Unauthorized: No valid token provided.' });
  }
    return res.json({ isLoggedIn: true });
});
// ログアウトエンドポイント
router.get('/logout', (req, res) => {
  res.clearCookie('access_token');  // JWTトークンをクリア
  res.redirect(`${process.env.FRONTEND_URL}/`); // ログインページへリダイレクト（必要に応じて変更可）
});

export default router;
