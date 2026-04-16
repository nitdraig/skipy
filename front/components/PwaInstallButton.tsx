"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { SITE_NAME } from "@/lib/site-config";

type ChromiumInstallEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

function isStandalone(): boolean {
  if (typeof window === "undefined") return false;
  const nav = window.navigator as Navigator & { standalone?: boolean };
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    nav.standalone === true
  );
}

function isIOS(): boolean {
  if (typeof window === "undefined") return false;
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
}

export default function PwaInstallButton() {
  const [mounted, setMounted] = useState(false);
  const [chromiumReady, setChromiumReady] = useState(false);
  const [iosSheetOpen, setIosSheetOpen] = useState(false);
  const deferredRef = useRef<ChromiumInstallEvent | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || isStandalone()) return;

    const onBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      deferredRef.current = e as ChromiumInstallEvent;
      setChromiumReady(true);
    };

    const onAppInstalled = () => {
      deferredRef.current = null;
      setChromiumReady(false);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    window.addEventListener("appinstalled", onAppInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
      window.removeEventListener("appinstalled", onAppInstalled);
    };
  }, [mounted]);

  const runChromiumInstall = useCallback(async () => {
    const ev = deferredRef.current;
    if (!ev) return;
    try {
      await ev.prompt();
      await ev.userChoice;
    } finally {
      deferredRef.current = null;
      setChromiumReady(false);
    }
  }, []);

  if (!mounted || isStandalone()) return null;

  const showIos = !chromiumReady && isIOS();
  if (!chromiumReady && !showIos) return null;

  return (
    <div className="shrink-0 md:hidden">
      {chromiumReady ? (
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-8 gap-1.5 px-2.5 text-xs font-medium border-primary/30"
          onClick={runChromiumInstall}
        >
          <Download className="h-3.5 w-3.5" aria-hidden />
          Instalar
        </Button>
      ) : (
        <>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-8 gap-1.5 px-2.5 text-xs font-medium border-primary/30"
            onClick={() => setIosSheetOpen(true)}
          >
            <Download className="h-3.5 w-3.5" aria-hidden />
            Instalar
          </Button>
          <Sheet open={iosSheetOpen} onOpenChange={setIosSheetOpen}>
            <SheetContent side="bottom" className="rounded-t-xl">
              <SheetHeader>
                <SheetTitle>Instalar {SITE_NAME}</SheetTitle>
                <SheetDescription>
                  Instrucciones según el navegador en tu iPhone o iPad.
                </SheetDescription>
              </SheetHeader>
              <div className="mt-4 space-y-3 text-left text-sm text-muted-foreground">
                <p>
                  En Safari, pulsa <strong className="text-foreground">Compartir</strong>{" "}
                  (cuadrado con flecha hacia arriba) y elige{" "}
                  <strong className="text-foreground">Añadir a pantalla de inicio</strong>.
                </p>
                <p>
                  En Chrome para iOS, abre el menú <strong className="text-foreground">⋮</strong> y
                  busca la opción para añadir a la pantalla de inicio o compartir, según la versión.
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </>
      )}
    </div>
  );
}
