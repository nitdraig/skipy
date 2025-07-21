"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { QrCode, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { cardVariants } from "@/hooks/Motion-Variants";

const QRGenerator = () => {
  const [text, setText] = useState("");
  const [qrGenerated, setQrGenerated] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState("");

  const normalizeUrl = (input: string): string => {
    const trimmedInput = input.trim();

    if (
      trimmedInput.includes(".") &&
      !trimmedInput.startsWith("http://") &&
      !trimmedInput.startsWith("https://") &&
      !trimmedInput.includes(" ") &&
      (trimmedInput.includes(".com") ||
        trimmedInput.includes(".org") ||
        trimmedInput.includes(".net") ||
        trimmedInput.includes(".edu") ||
        trimmedInput.includes(".gov") ||
        trimmedInput.match(/\.[a-z]{2,4}$/i))
    ) {
      return `https://${trimmedInput}`;
    }

    return trimmedInput;
  };

  const generateQR = async () => {
    if (!text.trim()) {
      toast.error("Please enter text or URL");
      return;
    }

    setIsGenerating(true);

    try {
      const processedText = normalizeUrl(text);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/qr-generator`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: processedText }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to generate QR code");
      }

      const data = await response.json();
      setQrDataUrl(data.dataUrl);
      setQrGenerated(true);
      toast.success("QR code generated successfully!");
    } catch (error) {
      console.error("Error generating QR code:", error);
      toast.error("Failed to generate QR code");
    } finally {
      setIsGenerating(false);
    }
  };

  const generateFileName = (input: string): string => {
    const processedText = normalizeUrl(input.trim());

    try {
      if (
        processedText.startsWith("http://") ||
        processedText.startsWith("https://")
      ) {
        const url = new URL(processedText);
        let domain = url.hostname.replace("www.", "");

        if (url.pathname && url.pathname !== "/") {
          const path = url.pathname
            .replace(/[^a-zA-Z0-9-_]/g, "-")
            .substring(0, 20);
          domain += path;
        }

        return `qr-${domain.replace(/[^a-zA-Z0-9-_]/g, "-")}.png`;
      }

      const cleanText = processedText
        .replace(/[^a-zA-Z0-9\s]/g, "")
        .trim()
        .split(/\s+/)
        .slice(0, 3)
        .join("-")
        .toLowerCase()
        .substring(0, 30);

      return cleanText ? `qr-${cleanText}.png` : "qr-code.png";
    } catch (error) {
      return "qr-code.png";
    }
  };

  const downloadQR = async () => {
    if (!qrDataUrl) return;

    try {
      const fileName = generateFileName(text);

      const img = new Image();
      img.crossOrigin = "anonymous";

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = img.width;
        canvas.height = img.height;

        // Fondo blanco
        if (ctx) {
          ctx.fillStyle = "white";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);

          // Convertir a blob y descargar
          canvas.toBlob((blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = fileName;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
              toast.success(`QR code downloaded as ${fileName}`);
            }
          }, "image/png");
        }
      };

      img.src = qrDataUrl;
    } catch (error) {
      console.error("Error downloading QR code:", error);
      toast.error("Failed to download QR code");
    }
  };

  const resetGenerator = () => {
    setText("");
    setQrGenerated(false);
    setQrDataUrl("");
  };

  return (
    <motion.div variants={cardVariants} initial="hidden" animate="visible">
      <Card className="border-2 hover:border-primary/20 transition-colors duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: [0, 90, 180, 270, 360] }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              <QrCode className="h-5 w-5" />
            </motion.div>
            QR Code Generator
          </CardTitle>
          <CardDescription>
            Create QR codes for text, URLs, and data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="qr-text">Text or URL</Label>
            <Textarea
              id="qr-text"
              placeholder="Enter text, URL, or any data to generate QR code"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              rows={3}
            />
          </div>

          <div className="flex gap-2">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1"
            >
              <Button
                onClick={generateQR}
                className="w-full"
                disabled={isGenerating || !text.trim()}
              >
                <AnimatePresence mode="wait">
                  {isGenerating ? (
                    <motion.div
                      key="generating"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        }}
                      >
                        <QrCode className="h-4 w-4" />
                      </motion.div>
                      Generating...
                    </motion.div>
                  ) : (
                    <motion.span
                      key="text"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      Generate QR Code
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>

            {qrGenerated && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
              >
                <Button onClick={resetGenerator} variant="outline">
                  Reset
                </Button>
              </motion.div>
            )}
          </div>

          <AnimatePresence>
            {qrGenerated && qrDataUrl && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="space-y-4"
              >
                <Label>Generated QR Code</Label>
                <div className="flex flex-col items-center space-y-4">
                  <motion.div
                    className="p-4 bg-white rounded-lg shadow-lg border"
                    whileHover={{ scale: 1.02 }}
                    animate={{
                      boxShadow: [
                        "0 4px 20px rgba(0,0,0,0.1)",
                        "0 8px 30px rgba(0,0,0,0.15)",
                        "0 4px 20px rgba(0,0,0,0.1)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  >
                    <img
                      src={qrDataUrl}
                      alt="Generated QR Code"
                      className="w-48 h-48 object-contain"
                      style={{ imageRendering: "pixelated" }}
                    />
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button variant="outline" size="sm" onClick={downloadQR}>
                      <Download className="h-4 w-4 mr-2" />
                      Download PNG
                    </Button>
                  </motion.div>

                  {/* Mostrar el texto/URL que se codificó */}
                  <div className="text-center max-w-md">
                    <p className="text-sm text-muted-foreground break-all">
                      <strong>Encoded:</strong> {normalizeUrl(text)}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default QRGenerator;
