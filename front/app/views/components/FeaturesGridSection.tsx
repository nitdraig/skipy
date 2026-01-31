import React from "react";
import NextLink from "next/link";
import { motion } from "framer-motion";
import {
  cardHoverVariants,
  containerVariants,
  itemVariants,
} from "@/hooks/Motion-Variants";
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
      <motion.div
        className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl">
          Developer Tools
        </h2>
        <p className="max-w-[600px] text-lg text-muted-foreground">
          Essential utilities for your daily development workflow
        </p>
      </motion.div>

      <motion.div
        className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {tools.map((tool, index) => (
          <motion.div
            key={tool.id}
            className="h-full min-h-[180px]"
            variants={itemVariants}
            whileHover="hover"
          >
            <NextLink href={`/app?tool=${tool.id}`} className="block h-full">
              <motion.div variants={cardHoverVariants} className="h-full">
                <Card className="relative flex h-full flex-col overflow-hidden group cursor-pointer border-2 hover:border-primary/20 transition-colors duration-300">
                  <CardHeader className="flex flex-col flex-1">
                    <div className="flex items-center gap-2">
                      <motion.div
                        className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300 flex-shrink-0"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <tool.icon className="h-5 w-5 text-primary" />
                      </motion.div>
                      <CardTitle className="text-lg leading-tight">
                        {tool.name}
                      </CardTitle>
                    </div>
                    <CardDescription className="flex-1 mt-2">
                      {tool.description}
                    </CardDescription>
                  </CardHeader>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    initial={false}
                  />
                </Card>
              </motion.div>
            </NextLink>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default FeaturesGridSection;
