// src/config/passportSetup.ts
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import User from '../models/user';

passport.use(new GoogleStrategy.Strategy({
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: "/auth/google/callback"
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

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});
