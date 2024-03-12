// src/routes/auth.ts
import express from 'express';
import passport from 'passport';

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
    // 認証に成功したら、フロントエンドのホームページにリダイレクト
    res.redirect('http://localhost:3000/');
  });

export default router;
