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
import { motion } from "framer-motion";
import { toast } from "react-toastify";

import { cardVariants } from "@/hooks/Motion-Variants";
import { Copy, EyeIcon } from "lucide-react";

const lighten = (hex: string, amount: number) => {
  let col = hex.replace("#", "");
  if (col.length === 3) {
    col = col[0] + col[0] + col[1] + col[1] + col[2] + col[2];
  }
  const num = parseInt(col, 16);
  let r = (num >> 16) + amount;
  let g = ((num >> 8) & 0x00ff) + amount;
  let b = (num & 0x0000ff) + amount;
  r = Math.min(255, Math.max(0, r));
  g = Math.min(255, Math.max(0, g));
  b = Math.min(255, Math.max(0, b));
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

const ColorBox = ({ label, color }: { label: string; color: string }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(color);
    toast.success(`${label} color copied: ${color}`);
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <div
        className="w-32 h-32 rounded-lg border"
        style={{ backgroundColor: color }}
      ></div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{label}</span>
        <Button size="icon" variant="ghost" onClick={handleCopy}>
          <Copy className="w-4 h-4" />
        </Button>
      </div>
      <span className="text-sm text-muted-foreground">{color}</span>
    </div>
  );
};

const ColorPaletteGenerator = () => {
  const [baseColor, setBaseColor] = useState("#5f5cf3");

  const palette = {
    dominant: baseColor,
    secondary: lighten(baseColor, -30),
    accent: lighten(baseColor, 50),
  };

  return (
    <motion.div variants={cardVariants} initial="hidden" animate="visible">
      <Card className="border-2 hover:border-primary/20 transition-colors duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {" "}
            <motion.div
              animate={{ rotate: [0, 90, 180, 270, 360] }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              <EyeIcon className="h-5 w-5" />
            </motion.div>
            Color Palette Generator
          </CardTitle>
          <CardDescription>
            Generates a palette with rule 60/30/10 based on a base color
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Label htmlFor="color-picker">Base color:</Label>
            <input
              type="color"
              id="color-picker"
              value={baseColor}
              onChange={(e) => setBaseColor(e.target.value)}
              className="w-12 h-12 border rounded-md cursor-pointer"
            />
            <span className="text-muted-foreground">{baseColor}</span>
          </div>

          <div className="flex flex-col md:flex-row justify-center gap-6">
            <ColorBox label="60% Dominant" color={palette.dominant} />
            <ColorBox label="30% Secondary" color={palette.secondary} />
            <ColorBox label="10% Accent" color={palette.accent} />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ColorPaletteGenerator;
