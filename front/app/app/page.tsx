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
} from "lucide-react";
import LinkShortener from "./components/LinkShorter";
import PasswordGenerator from "./components/PasswordGenerator";
import QRGenerator from "./components/QRGenerator";

import CreditCardGenerator from "./components/CreditCardGenerator";

import { AnimatePresence, motion } from "framer-motion";

import EncoderDecoder from "./components/EncoderDecoder";
import { pageTransition, pageVariants } from "@/hooks/Motion-Variants";

const tools = [
  { id: "link-shortener", name: "Short Link Generator", icon: Link },
  //   { id: "link-unshortener", name: "Link Unshortener", icon: ExternalLink },
  { id: "password-generator", name: "Password Generator", icon: Shield },
  { id: "qr-generator", name: "QR Code Generator", icon: QrCode },
  { id: "encoder-decoder", name: "Encoder/Decoder", icon: Code },
  { id: "credit-card", name: "Credit Card Generator", icon: CreditCard },
];

export default function AppPage() {
  const [activeTab, setActiveTab] = useState("link-shortener");

  const renderTool = () => {
    const tools = {
      "link-shortener": LinkShortener,
      "password-generator": PasswordGenerator,
      "qr-generator": QRGenerator,
      "encoder-decoder": EncoderDecoder,
      "credit-card": CreditCardGenerator,
    };

    const ToolComponent: any =
      tools[activeTab as keyof typeof tools] || LinkShortener;

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
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 bg-muted/50 backdrop-blur-sm">
              {tools.map((tool, index) => (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <TabsTrigger
                    value={tool.id}
                    className="text-xs transition-all duration-200 hover:scale-105"
                  >
                    <motion.div whileHover={{ rotate: 5 }} className="mr-1">
                      <tool.icon className="h-4 w-4" />
                    </motion.div>
                    <span className="hidden sm:inline">
                      {tool.name.split(" ")[0]}
                    </span>
                  </TabsTrigger>
                </motion.div>
              ))}
            </TabsList>
            <div className="mt-6">{renderTool()}</div>
          </Tabs>
        </motion.div>
      </div>
    </main>
  );
}
