"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FileJson2Icon } from "lucide-react";
import { cardVariants } from "@/hooks/Motion-Variants";

export default function JSONFormatterValidator() {
  const [jsonInput, setJsonInput] = useState("");
  const [formattedJson, setFormattedJson] = useState("");
  const [error, setError] = useState("");

  const validateAndFormat = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      const pretty = JSON.stringify(parsed, null, 2);
      setFormattedJson(pretty);
      setError("");
      toast.success("JSON is valid and formatted");
    } catch (e: any) {
      setError(e.message);
      setFormattedJson("");
      toast.error("Invalid JSON");
    }
  };

  const clearAll = () => {
    setJsonInput("");
    setFormattedJson("");
    setError("");
  };

  return (
    <motion.div variants={cardVariants} initial="hidden" animate="visible">
      <Card className="border-2 hover:border-primary/20 transition-colors duration-300">
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
              <FileJson2Icon className="h-5 w-5" />
            </motion.div>
            JSON Formatter / Validator
          </CardTitle>
          <CardDescription>
            Validate and format your JSON data easily
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="jsonInput">Paste JSON here</Label>
            <Textarea
              id="jsonInput"
              rows={10}
              placeholder="Paste your JSON here"
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              className={error ? "border-red-600" : ""}
            />
            {error && (
              <p className="text-red-600 mt-1 text-sm">Error: {error}</p>
            )}
          </div>

          <div className="flex gap-3">
            <Button onClick={validateAndFormat}>Validate & Format</Button>
            <Button variant="outline" onClick={clearAll}>
              Clear
            </Button>
          </div>

          {formattedJson && (
            <div>
              <Label>Formatted JSON:</Label>
              <Textarea
                rows={10}
                readOnly
                value={formattedJson}
                className="font-mono bg-muted"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
