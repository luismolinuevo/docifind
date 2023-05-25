import express from "express";
import morgan from "morgan";
import cors from "cors";


const app = express();
app.use(express.json());

app.use(cors());
app.use(morgan("tiny"));


app.listen(3001, () => {
    console.log("Server is up");
})