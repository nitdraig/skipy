import { containerVariants, itemVariants } from "@/hooks/Motion-Variants";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import NextLink from "next/link";
import { Github } from "lucide-react";

const CtaSection = () => {
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
          Open Source & Free
        </h2>
        <p className="max-w-[600px] text-lg text-muted-foreground">
          Skipy is completely open source. Contribute, suggest features, or
          report issues on GitHub.
        </p>
        <motion.div
          className="flex gap-4 mt-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button size="lg" asChild>
              <NextLink href="https://github.com/nitdraig/skipy">
                <Github className="mr-2 h-4 w-4" />
                View on GitHub
              </NextLink>
            </Button>
          </motion.div>
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="outline" size="lg" asChild>
              <NextLink href="/app">Try Now</NextLink>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CtaSection;
