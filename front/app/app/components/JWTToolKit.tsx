"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import { Copy, KeyRound, VenetianMaskIcon } from "lucide-react";
import { motion } from "framer-motion";
import jwt from "jsonwebtoken";
import { cardVariants } from "@/hooks/Motion-Variants";

export default function JWTToolkit() {
  const [tab, setTab] = useState("generate");

  const [secretLength, setSecretLength] = useState(64);
  const [secret, setSecret] = useState("");

  const [jwtInput, setJwtInput] = useState("");
  const [decodedPayload, setDecodedPayload] = useState<any>(null);

  const [header, setHeader] = useState('{"alg": "HS256", "typ": "JWT"}');
  const [payload, setPayload] = useState(
    '{"sub": "1234567890", "name": "John Doe"}',
  );
  const [inputSecret, setInputSecret] = useState("");
  const [encodedToken, setEncodedToken] = useState("");

  const generateSecret = () => {
    const byteLength = Math.ceil(secretLength / 2);
    const array = new Uint8Array(byteLength);
    window.crypto.getRandomValues(array);
    const hex = Array.from(array, (b) => b.toString(16).padStart(2, "0")).join(
      "",
    );
    setSecret(hex.slice(0, secretLength));
    toast.success("Secret generated");
  };

  const decodeJWT = () => {
    try {
      const decoded = jwt.decode(jwtInput, { complete: true });
      if (!decoded) {
        throw new Error("Invalid token");
      }
      setDecodedPayload(decoded);
      toast.success("JWT decoded");
    } catch {
      toast.error("Failed to decode JWT");
    }
  };

  const encodeJWT = () => {
    try {
      const parsedPayload = JSON.parse(payload);
      const parsedHeader = JSON.parse(header);
      if (!inputSecret) {
        toast.error("Secret is required to sign the token");
        return;
      }

      const token = jwt.sign(parsedPayload, inputSecret, {
        algorithm: parsedHeader.alg || "HS256",
        header: parsedHeader,
      });

      setEncodedToken(token);
      toast.success("JWT signed successfully");
    } catch (err: any) {
      toast.error("Encoding failed: " + err.message);
    }
  };

  const copyToClipboard = async (text: string, label = "Copied!") => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(label);
    } catch {
      toast.error("Copy failed");
    }
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
              <VenetianMaskIcon className="h-5 w-5" />
            </motion.div>
            JWT Toolkit
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={tab} onValueChange={setTab} className="space-y-6">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="generate">Secret Generator</TabsTrigger>
              <TabsTrigger value="decode">Decode JWT</TabsTrigger>
              <TabsTrigger value="encode">Encode JWT</TabsTrigger>
            </TabsList>

            {/* Secret Generator */}
            <TabsContent value="generate" className="space-y-4">
              <Label>Secret Length</Label>
              <Input
                type="number"
                min={16}
                max={256}
                value={secretLength}
                onChange={(e) => setSecretLength(Number(e.target.value))}
              />
              <Button onClick={generateSecret} className="flex gap-2">
                <KeyRound size={16} />
                Generate Secret
              </Button>

              {secret && (
                <div className="space-y-2">
                  <Label>Generated JWT Secret</Label>
                  <Textarea rows={2} readOnly value={secret} />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(secret, "Secret copied")}
                    className="flex gap-2"
                  >
                    <Copy size={16} />
                    Copy
                  </Button>
                  <Textarea readOnly rows={1} value={`JWT_SECRET=${secret}`} />
                </div>
              )}
            </TabsContent>

            {/* JWT Decoder */}
            <TabsContent value="decode" className="space-y-4">
              <Label>Paste JWT</Label>
              <Textarea
                rows={3}
                placeholder="Paste JWT here"
                value={jwtInput}
                onChange={(e) => setJwtInput(e.target.value)}
              />
              <Button onClick={decodeJWT}>Decode JWT</Button>

              {decodedPayload && (
                <pre className="bg-muted p-4 rounded text-sm mt-4 whitespace-pre-wrap break-words">
                  {JSON.stringify(decodedPayload, null, 2)}
                </pre>
              )}
            </TabsContent>

            {/* JWT Encoder */}
            <TabsContent value="encode" className="space-y-4">
              <Label>Header (JSON)</Label>
              <Textarea
                rows={2}
                value={header}
                onChange={(e) => setHeader(e.target.value)}
              />

              <Label>Payload (JSON)</Label>
              <Textarea
                rows={3}
                value={payload}
                onChange={(e) => setPayload(e.target.value)}
              />

              <Label>Secret (used to sign)</Label>
              <Textarea
                rows={1}
                value={inputSecret}
                onChange={(e) => setInputSecret(e.target.value)}
              />

              <Button onClick={encodeJWT}>Sign & Encode</Button>

              {encodedToken && (
                <div className="space-y-2">
                  <Label>Encoded JWT</Label>
                  <Textarea readOnly rows={3} value={encodedToken} />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(encodedToken, "JWT copied")}
                    className="flex gap-2"
                  >
                    <Copy size={16} />
                    Copy Token
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
}
