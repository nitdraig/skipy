import React from "react";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/hooks/Motion-Variants";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const RoadmapSection = () => {
  const roadmapItems = [
    { name: "Hash Generator", status: "planned" },
    { name: "Lorem Ipsum Generator", status: "planned" },
  ];

  return (
    <section id="roadmap" className="container py-8 md:py-12 lg:py-24">
      <motion.div
        className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl">
          What's Next
        </h2>
        <p className="max-w-[600px] text-lg text-muted-foreground">
          More tools are coming to make your development workflow even better
        </p>
      </motion.div>
      <motion.div
        className="mx-auto grid max-w-3xl grid-cols-1 gap-4 py-12 md:grid-cols-2"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {roadmapItems.map((item, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            <Card className="relative border-dashed border-2 hover:border-primary/50 transition-colors duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  <motion.div
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  >
                    <Badge variant="secondary">Coming Soon</Badge>
                  </motion.div>
                </div>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default RoadmapSection;
