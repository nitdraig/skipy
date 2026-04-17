import React from "react";
import { Button } from "@/components/ui/button";
import NextLink from "next/link";
import { Github } from "lucide-react";

const CtaSection = () => {
  return (
    <section className="container py-8 md:py-12 lg:py-24">
      <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
        <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl">
          Open Source & Free
        </h2>
        <p className="max-w-[600px] text-lg text-muted-foreground">
          Skipy is completely open source. Contribute, suggest features, or
          report issues on GitHub.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Button size="lg" asChild>
            <NextLink href="https://github.com/nitdraig/skipy">
              <Github className="mr-2 h-4 w-4" />
              View on GitHub
            </NextLink>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <NextLink href="/app">Try Now</NextLink>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
