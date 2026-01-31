/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
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
  VenetianMaskIcon,
  Regex,
  FileJson2Icon,
  PersonStandingIcon,
  Braces,
  Eye,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { pageTransition, pageVariants } from "@/hooks/Motion-Variants";

// Tool components
import LinkShortener from "./components/LinkShorter";
import PasswordGenerator from "./components/PasswordGenerator";
import QRGenerator from "./components/QRGenerator";
import CreditCardGenerator from "./components/CreditCardGenerator";
import EncoderDecoder from "./components/EncoderDecoder";
import ExternalLinkUnshortener from "./components/ExternalLinkUnshortener";
import ColorPaletteGenerator from "./components/ColorPaletteGenerator";
import JWTToolkit from "./components/JWTToolKit";
import JSONFormatterValidator from "./components/JsonValidator";
import FakeDataGenerator from "./components/FakeDataGenerator";
import YamlJsonConverter from "./components/YamlJsonConverter";
import UrlValidator from "./components/UrlValidator";
import { toolCategories } from "@/data/toolCategories";

const toolComponents: Record<string, any> = {
  "link-shortener": LinkShortener,
  "password-generator": PasswordGenerator,
  "link-unshortener": ExternalLinkUnshortener,
  "qr-generator": QRGenerator,
  "encoder-decoder": EncoderDecoder,
  "color-palette-generator": ColorPaletteGenerator,
  "credit-card": CreditCardGenerator,
  "jwt-tool": JWTToolkit,
  "json-validator": JSONFormatterValidator,
  "fake-data-generator": FakeDataGenerator,
  "yaml-json": YamlJsonConverter,
  "url-validator": UrlValidator,
};

export default function AppPage() {
  const searchParams = useSearchParams();
  const toolFromUrl = searchParams.get("tool");

  const [activeCategory, setActiveCategory] = useState(toolCategories[0].id);
  const [activeTab, setActiveTab] = useState(toolCategories[0].tools[0].id);

  useEffect(() => {
    if (toolFromUrl && toolComponents[toolFromUrl]) {
      const category = toolCategories.find((cat) =>
        cat.tools.some((t) => t.id === toolFromUrl)
      );
      if (category) {
        setActiveCategory(category.id);
        setActiveTab(toolFromUrl);
        return;
      }
    }
    const defaultTool = toolCategories.find((cat) => cat.id === activeCategory)
      ?.tools[0];
    if (defaultTool) {
      setActiveTab(defaultTool.id);
    }
  }, [activeCategory, toolFromUrl]);

  const ActiveComponent = toolComponents[activeTab];

  return (
    <main className="flex-1">
      <motion.div
        className=" bg-background/80 backdrop-blur-xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex h-16 items-center px-4">
          <motion.h1
            className="text-xl font-semibold ml-4"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Developer Tools
          </motion.h1>
        </div>
      </motion.div>

      <div className="flex-1 space-y-4 p-4 md:p-8">
        <Tabs value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList className="grid grid-cols-2 lg:h-auto h-20 sm:grid-cols-4 gap-1 p-1 mb-4 bg-muted/30 backdrop-blur-sm">
            {toolCategories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="text-xs px-2 py-1"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 lg:h-auto h-20 sm:grid-cols-3 md:grid-cols-4 gap-1 p-1 bg-muted/50 backdrop-blur-sm">
            {toolCategories
              .find((cat) => cat.id === activeCategory)
              ?.tools.map((tool, index) => (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <TabsTrigger
                    value={tool.id}
                    className="flex items-center justify-center text-xs py-2 px-2 hover:scale-105 transition-all"
                  >
                    <tool.icon className="w-4 h-4 mr-2" />
                    {tool.shortName}
                  </TabsTrigger>
                </motion.div>
              ))}
          </TabsList>

          <div className="mt-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={pageVariants}
                initial="initial"
                animate="in"
                exit="out"
                transition={pageTransition}
              >
                <ActiveComponent />
              </motion.div>
            </AnimatePresence>
          </div>
        </Tabs>
      </div>
    </main>
  );
}
