// src/routes/auth.ts
import { Router } from 'express';
import { getDBCollection } from '../utils/dbUtils';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/signup', async (req, res) => {
  const usersCollection = await getDBCollection('users');
  const { username, email, password } = req.body;

  // パスワードのハッシュ化
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    // ユーザー情報の保存
    const result = await usersCollection.insertOne({
      username,
      email,
      password: hashedPassword,
    });

    // JWTトークンの生成（サインアップ成功時）
    const secretKey = process.env.SECRET_KEY as string;
    if (!secretKey) {
      throw new Error("SECRET_KEY is not defined");
    }
    const token = jwt.sign({ userId: result.insertedId }, secretKey, { expiresIn: '1h' });

    res.status(201).send({ message: "User created successfully", userId: result.insertedId, token });
  } catch (e) {
    if (e instanceof Error) {
        res.status(500).send(e.message);
    } else {
        res.status(500).send(String(e));
    }
  }
});

// ログインルートを追加
router.post('/login', async (req, res) => {
    const usersCollection = await getDBCollection('users');
    const { email, password } = req.body;
  
    try {
      // メールアドレスでユーザーを検索
      const user = await usersCollection.findOne({ email });
      const secretKey = process.env.SECRET_KEY as string;
      if (user && await bcrypt.compare(password, user.password)) {
        // JWTトークンの生成
        const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
        res.send({ message: "Login successful", token });
      } else {
        res.status(401).send({ message: "Authentication failed" });
      }
    } catch (e) {
        if (e instanceof Error) {
            res.status(500).send(e.message);
          } else {
            res.status(500).send(String(e));
          }
    }
});

router.post('/tokenVerification', async (req, res) => {
    // トークンをリクエストボディから取得
    const { token } = req.body;
    const secretKey = process.env.SECRET_KEY;

    // トークンまたは秘密鍵が提供されていない場合は、エラーを返す
    if (!token || !secretKey) {
      return res.status(401).send({ message: "Token or secret key is required" });
    }

    try {
      // トークンの検証
      const decoded = jwt.verify(token, secretKey) as { userId: string };
      // decoded.userId には、トークン発行時に指定した userId が含まれています

      // データベースからユーザー情報を検索
      const usersCollection = await getDBCollection('users');
      const user = await usersCollection.findOne({ _id: new ObjectId(decoded.userId) });

      if (!user) {
        // ユーザーが見つからない場合は、エラーを返す
        return res.status(404).send({ message: "User not found" });
      }

      // トークンが有効で、ユーザーも見つかった場合は、成功レスポンスを返す
      return res.status(200).send({ message: "Token is valid", user: { id: user._id, name: user.name } });

    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        // トークンが無効な場合は、エラーメッセージを返す
        return res.status(401).send({ message: "Invalid token" });
      } else {
        // その他のエラーの場合
        console.error(error);
        return res.status(500).send({ message: "An error occurred during token verification" });
      }
    }
});

export default router;
