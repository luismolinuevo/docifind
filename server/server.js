import express from "express";
import morgan from "morgan";
import cors from "cors";
import setupJWTStrategy from "./auth/index.js";
import passport from "passport";


const app = express();
app.use(express.json());

app.use(cors());
app.use(morgan("tiny"));

setupJWTStrategy(passport);

app.listen(3001, () => {
    console.log("Server is up");
})