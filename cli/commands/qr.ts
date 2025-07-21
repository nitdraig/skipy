import { Command } from "commander";
import qrcode from "qrcode-terminal";

export function registerQrCommands(program: Command) {
  const qrCmd = program.command("qr").description("QR Code tool");

  qrCmd
    .command("generate")
    .argument("<text>", "Text to convert")
    .description("Generate QR code in terminal")
    .action((text) => {
      qrcode.generate(text, { small: true });
    });
}
