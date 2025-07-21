import { Request, Response } from "express";
import { generateQRCode } from "../services/qr-generatorServices";

export const generateQR = async (req: Request, res: Response) => {
  const { text } = req.body;

  if (!text || typeof text !== "string") {
    return res.status(400).json({ error: "Invalid or missing 'text' field" });
  }

  try {
    const qrDataUrl = await generateQRCode(text);
    return res.status(200).json({ dataUrl: qrDataUrl });
  } catch (error) {
    console.error("QR Controller Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
