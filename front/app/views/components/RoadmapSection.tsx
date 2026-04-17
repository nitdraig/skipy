import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const RoadmapSection = () => {
  const roadmapItems = [
    { name: "Hash Generator" },
    { name: "Lorem Ipsum Generator" },
  ];

  return (
    <section id="roadmap" className="container py-8 md:py-12 lg:py-24">
      <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
        <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl">
          What&apos;s Next
        </h2>
        <p className="max-w-[600px] text-lg text-muted-foreground">
          More tools are coming to make your development workflow even better
        </p>
      </div>
      <div className="mx-auto grid max-w-3xl grid-cols-1 gap-4 py-12 md:grid-cols-2">
        {roadmapItems.map((item, index) => (
          <div key={index}>
            <Card className="relative border-2 border-dashed transition-colors duration-200 hover:border-primary/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  <Badge variant="secondary">Coming Soon</Badge>
                </div>
              </CardHeader>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RoadmapSection;
