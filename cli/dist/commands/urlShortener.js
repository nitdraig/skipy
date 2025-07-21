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
exports.registerUrlShortenerCommands = registerUrlShortenerCommands;
const chalk_1 = __importDefault(require("chalk"));
function registerUrlShortenerCommands(program) {
    const urlCmd = program.command("url").description("URL shortener");
    urlCmd
        .command("shorten")
        .argument("<url>", "URL to shorten")
        .description("Shorten a given URL")
        .action((url) => __awaiter(this, void 0, void 0, function* () {
        if (!url.trim()) {
            console.error(chalk_1.default.red("Please enter a valid URL to shorten!"));
            process.exit(1);
        }
        const apiUrl = "https://api.skipy.click";
        try {
            const response = yield fetch(`${apiUrl}/url-shorter/shorter`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ originalUrl: url }),
            });
            const data = yield response.json();
            if (!response.ok || !data.shortenedUrl) {
                throw new Error(data.message || "Error shortening the URL");
            }
            console.log(chalk_1.default.green("URL shortened successfully!"));
            console.log(chalk_1.default.blue(data.shortenedUrl));
        }
        catch (error) {
            console.error(chalk_1.default.red("Error shortening the URL:"), error.message || error);
            process.exit(1);
        }
    }));
}
