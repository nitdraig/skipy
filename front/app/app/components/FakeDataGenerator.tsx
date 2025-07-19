"use client";

import { useState } from "react";
import { faker } from "@faker-js/faker";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { PersonStandingIcon } from "lucide-react";
import { cardVariants } from "@/hooks/Motion-Variants";

type FakeData = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  company: string;
};

export default function FakeDataGenerator() {
  const [data, setData] = useState<FakeData | null>(null);

  const generateFakeData = () => {
    const fake: FakeData = {
      fullName: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      address: `${faker.location.streetAddress()}, ${faker.location.city()}, ${faker.location.state()}, ${faker.location.zipCode()}`,
      company: faker.company.name(),
    };
    setData(fake);
  };

  return (
    <motion.div variants={cardVariants} initial="hidden" animate="visible">
      <Card className="border-2 hover:border-primary/20 transition-colors duration-300">
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
              <PersonStandingIcon className="h-5 w-5" />
            </motion.div>
            Fake Data Generator
          </CardTitle>
          <CardDescription>
            {" "}
            Generates fake data to test your app{" "}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Button onClick={generateFakeData}>Generate Fake Data</Button>

          {data && (
            <div className="mt-4 space-y-2 font-mono text-sm bg-muted p-4 rounded">
              <div>
                <Label>Full Name</Label>
                <p>{data.fullName}</p>
              </div>
              <div>
                <Label>Email</Label>
                <p>{data.email}</p>
              </div>
              <div>
                <Label>Phone</Label>
                <p>{data.phone}</p>
              </div>
              <div>
                <Label>Address</Label>
                <p>{data.address}</p>
              </div>
              <div>
                <Label>Company</Label>
                <p>{data.company}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
