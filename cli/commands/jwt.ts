import { Command } from "commander";
import jwt from "jsonwebtoken";
import chalk from "chalk";

export function registerJwtCommands(program: Command) {
  const jwtCmd = program.command("jwt").description("JWT encoder/decoder");

  jwtCmd
    .command("decode")
    .argument("<token>", "JWT token")
    .description("Decode a JWT token")
    .action((token) => {
      try {
        const decoded = jwt.decode(token, { complete: true });
        console.log(chalk.green("Header:"));
        console.dir(decoded?.header, { depth: null });
        console.log(chalk.green("Payload:"));
        console.dir(decoded?.payload, { depth: null });
      } catch (err) {
        console.error(chalk.red("Invalid token"));
      }
    });
}
