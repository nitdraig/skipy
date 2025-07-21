import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Link } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { cardVariants } from "@/hooks/Motion-Variants";

const LinkShortener = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleShorten = async () => {
    if (!url.trim()) {
      toast.error("Please enter a URL to shorten!");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/url-shorter/shorter`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ originalUrl: url }),
        },
      );

      const data = await response.json();

      if (!response.ok || !data.shortenedUrl) {
        throw new Error(data.message || "Error to shorten the URL");
      }

      setShortUrl(data.shortenedUrl);
      toast.success("Url shortened correctly!");
    } catch (error: any) {
      console.error("Error to shorten the URL:", error);
      toast.error(error.message || "Error to shorten the URL");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast("Copied to clipboard!");
  };

  return (
    <motion.div variants={cardVariants} initial="hidden" animate="visible">
      <Card className="border-2 hover:border-primary/20 transition-colors duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <Link className="h-5 w-5" />
            </motion.div>
            Short Link Generator
          </CardTitle>
          <CardDescription>
            Create shortened URLs for easy sharing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url">URL to shorten</Label>
            <Input
              id="url"
              placeholder="https://example.com/very-long-url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={handleShorten}
              className="w-full relative overflow-hidden"
              disabled={isLoading}
            >
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    />
                    Shortening...
                  </motion.div>
                ) : (
                  <motion.span
                    key="text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Shorten URL
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>
          <AnimatePresence>
            {shortUrl && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-2"
              >
                <Label>Shortened URL</Label>
                <div className="flex gap-2">
                  <Input
                    value={shortUrl}
                    readOnly
                    className="font-mono bg-muted/50"
                  />
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => copyToClipboard(shortUrl)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default LinkShortener;
