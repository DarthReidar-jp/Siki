import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import User from '../models/user';

passport.use(new GoogleStrategy.Strategy({
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: process.env.GOOGLE_CALLBACKURL,
},
  async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({ googleId: profile.id });
    if (existingUser) {
      return done(null, existingUser);
    }
    if (!profile.emails || !profile.emails[0]?.value) {
      return done(new Error('No email associated with this account'));
    }

    const newUser = await new User({
      googleId: profile.id,
      name: profile.displayName,
      email: profile.emails[0].value
    }).save();

    done(null, newUser);
}));

passport.serializeUser((user: any, done) => {
  done(null, user._id.toString()); 
});

passport.deserializeUser((id: any, done) => {
  User.findById(id).then((user: any) => {
    done(null, user); 
  });
});
