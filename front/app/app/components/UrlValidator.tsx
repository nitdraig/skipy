"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { Eye } from "lucide-react";

export default function UrlValidator() {
  const [url, setUrl] = useState("");
  const [isValidFormat, setIsValidFormat] = useState<boolean | null>(null);
  const [httpStatus, setHttpStatus] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);

  const validateFormat = (input: string): boolean => {
    try {
      new URL(input);
      return true;
    } catch (_) {
      return false;
    }
  };

  const validateUrl = async () => {
    setIsValidFormat(null);
    setHttpStatus(null);
    setChecking(true);

    const formatValid = validateFormat(url);
    setIsValidFormat(formatValid);

    if (!formatValid) {
      toast.error("Invalid URL format");
      setChecking(false);
      return;
    }

    try {
      const response = await fetch(
        `/api/ping-url?url=${encodeURIComponent(url)}`,
      );
      const data = await response.json();
      setHttpStatus(`${data.status} ${data.statusText}`);
      toast.success("HTTP request successful");
    } catch (error) {
      setHttpStatus("Request failed or blocked");
      toast.error("Could not reach the URL");
    }

    setChecking(false);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Card className="border-2 hover:border-primary/20 transition duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: [0, 90, 180, 270, 360] }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              <Eye className="h-5 w-5" />
            </motion.div>
            URL Validator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="url">Enter URL</Label>
            <Input
              id="url"
              type="text"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="mt-2"
            />
          </div>

          <Button onClick={validateUrl} disabled={checking}>
            {checking ? "Validating..." : "Validate URL"}
          </Button>

          {isValidFormat !== null && (
            <p>
              <strong>Format:</strong>{" "}
              {isValidFormat ? (
                <span className="text-green-600">Valid</span>
              ) : (
                <span className="text-red-600">Invalid</span>
              )}
            </p>
          )}

          {httpStatus && (
            <p>
              <strong>HTTP Response:</strong> {httpStatus}
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
