import express from "express";
import {
  ServiceSold,
  create,
  deleteService,
  getBestService,
  getNewServices,
  getServiceByPrice,
  getServiceByRating,
  geta,
  getall,
} from "../controllers/services.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.delete("/:id", verifyToken, deleteService);

router.get("/:id", geta);

router.get("/price/service", getServiceByPrice);

router.get("/rating/service", getServiceByRating);

router.get("/all/services", getall);

router.post("/", create);

router.get("/best/service", getBestService);

router.get("/new/services", getNewServices);

router.post("/sell", ServiceSold);

export default router;
