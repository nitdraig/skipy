"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CreditCard } from "lucide-react";

import { toast } from "react-toastify";
import { cardVariants } from "@/components/Motion-Variants";
const CreditCardGenerator = () => {
  const [cardType, setCardType] = useState("visa");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const generateCard = async () => {
    setIsGenerating(true);

    // Simulate generation
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Generate fake card data for testing
    const visaPrefix = "4";
    const mastercardPrefix = "5";
    const amexPrefix = "3";

    let number = "";
    if (cardType === "visa") {
      number = visaPrefix + Math.random().toString().slice(2, 17);
    } else if (cardType === "mastercard") {
      number = mastercardPrefix + Math.random().toString().slice(2, 17);
    } else {
      number = amexPrefix + Math.random().toString().slice(2, 16);
    }

    const expiry = `${String(Math.floor(Math.random() * 12) + 1).padStart(
      2,
      "0",
    )}/${String(
      new Date().getFullYear() + Math.floor(Math.random() * 5) + 1,
    ).slice(-2)}`;
    const cvvCode = Math.floor(Math.random() * 900) + 100;

    setCardNumber(number.replace(/(.{4})/g, "$1 ").trim());
    setExpiryDate(expiry);
    setCvv(cvvCode.toString());
    setIsGenerating(false);

    toast("Test card generated!");
  };

  return (
    <motion.div variants={cardVariants} initial="hidden" animate="visible">
      <Card className="border-2 hover:border-primary/20 transition-colors duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <motion.div
              animate={{ rotateY: [0, 180, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <CreditCard className="h-5 w-5" />
            </motion.div>
            Credit Card Generator
          </CardTitle>
          <CardDescription>
            Generate test credit card numbers for development
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Card Type</Label>
            <Select value={cardType} onValueChange={setCardType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="visa">Visa</SelectItem>
                <SelectItem value="mastercard">Mastercard</SelectItem>
                <SelectItem value="amex">American Express</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={generateCard}
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
                      <CreditCard className="h-4 w-4" />
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
                    Generate Test Card
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>

          <AnimatePresence>
            {cardNumber && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="space-y-4"
              >
                <motion.div
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(239, 68, 68, 0.4)",
                      "0 0 0 10px rgba(239, 68, 68, 0)",
                    ],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                >
                  <Badge
                    variant="destructive"
                    className="w-full justify-center"
                  >
                    For Testing Only - Not Real Card Data
                  </Badge>
                </motion.div>

                <div className="grid grid-cols-1 gap-4">
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Label>Card Number</Label>
                    <Input
                      value={cardNumber}
                      readOnly
                      className="font-mono bg-muted/50 text-center tracking-widest text-lg"
                    />
                  </motion.div>
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Label>Expiry Date</Label>
                      <Input
                        value={expiryDate}
                        readOnly
                        className="font-mono bg-muted/50 text-center"
                      />
                    </motion.div>
                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Label>CVV</Label>
                      <Input
                        value={cvv}
                        readOnly
                        className="font-mono bg-muted/50 text-center"
                      />
                    </motion.div>
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

export default CreditCardGenerator;
