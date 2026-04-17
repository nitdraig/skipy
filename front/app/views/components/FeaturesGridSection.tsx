import React from "react";
import NextLink from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toolCategories } from "@/data/toolCategories";

const FeaturesGridSection = () => {
  const tools = toolCategories.flatMap((category) => category.tools);

  return (
    <section id="features" className="container py-8 md:py-12 lg:py-24">
      <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
        <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl">
          Developer Tools
        </h2>
        <p className="max-w-[600px] text-lg text-muted-foreground">
          Essential utilities for your daily development workflow
        </p>
      </div>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <div key={tool.id} className="h-full min-h-[180px]">
            <NextLink href={`/app?tool=${tool.id}`} className="block h-full">
              <Card className="group relative flex h-full cursor-pointer flex-col overflow-hidden border-2 transition-colors duration-200 hover:border-primary/20">
                <CardHeader className="flex flex-1 flex-col">
                  <div className="flex items-center gap-2">
                    <div className="flex-shrink-0 rounded-lg bg-primary/10 p-2 transition-colors duration-200 group-hover:bg-primary/20">
                      <tool.icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg leading-tight">
                      {tool.name}
                    </CardTitle>
                  </div>
                  <CardDescription className="mt-2 flex-1">
                    {tool.description}
                  </CardDescription>
                </CardHeader>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
              </Card>
            </NextLink>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesGridSection;
