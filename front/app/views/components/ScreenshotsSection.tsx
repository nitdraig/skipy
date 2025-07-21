import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
const ScreenshotsSection = () => {
  return (
    <section className="container py-8 md:py-12 lg:py-24">
      <motion.div
        className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl">
          Clean Interface
        </h2>
        <p className="max-w-[600px] text-lg text-muted-foreground">
          Designed for developers who value simplicity and efficiency
        </p>
      </motion.div>
      <motion.div
        className="mx-auto max-w-5xl py-12"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
          <Card className="overflow-hidden shadow-2xl">
            <CardContent className="p-0">
              <Image
                src="/placeholder.svg?height=400&width=800"
                alt="Skipy App Interface"
                width={800}
                height={400}
                className="w-full object-cover"
              />
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ScreenshotsSection;
