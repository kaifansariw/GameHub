import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 8000;


app.listen(PORT, () => {
    console.log(`GameHub API is running on the ${PORT}`)
});