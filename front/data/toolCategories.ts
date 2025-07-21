import {
  Link,
  Unlink,
  Shield,
  Eye,
  QrCode,
  Code,
  CreditCard,
  VenetianMaskIcon,
  Regex,
  FileJson2Icon,
  PersonStandingIcon,
  Braces,
  ArrowRight,
  Palette,
} from "lucide-react";

export const toolCategories = [
  {
    id: "utilities",
    name: "Utilities",
    tools: [
      {
        id: "link-shortener",
        name: "Short Link Generator",
        shortName: "Short Link",
        icon: Link,
        description:
          "Convert long URLs into compact, shareable links in seconds.",
      },
      {
        id: "link-unshortener",
        name: "Link Unshortener",
        shortName: "Unshorten",
        icon: Unlink,
        description: "Reveal the original destination behind shortened URLs.",
      },
      {
        id: "url-validator",
        name: "URL Validator",
        shortName: "URL Validator",
        icon: Eye,
        description: "Check the format, protocol, and HTTP response of a URL.",
      },
    ],
  },
  {
    id: "security",
    name: "Security",
    tools: [
      {
        id: "password-generator",
        name: "Password Generator",
        shortName: "Password",
        icon: Shield,
        description:
          "Create strong, random passwords to enhance your security.",
      },
      {
        id: "jwt-tool",
        name: "JWT Tool",
        shortName: "JWT Tool",
        icon: VenetianMaskIcon,
        description: "Encode, decode, and generate secure JWT tokens for APIs.",
      },
    ],
  },
  {
    id: "generators",
    name: "Generators",
    tools: [
      {
        id: "qr-generator",
        name: "QR Code Generator",
        shortName: "QR Code",
        icon: QrCode,
        description: "Generate scannable QR codes from text, links, or data.",
      },
      {
        id: "color-palette-generator",
        name: "Color Palette Generator",
        shortName: "Color Palette",
        icon: Palette,
        description:
          "Generate balanced color palettes using the 60-30-10 rule.",
      },
      {
        id: "credit-card",
        name: "Credit Card Generator",
        shortName: "Credit Card",
        icon: CreditCard,
        description: "Generate fake but valid credit card numbers for testing.",
      },
      {
        id: "fake-data-generator",
        name: "Fake Data Generator",
        shortName: "Fake Data",
        icon: PersonStandingIcon,
        description:
          "Create realistic names, emails, addresses, and companies.",
      },
    ],
  },
  {
    id: "formatting",
    name: "Formatting / Parsing",
    tools: [
      {
        id: "json-validator",
        name: "JSON Formatter",
        shortName: "JSON",
        icon: FileJson2Icon,
        description: "Format, validate, and prettify JSON data for debugging.",
      },
      {
        id: "yaml-json",
        name: "YAML ↔ JSON Converter",
        shortName: "YAML / JSON",
        icon: Braces,
        description: "Easily convert between YAML and JSON formats.",
      },
      {
        id: "encoder-decoder",
        name: "Encoder / Decoder",
        shortName: "Encoder",
        icon: Code,
        description: "Base64 encode/decode and handle common data formats.",
      },
    ],
  },
];
