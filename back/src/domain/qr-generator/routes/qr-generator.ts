import { Router } from "express";
import { generateQR } from "../controllers/qr-generatorServices";
import { asyncHandler } from "../../../shared/utils/asyncHandler";
const router = Router();

router.post("/", asyncHandler(generateQR));

export default router;
