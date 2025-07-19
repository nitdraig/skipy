"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle,
  Clock,
  ExternalLink,
  Globe,
  Lock,
  Shield,
  X,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import NextLink from "next/link";

interface RedirectData {
  originalUrl: string;
  shortCode: string;
  isSecure: boolean;
  domain: string;
  title?: string;
  description?: string;
  clicks: number;
  createdAt: string;
}

export default function RedirectPage() {
  const slug = useParams().slug as string;

  const [redirectData, setRedirectData] = useState<RedirectData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCancelled, setIsCancelled] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!slug) return;

    const fetchRedirectData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/url-shorter/shorter/${slug}`,
        );
        console.log(
          "URL:",
          `${process.env.NEXT_PUBLIC_API_URL}/url-shorter/shorter/${slug}`,
        );

        if (!res.ok) throw new Error("No se pudo obtener el enlace");

        const data: RedirectData = await res.json();
        setRedirectData(data);
      } catch (err) {
        console.error("Error al obtener datos:", err);
        setRedirectData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRedirectData();
  }, [slug]);

  // Countdown and redirect
  useEffect(() => {
    if (!redirectData || isCancelled || isLoading) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setIsRedirecting(true);

          const url = /^https?:\/\//.test(redirectData.originalUrl)
            ? redirectData.originalUrl
            : "https://" + redirectData.originalUrl;

          window.location.href = url;
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });

      setProgress((prev) => Math.min(prev + 20, 100));
    }, 1000);

    return () => clearInterval(interval);
  }, [redirectData, isCancelled, isLoading]);

  const handleCancel = () => {
    setIsCancelled(true);
  };

  const handleRedirectNow = () => {
    if (!redirectData) return;

    setIsRedirecting(true);

    const url = /^https?:\/\//.test(redirectData.originalUrl)
      ? redirectData.originalUrl
      : "https://" + redirectData.originalUrl;

    window.location.href = url;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="mx-auto mb-4"
          >
            <Zap className="h-10 w-10 text-primary" />
          </motion.div>
          <p className="text-muted-foreground">Cargando redirección...</p>
        </motion.div>
      </div>
    );
  }

  if (!redirectData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-destructive/10 rounded-full">
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
            <CardTitle>Enlace no encontrado</CardTitle>
            <CardDescription>
              El enlace acortado no existe o ha expirado.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <NextLink href="/">Volver al inicio</NextLink>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 container">
      <motion.div
        className="mx-auto max-w-xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence mode="wait">
          {!isCancelled && !isRedirecting ? (
            <motion.div
              key="info"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Card className="mb-6 border-2 border-primary/20">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-fit">
                    <ExternalLink className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Redireccionando de forma segura</CardTitle>
                  <CardDescription>
                    Serás redirigido en{" "}
                    <span className="font-bold text-primary">{countdown}</span>{" "}
                    segundos
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progreso</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                  <div className="flex gap-2 justify-center mt-4">
                    <Button onClick={handleRedirectNow} className="gap-2">
                      <ArrowRight className="h-4 w-4" />
                      Ir ahora
                    </Button>
                    <Button variant="outline" onClick={handleCancel}>
                      <X className="h-4 w-4" />
                      Cancelar
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Información del destino
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Badge
                    variant={redirectData.isSecure ? "default" : "destructive"}
                    className="gap-1"
                  >
                    {redirectData.isSecure ? (
                      <Lock className="h-3 w-3" />
                    ) : (
                      <AlertTriangle className="h-3 w-3" />
                    )}
                    {redirectData.isSecure ? "Seguro" : "No seguro"}
                  </Badge>
                  <Badge variant="outline">{redirectData.domain}</Badge>
                  <div className="p-3 mt-2 bg-muted/50 rounded border">
                    <p className="text-sm font-mono break-all">
                      {redirectData.originalUrl}
                    </p>
                  </div>
                  {redirectData.title && (
                    <div>
                      <h3 className="font-semibold">{redirectData.title}</h3>
                      {redirectData.description && (
                        <p className="text-muted-foreground text-sm mt-1">
                          {redirectData.description}
                        </p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ) : isCancelled ? (
            <motion.div
              key="cancelled"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 p-4 bg-muted rounded-full w-fit">
                    <X className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <CardTitle>Redirección cancelada</CardTitle>
                  <CardDescription>
                    Puedes visitar el enlace manualmente si lo deseas.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-muted/50 rounded border">
                    <p className="text-sm font-mono break-all">
                      {redirectData.originalUrl}
                    </p>
                  </div>
                  <div className="flex justify-center gap-2">
                    <Button asChild>
                      <a
                        href={redirectData.originalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Visitar enlace
                      </a>
                    </Button>
                    <Button variant="outline" asChild>
                      <NextLink href="/">Volver al inicio</NextLink>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="redirecting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Card className="text-center">
                <CardHeader>
                  <motion.div
                    className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-fit"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <ArrowRight className="h-8 w-8 text-primary" />
                  </motion.div>
                  <CardTitle>Redirigiendo...</CardTitle>
                  <CardDescription>
                    Estamos llevándote a tu destino
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
