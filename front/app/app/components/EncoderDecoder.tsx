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
import { AnimatePresence, motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Code, Copy } from "lucide-react";

import { toast } from "react-toastify";
import { cardVariants } from "@/components/Motion-Variants";
const EncoderDecoder = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState("base64");
  const [operation, setOperation] = useState("encode");
  const [isProcessing, setIsProcessing] = useState(false);

  const process = async () => {
    if (!input) return;
    setIsProcessing(true);

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 300));

    let result = "";
    try {
      if (mode === "base64") {
        result = operation === "encode" ? btoa(input) : atob(input);
      } else if (mode === "rot13") {
        result = input.replace(/[a-zA-Z]/g, (char) => {
          const start = char <= "Z" ? 65 : 97;
          return String.fromCharCode(
            ((char.charCodeAt(0) - start + 13) % 26) + start,
          );
        });
      } else if (mode === "binary") {
        result =
          operation === "encode"
            ? input
                .split("")
                .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
                .join(" ")
            : input
                .split(" ")
                .map((bin) => String.fromCharCode(Number.parseInt(bin, 2)))
                .join("");
      }
      setOutput(result);
      toast(`Text ${operation}d successfully!`);
    } catch (error) {
      toast("Error processing text");
      setIsProcessing(false);
    }

    const copyToClipboard = () => {
      navigator.clipboard.writeText(output);
      toast("Copied to clipboard!");
    };

    return (
      <motion.div variants={cardVariants} initial="hidden" animate="visible">
        <Card className="border-2 hover:border-primary/20 transition-colors duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <motion.div
                animate={{ rotateY: [0, 180, 360] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                <Code className="h-5 w-5" />
              </motion.div>
              Encoder/Decoder
            </CardTitle>
            <CardDescription>
              Base64, ROT13, Binary encoding/decoding
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Format</Label>
                <Select value={mode} onValueChange={setMode}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="base64">Base64</SelectItem>
                    <SelectItem value="rot13">ROT13</SelectItem>
                    <SelectItem value="binary">Binary</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Operation</Label>
                <Select value={operation} onValueChange={setOperation}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="encode">Encode</SelectItem>
                    <SelectItem value="decode">Decode</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Input</Label>
              <Textarea
                placeholder="Enter text to encode/decode"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="font-mono transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={process}
                className="w-full"
                disabled={isProcessing}
              >
                <AnimatePresence mode="wait">
                  {isProcessing ? (
                    <motion.div
                      key="processing"
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
                        <Code className="h-4 w-4" />
                      </motion.div>
                      Processing...
                    </motion.div>
                  ) : (
                    <motion.span
                      key="text"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {operation === "encode" ? "Encode" : "Decode"}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>

            <AnimatePresence>
              {output && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-2"
                >
                  <Label>Output</Label>
                  <div className="flex gap-2">
                    <Textarea
                      value={output}
                      readOnly
                      className="font-mono bg-muted/50"
                    />
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={copyToClipboard}
                      >
                        <Copy className="h-4 w-4" />
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
};

export default EncoderDecoder;
