/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toolCategories } from "@/data/toolCategories";

function ToolLoading() {
  return (
    <div
      className="flex min-h-[220px] items-center justify-center rounded-lg border border-dashed border-muted/60 bg-muted/20 text-sm text-muted-foreground"
      aria-busy="true"
      aria-live="polite"
    >
      Loading tool…
    </div>
  );
}

const dyn = (loader: () => Promise<{ default: ComponentType<object> }>) =>
  dynamic(loader, {
    loading: () => <ToolLoading />,
    ssr: true,
  });

const toolComponents: Record<string, ComponentType<object>> = {
  "link-shortener": dyn(() => import("./components/LinkShorter")),
  "password-generator": dyn(() => import("./components/PasswordGenerator")),
  "link-unshortener": dyn(() => import("./components/ExternalLinkUnshortener")),
  "qr-generator": dyn(() => import("./components/QRGenerator")),
  "encoder-decoder": dyn(() => import("./components/EncoderDecoder")),
  "color-palette-generator": dyn(() => import("./components/ColorPaletteGenerator")),
  "credit-card": dyn(() => import("./components/CreditCardGenerator")),
  "jwt-tool": dyn(() => import("./components/JWTToolKit")),
  "json-validator": dyn(() => import("./components/JsonValidator")),
  "fake-data-generator": dyn(() => import("./components/FakeDataGenerator")),
  "yaml-json": dyn(() => import("./components/YamlJsonConverter")),
  "url-validator": dyn(() => import("./components/UrlValidator")),
};

export default function AppPage() {
  const searchParams = useSearchParams();
  const toolFromUrl = searchParams.get("tool");

  const [activeCategory, setActiveCategory] = useState(toolCategories[0].id);
  const [activeTab, setActiveTab] = useState(toolCategories[0].tools[0].id);

  useEffect(() => {
    if (!toolFromUrl || !toolComponents[toolFromUrl]) return;
    const category = toolCategories.find((cat) =>
      cat.tools.some((t) => t.id === toolFromUrl)
    );
    if (category) {
      setActiveCategory(category.id);
      setActiveTab(toolFromUrl);
    }
  }, [toolFromUrl]);

  useEffect(() => {
    const toolsInCategory =
      toolCategories.find((c) => c.id === activeCategory)?.tools ?? [];
    const tabStillValid = toolsInCategory.some((t) => t.id === activeTab);
    if (!tabStillValid && toolsInCategory.length > 0) {
      setActiveTab(toolsInCategory[0].id);
    }
  }, [activeCategory, activeTab]);

  const ActiveComponent = toolComponents[activeTab];

  return (
    <main className="flex-1">
      <div className="border-b bg-background/90 md:bg-background/80 md:backdrop-blur-xl">
        <div className="flex h-16 items-center px-4">
          <h1 className="ml-4 text-xl font-semibold tracking-tight">
            Developer Tools
          </h1>
        </div>
      </div>

      <div className="flex-1 space-y-4 p-4 md:p-8">
        <Tabs value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList className="mb-4 grid h-20 grid-cols-2 gap-1 bg-muted/30 p-1 sm:grid-cols-4 md:backdrop-blur-sm lg:h-auto">
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
          <TabsList className="grid h-auto min-h-[5rem] grid-cols-2 gap-1 bg-muted/40 p-1 sm:grid-cols-3 md:grid-cols-4 md:bg-muted/50 md:backdrop-blur-sm lg:h-auto">
            {toolCategories
              .find((cat) => cat.id === activeCategory)
              ?.tools.map((tool) => (
                <TabsTrigger
                  key={tool.id}
                  value={tool.id}
                  className="flex items-center justify-center gap-2 px-2 py-2 text-xs transition-colors active:bg-accent/80 md:hover:bg-accent/60"
                >
                  <tool.icon className="h-4 w-4 shrink-0" />
                  {tool.shortName}
                </TabsTrigger>
              ))}
          </TabsList>

          <div key={activeTab} className="mt-6">
            <ActiveComponent />
          </div>
        </Tabs>
      </div>
    </main>
  );
}
