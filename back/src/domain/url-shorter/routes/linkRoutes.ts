import express from "express";
import { asyncHandler } from "../../../shared/utils/asyncHandler";
import {
  createShortLink,
  redirectToOriginalUrl,
  unshortenUrlHybrid,
} from "../controllers/linkControllers";

const router = express.Router();

router.post("/shorter", asyncHandler(createShortLink));

router.get("/shorter/:slug", asyncHandler(redirectToOriginalUrl));
router.post("/unshorten", asyncHandler(unshortenUrlHybrid));
export default router;
