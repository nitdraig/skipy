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

import { Link, QrCode, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { cardVariants } from "@/hooks/Motion-Variants";

const QRGenerator = () => {
  const [text, setText] = useState("");
  const [qrGenerated, setQrGenerated] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateQR = async () => {
    if (!text) return;
    setIsGenerating(true);

    // Simulate generation
    await new Promise((resolve) => setTimeout(resolve, 800));

    setQrGenerated(true);
    setIsGenerating(false);
    toast("QR code generated!");
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
              placeholder="Enter text or URL to generate QR code"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={generateQR}
              className="w-full"
              disabled={isGenerating}
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
          <AnimatePresence>
            {qrGenerated && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="space-y-2"
              >
                <Label>QR Code</Label>
                <div className="flex flex-col items-center space-y-2">
                  <motion.div
                    className="w-48 h-48 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-primary/20"
                    whileHover={{ scale: 1.05 }}
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(var(--primary), 0)",
                        "0 0 0 10px rgba(var(--primary), 0.1)",
                        "0 0 0 0 rgba(var(--primary), 0)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  >
                    <QrCode className="h-32 w-32 text-muted-foreground" />
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download PNG
                    </Button>
                  </motion.div>
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
