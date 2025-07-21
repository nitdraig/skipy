import QRCode from "qrcode";

export const generateQRCode = async (text: string): Promise<string> => {
  try {
    return await QRCode.toDataURL(text, {
      margin: 2,
      width: 400,
    });
  } catch (error) {
    throw new Error("QR generation failed");
  }
};
