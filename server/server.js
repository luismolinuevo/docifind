import express from "express";
import morgan from "morgan";
import cors from "cors";
import setupJWTStrategy from "./auth/index.js";
import passport from "passport";
import authRouter from "./routes/auth.js";
import clinicRouter from "./routes/clinic.js";
import doctorRouter from "./routes/doctor.js";
import reviewRouter from "./routes/review.js";
import dotenv from "dotenv";
dotenv.config()

const PORT = process.env.PORT

const app = express();
app.use(express.json());

app.use(
    cors({
      origin: 'http://localhost:5173', // Replace this with the actual origin of your frontend
      credentials: true, // Enable sending cookies with the CORS request if needed
    })
  );
app.use(morgan("tiny"));

setupJWTStrategy(passport);

app.use("/auth", authRouter);
app.use("/clinic", clinicRouter);
app.use ("/doctor", doctorRouter);
app.use ("/review", reviewRouter);

app.listen(PORT || 3000, () => {
    console.log("Server is up" + PORT);
});