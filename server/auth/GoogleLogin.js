// passport-config.js
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import jwt from "jsonwebtoken";
import prisma from "../db/index.js";
import dotenv from "dotenv";

dotenv.config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const JSON_KEY = process.env.JSON_KEY;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3001/auth/google/callback", //put the callback here worked. i called /google
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log(profile);
        // Find or create the user in the database
        const user = await prisma.user.upsert({
          where: { email: profile.emails[0].value },
          update: {},
          create: { email: profile.emails[0].value, fullName: profile.displayName, userName: profile.emails[0].value },
        });

        console.log(user);

        // Create a JWT token and send it in the done function
        const token = jwt.sign({ userId: user.id, email: user.email, fullName: user.fullName }, JSON_KEY);
        return done(null, token);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Remove passport.serializeUser and passport.deserializeUser

export default passport;

// // passport-config.js
// import passport from "passport";
// import { Strategy as GoogleStrategy } from "passport-google-oauth20";
// import jwt from "jsonwebtoken";
// import prisma from "../db/index.js";
// import dotenv from "dotenv";

// dotenv.config();

// const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
// const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
// const JSON_KEY = process.env.JSON_KEY;

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: GOOGLE_CLIENT_ID,
//       clientSecret: GOOGLE_CLIENT_SECRET,
//       callbackURL: "http://localhost:3000/auth/google",
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         console.log(profile);
//         // Find or create the user in the database
//         const user = await prisma.user.upsert({
//           where: { email: profile.emails[0].value },
//           update: {},
//           create: { email: profile.emails[0].value, fullName: profile.displayName },
//         });

//         console.log(user);
//         return done(null, user);
//       } catch (error) {
//         return done(error);
//       }
//     }
//   )
// );

// passport.serializeUser((user, done) => {
//   // Serialize the user ID into the JWT token
//   const token = jwt.sign({ userId: user.id }, JSON_KEY);
//   done(null, token);
// });

// passport.deserializeUser((token, done) => {
//   try {
//     // Deserialize the user from the JWT token and fetch from the database
//     const decoded = jwt.verify(token, JSON_KEY);
//     const user = prisma.user.findUnique({ where: { id: decoded.userId } });
//     done(null, user);
//   } catch (error) {
//     done(error);
//   }
// });

// export default passport;
