import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { containerVariants, itemVariants } from "@/hooks/Motion-Variants";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Terminal,
  Shield,
  QrCode,
  Key,
  Database,
  Link,
  Palette,
  Copy,
  Download,
  ExternalLink,
  ChevronRight,
  Code,
} from "lucide-react";
import { toast } from "react-toastify";

const CliSection = () => {
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  const cliFeatures = [
    {
      name: "Password Generator",
      description: "Generate secure passwords with customizable options",
      icon: Shield,
      command: "npx skipy password generate-random",
      color: "text-green-600",
    },
    {
      name: "QR Code Generator",
      description: "Create QR codes directly in your terminal",
      icon: QrCode,
      command: 'npx skipy qr generate "https://example.com"',
      color: "text-blue-600",
    },
    {
      name: "JWT Manager",
      description: "Create, verify, and decode JSON Web Tokens",
      icon: Key,
      command: '"npx skipy jwt generate-secret"',
      color: "text-purple-600",
    },
    {
      name: "Fake Data Generator",
      description: "Generate realistic test data with Faker.js",
      icon: Database,
      command: "npx skipy faker user",
      color: "text-orange-600",
    },
    {
      name: "URL Tools",
      description: "Validate and manipulate URLs",
      icon: Link,
      command: 'npx skipy url-validator "https://example.com/long-url"',
      color: "text-cyan-600",
    },
    {
      name: "URL Shortener",
      description: "Shorten long URLs easily",
      icon: ExternalLink,
      command: "npx skipy url shorten 'https://example.com/long-url'",
      color: "text-pink-600",
    },
    {
      name: "Color Palette Generator",
      description: "Generate color palettes following the 60-30-10 rule",
      icon: Palette,
      command: "npx skipy palette -r",
      color: "text-pink-600",
    },
  ];

  const installCommands = [
    {
      title: "Install globally via npm",
      command: "npm install -g skipy-devtools-cli",
      description: "Recommended installation method",
    },
    {
      title: "Get help and commands list",
      command: "npx skipy --help",
      description: "Display all available commands",
    },
  ];

  const copyToClipboard = async (text: string, commandType: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCommand(commandType);
      toast.success("Command copied to clipboard!");
      setTimeout(() => setCopiedCommand(null), 2000);
    } catch (err) {
      toast.error("Failed to copy command");
    }
  };

  return (
    <section id="cli" className="px-4 py-8 md:py-12 lg:py-24 bg-muted/20">
      <motion.div
        className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="flex items-center gap-3 mb-4"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.div
            animate={{
              rotate: [0, 5, -5, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            <Terminal className="h-10 w-10 text-primary" />
          </motion.div>
          <Badge variant="outline" className="text-sm px-3 py-1">
            <Code className="h-3 w-3 mr-1" />
            CLI Available
          </Badge>
        </motion.div>

        <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl">
          Use from Your Terminal
        </h2>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Install our CLI package and access all developer tools directly from
          your command line. Perfect for automation, scripting, and quick
          development tasks.
        </p>
      </motion.div>

      {/* Installation Section */}
      <motion.div
        className="mx-auto max-w-4xl mt-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl font-semibold mb-6 text-center">Quick Start</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {installCommands.map((install, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="border-2 border-dashed hover:border-primary/50 transition-all duration-300">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-primary" />
                    {install.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {install.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-md font-mono text-sm">
                    <span className="flex-1 text-green-600">
                      $ {install.command}
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() =>
                        copyToClipboard(install.command, `install-${index}`)
                      }
                      className="h-6 w-6 p-0"
                    >
                      <AnimatePresence mode="wait">
                        {copiedCommand === `install-${index}` ? (
                          <motion.div
                            key="check"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="text-green-600"
                          >
                            ✓
                          </motion.div>
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </AnimatePresence>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CLI Features */}
      <motion.div
        className="mx-auto max-w-6xl mt-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h3 className="text-2xl font-semibold mb-8 text-center">
          Available Commands
        </h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cliFeatures.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                y: -5,
              }}
              className="group"
            >
              <Card className="h-full border-2 hover:border-primary/20 transition-all duration-300 hover:shadow-lg">
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    <motion.div
                      className={`p-2 rounded-lg bg-muted/50 ${feature.color}`}
                      whileHover={{ rotate: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <feature.icon className="h-5 w-5" />
                    </motion.div>
                    <div className="flex-1">
                      <CardTitle className="text-lg leading-tight">
                        {feature.name}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 p-3 bg-black/5 dark:bg-white/5 rounded-md font-mono text-xs overflow-hidden">
                      <span className="text-green-600 flex-shrink-0">$</span>
                      <span className="flex-1 truncate text-muted-foreground group-hover:text-foreground transition-colors">
                        {feature.command}
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                          copyToClipboard(feature.command, `feature-${index}`)
                        }
                        className="h-6 w-6 p-0 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <AnimatePresence mode="wait">
                          {copiedCommand === `feature-${index}` ? (
                            <motion.div
                              key="check"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                              className="text-green-600"
                            >
                              ✓
                            </motion.div>
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </AnimatePresence>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Links Section */}
      <motion.div
        className="mx-auto max-w-2xl mt-16 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="outline" asChild>
            <a
              href="https://www.npmjs.com/package/skipy-devtools-cli"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              View on npm
              <ExternalLink className="h-3 w-3" />
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a
              href="https://github.com/nitdraig/skipy"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Code className="h-4 w-4" />
              Source Code
              <ExternalLink className="h-3 w-3" />
            </a>
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          Open source • GNU License • Built with TypeScript
        </p>
      </motion.div>
    </section>
  );
};

export default CliSection;
