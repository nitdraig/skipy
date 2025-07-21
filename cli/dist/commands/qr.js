"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerQrCommands = registerQrCommands;
const qrcode_terminal_1 = __importDefault(require("qrcode-terminal"));
function registerQrCommands(program) {
    const qrCmd = program.command("qr").description("QR Code tool");
    qrCmd
        .command("generate")
        .argument("<text>", "Text to convert")
        .description("Generate QR code in terminal")
        .action((text) => {
        qrcode_terminal_1.default.generate(text, { small: true });
    });
}
