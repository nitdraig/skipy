"use client";

import { useState } from "react";
import yaml from "js-yaml";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Braces } from "lucide-react";

export default function YamlJsonConverter() {
  const [yamlInput, setYamlInput] = useState("");
  const [jsonInput, setJsonInput] = useState("");
  const [converted, setConverted] = useState("");
  const [convertedFilename, setConvertedFilename] = useState("converted");
  const [tab, setTab] = useState("yamlToJson");

  const convertToJson = () => {
    try {
      const obj = yaml.load(yamlInput);
      const result = JSON.stringify(obj, null, 2);
      setConverted(result);
      setTab("yamlToJson");
      toast.success("Converted to JSON");
    } catch (e: any) {
      toast.error("Invalid YAML: " + e.message);
    }
  };

  const convertToYaml = () => {
    try {
      const obj = JSON.parse(jsonInput);
      const result = yaml.dump(obj);
      setConverted(result);
      setTab("jsonToYaml");
      toast.success("Converted to YAML");
    } catch (e: any) {
      toast.error("Invalid JSON: " + e.message);
    }
  };

  const downloadConverted = () => {
    const blob = new Blob([converted], {
      type: tab === "yamlToJson" ? "application/json" : "text/yaml",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${convertedFilename}.${
      tab === "yamlToJson" ? "json" : "yaml"
    }`;
    link.click();
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Card className="border-2 hover:border-primary/20 transition duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {" "}
            <motion.div
              animate={{ rotate: [0, 90, 180, 270, 360] }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              <Braces className="h-5 w-5" />
            </motion.div>
            YAML ⇄ JSON Converter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="yamlToJson"
            value={tab}
            onValueChange={setTab}
            className="w-full"
          >
            <TabsList className="mb-4">
              <TabsTrigger value="yamlToJson">YAML → JSON</TabsTrigger>
              <TabsTrigger value="jsonToYaml">JSON → YAML</TabsTrigger>
            </TabsList>

            {/* YAML to JSON */}
            <TabsContent value="yamlToJson">
              <div className="space-y-4">
                <Label>YAML Input</Label>
                <Textarea
                  value={yamlInput}
                  onChange={(e) => setYamlInput(e.target.value)}
                  rows={10}
                  placeholder="Enter valid YAML here"
                />
                <Button onClick={convertToJson}>Convert to JSON</Button>

                {converted && (
                  <div className="mt-4 space-y-2">
                    <Label>Converted JSON</Label>
                    <Textarea readOnly rows={10} value={converted} />
                    <div className="flex items-center gap-2">
                      <input
                        className="border px-2 py-1 rounded"
                        value={convertedFilename}
                        onChange={(e) => setConvertedFilename(e.target.value)}
                        placeholder="File name"
                      />
                      <Button onClick={downloadConverted}>Download JSON</Button>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* JSON to YAML */}
            <TabsContent value="jsonToYaml">
              <div className="space-y-4">
                <Label>JSON Input</Label>
                <Textarea
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  rows={10}
                  placeholder='Enter valid JSON, e.g. {"key": "value"}'
                />
                <Button onClick={convertToYaml}>Convert to YAML</Button>

                {converted && (
                  <div className="mt-4 space-y-2">
                    <Label>Converted YAML</Label>
                    <Textarea readOnly rows={10} value={converted} />
                    <div className="flex items-center gap-2">
                      <input
                        className="border px-2 py-1 rounded"
                        value={convertedFilename}
                        onChange={(e) => setConvertedFilename(e.target.value)}
                        placeholder="File name"
                      />
                      <Button onClick={downloadConverted}>Download YAML</Button>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
}
