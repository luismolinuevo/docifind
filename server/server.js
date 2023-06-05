import express from "express";
import morgan from "morgan";
import cors from "cors";
import setupJWTStrategy from "./auth/index.js";
import passport from "passport";
import authRouter from "./routes/auth.js";
import clinicRouter from "./routes/clinic.js";
import doctorRouter from "./routes/doctor.js";
import reviewRouter from "./routes/review.js";
const app = express();
app.use(express.json());

app.use(cors());
app.use(morgan("tiny"));

setupJWTStrategy(passport);

app.use("/auth", authRouter);
app.use("/clinic", clinicRouter);
app.use ("/doctor", doctorRouter);
app.use ("/review", reviewRouter);

app.listen(3001, () => {
    console.log("Server is up");
})