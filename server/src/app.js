import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";

const app = express();

//Middleware
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
app.use(express.urlencoded({ extended: true }));   //Handles form data

app.get("/", (req , res) => {
   res.json({
     message: "GameHub API is Running",
   });

});

//Auth Routes
app.use("/api/auth", authRoutes);


export default app;