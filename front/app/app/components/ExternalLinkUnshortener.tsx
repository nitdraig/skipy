"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Unlink } from "lucide-react";
import { toast } from "react-toastify";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { cardVariants } from "@/hooks/Motion-Variants";
const ExternalLinkUnshortener = () => {
  const [shortUrl, setShortUrl] = useState("");
  const [finalUrl, setFinalUrl] = useState("");
  const [loading, setLoading] = useState(false);

  // Función para normalizar la URL agregando protocolo si no lo tiene
  const normalizeUrl = (url: string): string => {
    const trimmedUrl = url.trim();

    // Verificar si ya tiene protocolo
    if (trimmedUrl.startsWith("http://") || trimmedUrl.startsWith("https://")) {
      return trimmedUrl;
    }

    // Agregar https:// por defecto
    return `https://${trimmedUrl}`;
  };

  const handleUnshorten = async () => {
    if (!shortUrl.trim()) {
      toast.error("Ingresa una URL acortada");
      return;
    }

    // Normalizar la URL antes de enviarla
    const normalizedUrl = normalizeUrl(shortUrl);

    setLoading(true);
    setFinalUrl("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/url-shorter/unshorten`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ shortUrl: normalizedUrl }),
        },
      );

      const data = await response.json();

      if (!response.ok || !data.finalUrl) {
        throw new Error(data.message || "No se pudo descomprimir la URL");
      }

      setFinalUrl(data.finalUrl);
      toast.success("URL obtenida correctamente");
    } catch (err: any) {
      toast.error(err.message || "Error al obtener la URL final");
    } finally {
      setLoading(false);
    }
  };

  // Opcional: También normalizar cuando el usuario termine de escribir
  const handleInputBlur = () => {
    if (shortUrl.trim()) {
      const normalized = normalizeUrl(shortUrl);
      setShortUrl(normalized);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(finalUrl);
    toast("Copiado al portapapeles");
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
              <Unlink className="h-5 w-5" />
            </motion.div>
            Un-shortened URL
          </CardTitle>
          <CardDescription>
            Check the final url of your shortened URL
          </CardDescription>
        </CardHeader>{" "}
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Short URL</Label>
            <Input
              value={shortUrl}
              onChange={(e) => setShortUrl(e.target.value)}
              onBlur={handleInputBlur}
              placeholder="bit.ly/ejemplo o https://bit.ly/ejemplo"
            />
          </div>
          <Button onClick={handleUnshorten} disabled={loading}>
            {loading ? "Searching..." : "Obtain original URL"}
          </Button>

          {finalUrl && (
            <div className="space-y-2">
              <Label>Final URL</Label>
              <div className="flex gap-2">
                <Input value={finalUrl} readOnly />
                <Button onClick={copyToClipboard} variant="outline" size="icon">
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <a
                href={finalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline text-sm"
              >
                Open Link
              </a>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ExternalLinkUnshortener;
