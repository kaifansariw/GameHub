import express from "express";
import { register , login } from "../controllers/authController.js";

//create mini application for the routes
const router = express.Router();

router.post("/register/", register);
router.post("/login/", login);

export default router;