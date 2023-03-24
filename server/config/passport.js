import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import {
  DEV_API,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  MODE,
  PROD_API,
} from "../utils/env.js";
import { loginController } from "../controllers/index.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `${
        MODE === "dev" ? DEV_API : PROD_API
      }/api/auth/google/callback`,
    },
    function (accessToken, refreshToken, profile, cb) {
      const {
        given_name: firstName,
        family_name: lastName,
        email,
        picture: avatar,
      } = profile?._json;
      loginController.oAuthLogin(firstName, lastName, email, cb, avatar);
    }
  )
);

export default passport;
