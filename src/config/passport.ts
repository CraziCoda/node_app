import passport from "passport";
import { Strategy } from "passport-local";
import User from "./db";

const LocalStrategy = Strategy;

export default (passport: passport.PassportStatic) => {
  passport.use(
    new LocalStrategy((user, password, done) => {
      User.findOne({ username: user }, (err: NativeError, result) => {
        if (err) return done(err, null);

        if (result?.password == password)
          return done(null, { name: result?.username });

        done(null, false);
      });
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    console.log(user);
    done(null, user);
  });
};
