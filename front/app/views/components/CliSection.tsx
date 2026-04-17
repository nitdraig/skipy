"use client";

import React, { useState } from "react";
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
    <section id="cli" className="container bg-muted/20 py-8 md:py-12 lg:py-24">
      <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
        <div className="mb-4 flex items-center gap-3">
          <Terminal className="h-10 w-10 text-primary" />
          <Badge variant="outline" className="px-3 py-1 text-sm">
            <Code className="mr-1 h-3 w-3" />
            CLI Available
          </Badge>
        </div>

        <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl">
          Use from Your Terminal
        </h2>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Install our CLI package and access all developer tools directly from
          your command line. Perfect for automation, scripting, and quick
          development tasks.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-4xl">
        <h3 className="mb-6 text-center text-2xl font-semibold">Quick Start</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {installCommands.map((install, index) => (
            <div key={index}>
              <Card className="border-2 border-dashed transition-colors duration-200 hover:border-primary/50">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <ChevronRight className="h-4 w-4 text-primary" />
                    {install.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {install.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 rounded-md bg-muted/50 p-3 font-mono text-sm">
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
                      aria-label="Copy command"
                    >
                      {copiedCommand === `install-${index}` ? (
                        <span className="text-green-600">✓</span>
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-6xl">
        <h3 className="mb-8 text-center text-2xl font-semibold">
          Available Commands
        </h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cliFeatures.map((feature, index) => (
            <div key={index} className="group">
              <Card className="h-full border-2 transition-all duration-200 hover:border-primary/20 hover:shadow-md">
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    <div
                      className={`rounded-lg bg-muted/50 p-2 ${feature.color}`}
                    >
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg leading-tight">
                        {feature.name}
                      </CardTitle>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 overflow-hidden rounded-md bg-black/5 p-3 font-mono text-xs dark:bg-white/5">
                      <span className="flex-shrink-0 text-green-600">$</span>
                      <span className="flex-1 truncate text-muted-foreground transition-colors group-hover:text-foreground">
                        {feature.command}
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                          copyToClipboard(feature.command, `feature-${index}`)
                        }
                        className="h-6 w-6 flex-shrink-0 p-0 opacity-0 transition-opacity group-hover:opacity-100 md:opacity-100"
                        aria-label="Copy command"
                      >
                        {copiedCommand === `feature-${index}` ? (
                          <span className="text-green-600">✓</span>
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-2xl text-center">
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
        <p className="mt-4 text-sm text-muted-foreground">
          Open source • GNU License • Built with TypeScript
        </p>
      </div>
    </section>
  );
};

export default CliSection;
