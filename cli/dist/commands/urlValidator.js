"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUrlValidatorCommands = registerUrlValidatorCommands;
const valid_url_1 = __importDefault(require("valid-url"));
const chalk_1 = __importDefault(require("chalk"));
const promises_1 = __importDefault(require("dns/promises"));
const url_1 = require("url");
function isIpDomain(domain) {
    return /^(\d{1,3}\.){3}\d{1,3}$/.test(domain);
}
function suspiciousWordsInText(text) {
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
function hasExcessiveEncoding(url) {
    const count = (url.match(/%/g) || []).length;
    return count > 5;
}
function excessiveSubdomains(hostname) {
    return hostname.split(".").length > 4;
}
function checkRedirection(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(url, { method: "HEAD", redirect: "manual" });
            if (response.status >= 300 && response.status < 400) {
                const location = response.headers.get("location");
                return location || null;
            }
            return null;
        }
        catch (_a) {
            return null;
        }
    });
}
const blacklistedDomains = new Set([
    "malicious.com",
    "spammy.org",
    "phishing.net",
]);
function registerUrlValidatorCommands(program) {
    const urlCmd = program
        .command("url-validator")
        .description("Advanced URL validator");
    urlCmd
        .argument("<url>", "URL to validate")
        .description("Validate URL with advanced heuristics")
        .action((urlStr) => __awaiter(this, void 0, void 0, function* () {
        if (!valid_url_1.default.isWebUri(urlStr)) {
            console.log(chalk_1.default.red("Invalid URL syntax."));
            process.exit(1);
        }
        try {
            const url = new url_1.URL(urlStr);
            const hostname = url.hostname;
            console.log(chalk_1.default.green("✅ Valid URL syntax"));
            console.log(chalk_1.default.blue("Protocol:"), url.protocol);
            console.log(chalk_1.default.blue("Hostname:"), hostname);
            console.log(chalk_1.default.blue("Path:"), url.pathname);
            console.log(chalk_1.default.blue("Query:"), url.search || "(none)");
            console.log(chalk_1.default.blue("Full URL Length:"), urlStr.length);
            if (blacklistedDomains.has(hostname)) {
                console.log(chalk_1.default.red("⚠️ Domain is blacklisted!"));
            }
            if (isIpDomain(hostname)) {
                console.log(chalk_1.default.red("⚠️ Domain is an IP address, suspicious!"));
            }
            if (suspiciousWordsInText(urlStr)) {
                console.log(chalk_1.default.red("⚠️ Suspicious words detected in URL!"));
            }
            else {
                console.log(chalk_1.default.green("No suspicious words detected in URL."));
            }
            if (urlStr.length > 100) {
                console.log(chalk_1.default.yellow("⚠️ URL is very long, might be suspicious."));
            }
            if (hasExcessiveEncoding(urlStr)) {
                console.log(chalk_1.default.yellow("⚠️ Excessive URL encoding detected."));
            }
            if (excessiveSubdomains(hostname)) {
                console.log(chalk_1.default.yellow("⚠️ Excessive number of subdomains."));
            }
            if (url.protocol !== "https:") {
                console.log(chalk_1.default.yellow("⚠️ URL does not use HTTPS."));
            }
            else {
                console.log(chalk_1.default.green("URL uses HTTPS."));
            }
            try {
                const addresses = yield promises_1.default.resolve(hostname);
                console.log(chalk_1.default.green("DNS resolved:"), addresses.join(", "));
            }
            catch (_a) {
                console.log(chalk_1.default.red("DNS lookup failed. Domain may not exist."));
            }
            const redirect = yield checkRedirection(urlStr);
            if (redirect) {
                console.log(chalk_1.default.yellow("⚠️ URL redirects to:"), redirect);
                if (suspiciousWordsInText(redirect)) {
                    console.log(chalk_1.default.red("⚠️ Redirect target URL contains suspicious words!"));
                }
            }
            else {
                console.log(chalk_1.default.green("No redirection detected."));
            }
        }
        catch (err) {
            console.log(chalk_1.default.red("Error processing URL:", err));
            process.exit(1);
        }
    }));
}
