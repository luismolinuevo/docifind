import express from "express";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import prisma from "../db/index.js";
import dotenv from "dotenv";
import passport from "passport";
import googlePassport from "../auth/GoogleLogin.js";
dotenv.config()

const router = express.Router();


// Post | create sign up route
router.post("/signup", async (req, res) => {
  try {
    const foundUser = await prisma.user.findFirst({
      where: {
        userName: req.body.userName,
      },
    });
    if (foundUser) {
      res.status(401).json({
        success: false,
        message: "User already exist",
      });
    } else {
      // hashing password
      try {
        const hashPassword = await argon2.hash(req.body.password);
        const newUser = await prisma.user.create({
          data: {
            userName: req.body.userName,
            email: req.body.email,
            password: hashPassword,
          },
        });

        if (newUser) {
          res.status(201).json({
            success: true,
            message: "User successfully created",
          });
        } else {
          res.status(500).json({
            success: false,
            message: "User was not created. Please create a account",
          });
        }
      } catch (error) {
        console.log(error)
        res.status(500).json({
          success: false,
          message: "User was not created. Something happened",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});



// Post | create login route
router.post("/login", async (req, res) => {
  try {
    const foundUser = await prisma.user.findFirst({
      where: {
        userName: req.body.userName,
      },
    });

    if (foundUser) {
      try {
        const verifyPassword = await argon2.verify(
          foundUser.password,
          req.body.password
        );

        if (verifyPassword === true) {
          const token = jwt.sign(
            {
              id: foundUser.id,
              userName: foundUser.userName,
              email: foundUser.email,
            },
            process.env.JSON_KEY
          );

          res.status(200).json({
            success: true,
            token: token,
          });
        } else {
          res.status(401).json({
            success: false,
            message: "Incorrect userName or password",
          });
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({
          success: false,
          message: "Something went wrong",
        });
      }
    } else {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});



// Get | Shows current logged in 
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.status(200).json({
      success: true,
      data: req.user,
    });    
  }
);

// Signup with Google auth
router.get('/google', passport.authenticate('google', { session: false, scope: ['profile', 'email'] }));

// Google OAuth callback route
// router.get(
//   '/google/callback',
//   passport.authenticate('google', { session: false, failureRedirect: '/' }),
//   (req, res) => {
//     // Redirect user after successful authentication
//     const token = req.user; // req.user now contains the JWT token
//     // res.redirect(`/dashboard?token=${token}`);  //this url with be where I want it to go after I login
//     res.json({token: token}).redirect("http://localhost:5173/")
    
//   }
// );
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/' }),
  (req, res) => {
    // Redirect user after successful authentication
    const token = req.user; // req.user now contains the JWT token
    // res.json({ token: token }); // Send the token in the JSON response
    // res.cookie('token', token, { httpOnly: true });
    // res.redirect(`http://localhost:5173`);
    res.redirect(`http://localhost:5173?token=${token}`);
  }
);



export default router;