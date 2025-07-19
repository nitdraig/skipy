"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Github,
  ExternalLink,
  Zap,
  Shield,
  QrCode,
  Code,
  CreditCard,
  ArrowRight,
  Star,
  GitFork,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import NextLink from "next/link";
import { motion } from "framer-motion";
import {
  cardHoverVariants,
  containerVariants,
  floatingVariants,
  itemVariants,
} from "@/hooks/Motion-Variants";

export default function LandingPage() {
  const tools = [
    {
      name: "Short Link Generator",
      description: "Create shortened URLs for easy sharing",
      icon: QrCode,
    },
    {
      name: "Link Unshortener",
      description: "Reveal the destination of shortened links",
      icon: ExternalLink,
    },
    {
      name: "Password Generator",
      description: "Generate secure passwords with custom rules",
      icon: Shield,
    },
    {
      name: "QR Code Generator",
      description: "Create QR codes for text, URLs, and data",
      icon: QrCode,
    },
    {
      name: "Encoder/Decoder",
      description: "Base64, ROT13, Binary encoding/decoding",
      icon: Code,
    },
    {
      name: "Credit Card Generator",
      description: "Generate test credit card numbers for development",
      icon: CreditCard,
    },
  ];

  const roadmapItems = [
    { name: "JSON Formatter", status: "planned" },
    { name: "Hash Generator", status: "planned" },
    { name: "Color Palette Generator", status: "planned" },
    { name: "Lorem Ipsum Generator", status: "planned" },
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="container space-y-6 py-8 md:py-12 lg:py-24 relative">
        <motion.div
          className="mx-auto flex max-w-[980px] flex-col items-center gap-2 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Badge variant="outline" className="mb-4 animate-glow">
              Open Source Developer Tools
            </Badge>
          </motion.div>

          <motion.h1
            className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]"
            variants={itemVariants}
          >
            Your multipurpose tool
            <br className="hidden sm:inline" />
            <motion.span
              className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              for developers
            </motion.span>
          </motion.h1>

          <motion.p
            className="max-w-[750px] text-lg text-muted-foreground sm:text-xl"
            variants={itemVariants}
          >
            A clean, fast, and powerful collection of developer utilities.
            Generate passwords, create QR codes, encode data, and much more—all
            in one place.
          </motion.p>

          <motion.div className="flex gap-4 mt-6" variants={itemVariants}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" asChild className="group">
                <NextLink href="/app">
                  Try the App
                  <motion.div
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.div>
                </NextLink>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="lg" asChild>
                <NextLink href="https://github.com">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub Repo
                </NextLink>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex items-center gap-4 mt-4 text-sm text-muted-foreground"
            variants={itemVariants}
          >
            <motion.div
              className="flex items-center gap-1"
              whileHover={{ scale: 1.1 }}
            >
              <Star className="h-4 w-4" />
              <span>1.2k stars</span>
            </motion.div>
            <motion.div
              className="flex items-center gap-1"
              whileHover={{ scale: 1.1 }}
            >
              <GitFork className="h-4 w-4" />
              <span>89 forks</span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Floating scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          variants={floatingVariants}
          animate="animate"
        >
          <ChevronDown className="h-6 w-6 text-muted-foreground" />
        </motion.div>
      </section>

      {/* Features Grid */}
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
            <motion.div key={index} variants={itemVariants} whileHover="hover">
              <motion.div variants={cardHoverVariants}>
                <Card className="relative overflow-hidden group cursor-pointer border-2 hover:border-primary/20 transition-colors duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <motion.div
                        className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <tool.icon className="h-5 w-5 text-primary" />
                      </motion.div>
                      <CardTitle className="text-lg">{tool.name}</CardTitle>
                    </div>
                    <CardDescription>{tool.description}</CardDescription>
                  </CardHeader>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Screenshots Section */}
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
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
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

      {/* Roadmap */}
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

      {/* CTA Section */}
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
    </div>
  );
}
