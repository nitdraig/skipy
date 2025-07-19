"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy, Eye, EyeOff, Lock } from "lucide-react";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";

const JWTTool = () => {
  const [jwtInput, setJwtInput] = useState("");
  const [decodedPayload, setDecodedPayload] = useState<string | null>(null);
  const [showSecret, setShowSecret] = useState(false);
  const [secret, setSecret] = useState("");
  const [header, setHeader] = useState("{
  \"alg\": \"HS256\",
  \"typ\": \"JWT\"
}");
  const [payload, setPayload] = useState("{
  \"sub\": \"1234567890\",
  \"name\": \"John Doe\",
  \"iat\": 1516239022
}");
  const [encodedJWT, setEncodedJWT] = useState<string | null>(null);

  const decodeJWT = () => {
    try {
      const decoded = jwtDecode(jwtInput);
      setDecodedPayload(JSON.stringify(decoded, null, 2));
      toast.success("Token decoded successfully!");
    } catch (err) {
      toast.error("Invalid JWT token");
      setDecodedPayload(null);
    }
  };

  const encodeJWT = async () => {
    try {
      const base64UrlEncode = (obj: object) => {
        return btoa(JSON.stringify(obj))
          .replace(/=/g, "")
          .replace(/\+/g, "-")
          .replace(/\//g, "_");
      };

      const parsedHeader = JSON.parse(header);
      const parsedPayload = JSON.parse(payload);

      const encodedHeader = base64UrlEncode(parsedHeader);
      const encodedPayload = base64UrlEncode(parsedPayload);

      // No real signature without crypto lib — dummy signature
      const signature = btoa(secret).replace(/=/g, "");
      const jwt = `${encodedHeader}.${encodedPayload}.${signature}`;

      setEncodedJWT(jwt);
      toast.success("JWT encoded successfully!");
    } catch (err) {
      toast.error("Failed to encode JWT. Check JSON format.");
      setEncodedJWT(null);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lock className="w-5 h-5 text-primary" /> JWT Decoder / Encoder
        </CardTitle>
        <CardDescription>
          Decode and encode JSON Web Tokens for debugging and development
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* JWT Decoder */}
        <div className="space-y-2">
          <Label htmlFor="jwtInput">Paste JWT token</Label>
          <Textarea
            id="jwtInput"
            rows={3}
            placeholder="eyJhbGciOi..."
            value={jwtInput}
            onChange={(e) => setJwtInput(e.target.value)}
          />
          <Button onClick={decodeJWT}>Decode</Button>
        </div>

        {decodedPayload && (
          <div className="space-y-2">
            <Label>Decoded Payload</Label>
            <Textarea readOnly rows={6} value={decodedPayload} className="bg-muted" />
          </div>
        )}

        <hr className="my-6" />

        {/* JWT Encoder */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="header">JWT Header</Label>
            <Textarea
              id="header"
              rows={5}
              value={header}
              onChange={(e) => setHeader(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="payload">JWT Payload</Label>
            <Textarea
              id="payload"
              rows={5}
              value={payload}
              onChange={(e) => setPayload(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="secret">Secret</Label>
          <div className="relative">
            <Input
              type={showSecret ? "text" : "password"}
              id="secret"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => setShowSecret(!showSecret)}
            >
              {showSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        <Button onClick={encodeJWT}>Encode JWT</Button>

        {encodedJWT && (
          <div className="space-y-2">
            <Label>Encoded JWT</Label>
            <div className="flex items-center gap-2">
              <Textarea readOnly rows={3} value={encodedJWT} className="bg-muted" />
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  navigator.clipboard.writeText(encodedJWT);
                  toast.success("Copied to clipboard");
                }}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default JWTTool;
