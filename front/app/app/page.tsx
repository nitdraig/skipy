"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Link,
  ExternalLink,
  Shield,
  QrCode,
  Code,
  CreditCard,
  Unlink,
  Palette,
} from "lucide-react";
import LinkShortener from "./components/LinkShorter";
import PasswordGenerator from "./components/PasswordGenerator";
import QRGenerator from "./components/QRGenerator";
import CreditCardGenerator from "./components/CreditCardGenerator";
import { AnimatePresence, motion } from "framer-motion";
import EncoderDecoder from "./components/EncoderDecoder";
import { pageTransition, pageVariants } from "@/hooks/Motion-Variants";
import ExternalLinkUnshortener from "./components/ExternalLinkUnshortener";
import ColorPaletteGenerator from "./components/ColorPaletteGenerator";

const tools = [
  {
    id: "link-shortener",
    name: "Short Link Generator",
    shortName: "Short Link",
    icon: Link,
  },
  {
    id: "link-unshortener",
    name: "Link Unshortener",
    shortName: "Unshorten",
    icon: Unlink,
  },
  {
    id: "password-generator",
    name: "Password Generator",
    shortName: "Password",
    icon: Shield,
  },
  {
    id: "qr-generator",
    name: "QR Code Generator",
    shortName: "QR Code",
    icon: QrCode,
  },
  {
    id: "encoder-decoder",
    name: "Encoder/Decoder",
    shortName: "Encoder",
    icon: Code,
  },
  {
    id: "credit-card",
    name: "Credit Card Generator",
    shortName: "Credit Card",
    icon: CreditCard,
  },
  {
    id: "color-palette-generator",
    name: "Color Palette Generator",
    shortName: "Color Palette",
    icon: Palette,
  },
];

export default function AppPage() {
  const [activeTab, setActiveTab] = useState("link-shortener");

  const renderTool = () => {
    const toolComponents = {
      "link-shortener": LinkShortener,
      "password-generator": PasswordGenerator,
      "link-unshortener": ExternalLinkUnshortener,
      "qr-generator": QRGenerator,
      "encoder-decoder": EncoderDecoder,
      "color-palette-generator": ColorPaletteGenerator,
      "credit-card": CreditCardGenerator,
    };

    const ToolComponent: any =
      toolComponents[activeTab as keyof typeof toolComponents] || LinkShortener;

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          variants={pageVariants}
          initial="initial"
          animate="in"
          exit="out"
          transition={pageTransition}
        >
          <ToolComponent />
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <main className="flex-1">
      <motion.div
        className="border-b bg-background/80 backdrop-blur-xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex h-16 items-center px-4">
          <div className="ml-4">
            <motion.h1
              className="text-xl font-semibold"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              Developer Tools
            </motion.h1>
          </div>
        </div>
      </motion.div>

      <div className="flex-1 space-y-4 p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            {/* Versión móvil - 2 filas */}
            <TabsList className="grid h-auto w-full grid-cols-2 grid-rows-3 gap-1 p-1 bg-muted/50 backdrop-blur-sm sm:hidden">
              {tools.map((tool, index) => (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <TabsTrigger
                    value={tool.id}
                    className="flex flex-col items-center justify-center h-16 text-xs transition-all duration-200 hover:scale-105 w-full"
                  >
                    <motion.div whileHover={{ rotate: 5 }} className="mb-1">
                      <tool.icon className="h-5 w-5" />
                    </motion.div>
                    <span className="text-[10px] leading-tight text-center">
                      {tool.shortName}
                    </span>
                  </TabsTrigger>
                </motion.div>
              ))}
            </TabsList>

            {/* Versión tablet - 3 columnas */}
            <TabsList className="hidden sm:grid lg:hidden h-auto w-full grid-cols-3 grid-rows-2 gap-1 p-1 bg-muted/50 backdrop-blur-sm">
              {tools.map((tool, index) => (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <TabsTrigger
                    value={tool.id}
                    className="flex items-center justify-center h-16 text-xs transition-all duration-200 hover:scale-105 px-2"
                  >
                    <motion.div whileHover={{ rotate: 5 }} className="mr-2">
                      <tool.icon className="h-4 w-4" />
                    </motion.div>
                    <span className="text-xs leading-tight text-center">
                      {tool.shortName}
                    </span>
                  </TabsTrigger>
                </motion.div>
              ))}
            </TabsList>

            {/* Versión desktop - 6 columnas */}
            <TabsList className="hidden lg:grid h-20 w-full grid-cols-4 gap-1 p-1 bg-muted/50 backdrop-blur-sm">
              {tools.map((tool, index) => (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <TabsTrigger
                    value={tool.id}
                    className="flex items-center justify-center h-full text-sm transition-all duration-200 hover:scale-105 px-2"
                  >
                    <motion.div whileHover={{ rotate: 5 }} className="mr-2">
                      <tool.icon className="h-4 w-4" />
                    </motion.div>
                    <span className="hidden xl:inline text-xs">
                      {tool.name}
                    </span>
                    <span className="xl:hidden text-xs">{tool.shortName}</span>
                  </TabsTrigger>
                </motion.div>
              ))}
            </TabsList>

            <div className="mt-4 sm:mt-6">{renderTool()}</div>
          </Tabs>
        </motion.div>
      </div>
    </main>
  );
}
