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
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { cardVariants } from "@/hooks/Motion-Variants";
import { AnimatePresence, motion } from "framer-motion";
import { Copy, Shield } from "lucide-react";

import React, { useState } from "react";
import { toast } from "react-toastify";

const PasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState([12]);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePassword = async () => {
    setIsGenerating(true);

    // Simulate generation time
    await new Promise((resolve) => setTimeout(resolve, 500));

    let charset = "";
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    let result = "";
    for (let i = 0; i < length[0]; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(result);
    setIsGenerating(false);
    toast("Password generated!");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    toast("Password copied to clipboard!");
  };

  return (
    <motion.div variants={cardVariants} initial="hidden" animate="visible">
      <Card className="border-2 hover:border-primary/20 transition-colors duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <Shield className="h-5 w-5" />
            </motion.div>
            Password Generator
          </CardTitle>
          <CardDescription>
            Generate secure passwords with custom rules
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Length: {length[0]}</Label>
              <Slider
                value={length}
                onValueChange={setLength}
                max={50}
                min={4}
                step={1}
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  id: "uppercase",
                  label: "Uppercase",
                  checked: includeUppercase,
                  onChange: setIncludeUppercase,
                },
                {
                  id: "lowercase",
                  label: "Lowercase",
                  checked: includeLowercase,
                  onChange: setIncludeLowercase,
                },
                {
                  id: "numbers",
                  label: "Numbers",
                  checked: includeNumbers,
                  onChange: setIncludeNumbers,
                },
                {
                  id: "symbols",
                  label: "Symbols",
                  checked: includeSymbols,
                  onChange: setIncludeSymbols,
                },
              ].map((option, index) => (
                <motion.div
                  key={option.id}
                  className="flex items-center space-x-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Switch
                    id={option.id}
                    checked={option.checked}
                    onCheckedChange={option.onChange}
                  />
                  <Label htmlFor={option.id}>{option.label}</Label>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={generatePassword}
              className="w-full relative overflow-hidden"
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
                      <Shield className="h-4 w-4" />
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
                    Generate Password
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>

          <AnimatePresence>
            {password && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-2"
              >
                <Label>Generated Password</Label>
                <div className="flex gap-2">
                  <Input
                    value={password}
                    readOnly
                    className="font-mono bg-muted/50 text-center tracking-wider"
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

export default PasswordGenerator;
