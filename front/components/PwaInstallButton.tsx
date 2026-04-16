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

const installButtonClass =
  "h-9 shrink-0 gap-2 rounded-lg px-3.5 text-sm font-semibold shadow-md";

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

  if (chromiumReady) {
    return (
      <Button
        type="button"
        variant="default"
        size="sm"
        className={installButtonClass}
        onClick={runChromiumInstall}
      >
        <Download className="h-4 w-4 shrink-0" aria-hidden />
        Install
      </Button>
    );
  }

  return (
    <>
      <Button
        type="button"
        variant="default"
        size="sm"
        className={installButtonClass}
        onClick={() => setIosSheetOpen(true)}
      >
        <Download className="h-4 w-4 shrink-0" aria-hidden />
        Install
      </Button>
      <Sheet open={iosSheetOpen} onOpenChange={setIosSheetOpen}>
        <SheetContent side="bottom" className="rounded-t-xl pb-8">
          <SheetHeader className="text-left">
            <SheetTitle>Install {SITE_NAME}</SheetTitle>
            <SheetDescription>
              Add this site to your Home Screen to open it like an app.
            </SheetDescription>
          </SheetHeader>
          <div className="mt-4 space-y-3 text-left text-sm text-muted-foreground">
            <p>
              In <strong className="text-foreground">Safari</strong>, tap the{" "}
              <strong className="text-foreground">Share</strong> button (square
              with an arrow) and choose{" "}
              <strong className="text-foreground">Add to Home Screen</strong>.
            </p>
            <p>
              In <strong className="text-foreground">Chrome on iOS</strong>, open
              the <strong className="text-foreground">⋮</strong> menu and look
              for Add to Home Screen or Share, depending on your version.
            </p>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
