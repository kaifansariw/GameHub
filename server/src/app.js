import express from "express";
import cors from "cors";

const app = express();

app.use(
    cors({
        origin:[
         "http://localhost:5173",
         "https://game-hub-jade-three.vercel.app"

        ],
        credentials: true
    })
);

app.use(express.json());

app.get("/", (req , res) => {
   res.json({
     message: "GameHub API is Running"
   });

});

export default app;