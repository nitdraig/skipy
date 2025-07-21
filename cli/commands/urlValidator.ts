import { Command } from "commander";
import validUrl from "valid-url";
import chalk from "chalk";
import dns from "dns/promises";
import { URL } from "url";

function isIpDomain(domain: string) {
  return /^(\d{1,3}\.){3}\d{1,3}$/.test(domain);
}

function suspiciousWordsInText(text: string) {
  const suspiciousWords = [
    "free",
    "cheap",
    "discount",
    "offer",
    "click",
    "win",
    "bit.ly",
    "shorturl",
    "login",
    "verify",
    "update",
    "bank",
  ];
  return suspiciousWords.some((word) => text.toLowerCase().includes(word));
}

function hasExcessiveEncoding(url: string) {
  const count = (url.match(/%/g) || []).length;
  return count > 5;
}

function excessiveSubdomains(hostname: string) {
  return hostname.split(".").length > 4;
}

async function checkRedirection(url: string) {
  try {
    const response = await fetch(url, { method: "HEAD", redirect: "manual" });
    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location");
      return location || null;
    }
    return null;
  } catch {
    return null;
  }
}

const blacklistedDomains = new Set([
  "malicious.com",
  "spammy.org",
  "phishing.net",
]);

export function registerUrlValidatorCommands(program: Command) {
  const urlCmd = program
    .command("url-validator")
    .description("Advanced URL validator");

  urlCmd
    .argument("<url>", "URL to validate")
    .description("Validate URL with advanced heuristics")
    .action(async (urlStr) => {
      if (!validUrl.isWebUri(urlStr)) {
        console.log(chalk.red("Invalid URL syntax."));
        process.exit(1);
      }

      try {
        const url = new URL(urlStr);
        const hostname = url.hostname;

        console.log(chalk.green("✅ Valid URL syntax"));
        console.log(chalk.blue("Protocol:"), url.protocol);
        console.log(chalk.blue("Hostname:"), hostname);
        console.log(chalk.blue("Path:"), url.pathname);
        console.log(chalk.blue("Query:"), url.search || "(none)");
        console.log(chalk.blue("Full URL Length:"), urlStr.length);

        if (blacklistedDomains.has(hostname)) {
          console.log(chalk.red("⚠️ Domain is blacklisted!"));
        }

        if (isIpDomain(hostname)) {
          console.log(chalk.red("⚠️ Domain is an IP address, suspicious!"));
        }

        if (suspiciousWordsInText(urlStr)) {
          console.log(chalk.red("⚠️ Suspicious words detected in URL!"));
        } else {
          console.log(chalk.green("No suspicious words detected in URL."));
        }

        if (urlStr.length > 100) {
          console.log(
            chalk.yellow("⚠️ URL is very long, might be suspicious.")
          );
        }

        if (hasExcessiveEncoding(urlStr)) {
          console.log(chalk.yellow("⚠️ Excessive URL encoding detected."));
        }

        if (excessiveSubdomains(hostname)) {
          console.log(chalk.yellow("⚠️ Excessive number of subdomains."));
        }

        if (url.protocol !== "https:") {
          console.log(chalk.yellow("⚠️ URL does not use HTTPS."));
        } else {
          console.log(chalk.green("URL uses HTTPS."));
        }

        try {
          const addresses = await dns.resolve(hostname);
          console.log(chalk.green("DNS resolved:"), addresses.join(", "));
        } catch {
          console.log(chalk.red("DNS lookup failed. Domain may not exist."));
        }

        const redirect = await checkRedirection(urlStr);
        if (redirect) {
          console.log(chalk.yellow("⚠️ URL redirects to:"), redirect);
          if (suspiciousWordsInText(redirect)) {
            console.log(
              chalk.red("⚠️ Redirect target URL contains suspicious words!")
            );
          }
        } else {
          console.log(chalk.green("No redirection detected."));
        }
      } catch (err) {
        console.log(chalk.red("Error processing URL:", err));
        process.exit(1);
      }
    });
}
