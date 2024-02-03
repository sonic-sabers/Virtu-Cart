import express from "express";
import { update,getUser } from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.put("/:id", verifyToken, update);

router.get("/:id", verifyToken, getUser);

/*router.get("/all/users", getAllUsers); */

export default router;
