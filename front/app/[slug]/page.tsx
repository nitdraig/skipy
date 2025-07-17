"use client";

import { useState, useEffect } from "react";

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
  ExternalLink,
  Shield,
  Clock,
  AlertTriangle,
  CheckCircle,
  X,
  ArrowRight,
  Zap,
  Globe,
  Lock,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import NextLink from "next/link";
import { useParams } from "next/navigation";

import {
  containerVariants,
  itemVariants,
  pulseVariants,
} from "@/hooks/Motion-Variants";

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

export default function page() {
  const params: any = useParams();
  const slug = typeof params.slug === "string" ? params.slug : params.slug?.[0];

  const [countdown, setCountdown] = useState(5);
  const [progress, setProgress] = useState(0);
  const [redirectData, setRedirectData] = useState<RedirectData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCancelled, setIsCancelled] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Simulate fetching redirect data
  useEffect(() => {
    if (!slug) return;

    const fetchRedirectData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/url-shorter/shorter/${slug}`,
        );
        if (!response.ok) throw new Error("No se pudo obtener el enlace.");

        const data: RedirectData = await response.json();
        setRedirectData(data);
        console.log(data);
      } catch (error) {
        console.error("Error:", error);
        setRedirectData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRedirectData();
  }, [slug]);
  // Countdown and redirect logic
  useEffect(() => {
    if (!redirectData || isCancelled || isLoading) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setIsRedirecting(true);
          // Simulate redirect
          setTimeout(() => {
            window.location.href = redirectData.originalUrl;
          }, 1000);
          return 0;
        }
        return prev - 1;
      });

      setProgress((prev) => prev + 20);
    }, 1000);

    return () => clearInterval(timer);
  }, [redirectData, isCancelled, isLoading]);

  const handleCancel = () => {
    setIsCancelled(true);
  };

  const handleRedirectNow = () => {
    setIsRedirecting(true);
    setTimeout(() => {
      window.location.href = redirectData?.originalUrl || "/";
    }, 500);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="mx-auto mb-4"
          >
            <Zap className="h-12 w-12 text-primary" />
          </motion.div>
          <p className="text-muted-foreground">
            Loading redirect information...
          </p>
        </motion.div>
      </div>
    );
  }

  if (!redirectData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-destructive/10 rounded-full">
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
            <CardTitle>Link Not Found</CardTitle>
            <CardDescription>
              The shortened link you're looking for doesn't exist or has
              expired.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <NextLink href="/">Return to Home</NextLink>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Header */}
      <motion.header
        className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="container flex h-14 items-center">
          <NextLink href="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <Zap className="h-6 w-6" />
            </motion.div>
            <span className="font-bold">Skipy</span>
          </NextLink>
          <div className="ml-auto">
            <Badge variant="outline" className="animate-pulse">
              Redirect Service
            </Badge>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="container py-8 md:py-12 lg:py-24">
        <motion.div
          className="mx-auto max-w-2xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence mode="wait">
            {!isCancelled && !isRedirecting ? (
              <motion.div key="redirect-info" variants={itemVariants}>
                {/* Status Card */}
                <Card className="mb-6 border-2 border-primary/20">
                  <CardHeader className="text-center">
                    <motion.div
                      className="mx-auto mb-4 p-4 bg-primary/10 rounded-full"
                      variants={pulseVariants}
                      animate="animate"
                    >
                      <ExternalLink className="h-8 w-8 text-primary" />
                    </motion.div>
                    <CardTitle className="text-2xl">
                      Redirecting you safely
                    </CardTitle>
                    <CardDescription className="text-lg">
                      You'll be redirected in{" "}
                      <span className="font-bold text-primary">
                        {countdown}
                      </span>{" "}
                      seconds
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Redirect Progress</span>
                        <span>{progress}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>

                    <div className="flex gap-2 justify-center">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button onClick={handleRedirectNow} className="gap-2">
                          <ArrowRight className="h-4 w-4" />
                          Go Now
                        </Button>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant="outline"
                          onClick={handleCancel}
                          className="gap-2 bg-transparent"
                        >
                          <X className="h-4 w-4" />
                          Cancel
                        </Button>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>

                {/* Destination Info */}
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      Destination Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            redirectData.isSecure ? "default" : "destructive"
                          }
                          className="gap-1"
                        >
                          {redirectData.isSecure ? (
                            <Lock className="h-3 w-3" />
                          ) : (
                            <AlertTriangle className="h-3 w-3" />
                          )}
                          {redirectData.isSecure ? "Secure" : "Not Secure"}
                        </Badge>
                        <Badge variant="outline">{redirectData.domain}</Badge>
                      </div>

                      <div className="p-4 bg-muted/50 rounded-lg border">
                        <p className="font-mono text-sm break-all text-primary">
                          {redirectData.originalUrl}
                        </p>
                      </div>

                      {redirectData.title && (
                        <div>
                          <h3 className="font-semibold">
                            {redirectData.title}
                          </h3>
                          {redirectData.description && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {redirectData.description}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Security Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Security Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                      <div className="space-y-2">
                        <div className="mx-auto p-2 bg-green-100 dark:bg-green-900/20 rounded-full w-fit">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm">Scanned</p>
                          <p className="text-xs text-muted-foreground">
                            Link verified safe
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="mx-auto p-2 bg-blue-100 dark:bg-blue-900/20 rounded-full w-fit">
                          <Clock className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm">
                            {redirectData.clicks} clicks
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Total visits
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="mx-auto p-2 bg-purple-100 dark:bg-purple-900/20 rounded-full w-fit">
                          <Zap className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm">Created</p>
                          <p className="text-xs text-muted-foreground">
                            {redirectData.createdAt}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : isCancelled ? (
              <motion.div
                key="cancelled"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="text-center">
                  <CardHeader>
                    <div className="mx-auto mb-4 p-4 bg-muted rounded-full">
                      <X className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <CardTitle>Redirect Cancelled</CardTitle>
                    <CardDescription>
                      The redirect has been cancelled. You can still visit the
                      link manually if you wish.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-muted/50 rounded-lg border">
                      <p className="font-mono text-sm break-all">
                        {redirectData.originalUrl}
                      </p>
                    </div>
                    <div className="flex gap-2 justify-center">
                      <Button asChild>
                        <a
                          href={redirectData.originalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Visit Link
                        </a>
                      </Button>
                      <Button variant="outline" asChild>
                        <NextLink href="/">Return Home</NextLink>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key="redirecting"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="text-center">
                  <CardHeader>
                    <motion.div
                      className="mx-auto mb-4 p-4 bg-primary/10 rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                    >
                      <ArrowRight className="h-8 w-8 text-primary" />
                    </motion.div>
                    <CardTitle>Redirecting...</CardTitle>
                    <CardDescription>
                      Taking you to your destination now
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
