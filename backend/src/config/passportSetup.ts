// src/config/passportSetup.ts
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import User, { IUser } from '../models/user'; // IUserをインポート

passport.use(new GoogleStrategy.Strategy({
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: "/api/auth/google/callback"
},
  async (accessToken, refreshToken, profile, done) => {
    // ユーザー検索または新規作成
    const existingUser = await User.findOne({ googleId: profile.id });
    if (existingUser) {
      return done(null, existingUser);
    }
    const newUser = await new User({
      googleId: profile.id,
      name: profile.displayName,
      email: profile.emails?.[0]?.value ?? 'デフォルトメールアドレス'
    }).save();
    done(null, newUser);
}));

passport.serializeUser((user: any, done) => {
  done(null, user._id.toString()); // 型アサーションを使用しているため、型チェックを回避
});

passport.deserializeUser((id: any, done) => {
  User.findById(id).then((user: any) => {
    done(null, user); // 型アサーションを使用しているため、型チェックを回避
  });
});
