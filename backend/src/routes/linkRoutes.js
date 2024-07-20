import express from "express";
import {
  createShortLink,
  redirectToOriginalUrl,
} from "../controllers/linkController.js";

const router = express.Router();

router.post("/api/shorter", createShortLink);

router.get("/api/shorter/:slug", redirectToOriginalUrl);

export default router;
