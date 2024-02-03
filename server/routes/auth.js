import express from "express";
import { forgotPassword, logout, signin, signup } from "../controllers/auth.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/signin", signin);

router.post("/forgotpassword", forgotPassword);

router.post("/logout", logout);

export default router;