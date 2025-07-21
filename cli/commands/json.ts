import { Command } from "commander";
import fs from "fs";
import chalk from "chalk";

export function registerJsonCommands(program: Command) {
  const jsonCmd = program.command("json").description("JSON formatter");

  jsonCmd
    .command("format")
    .argument("<file>", "Path to JSON file")
    .description("Format and validate JSON")
    .action((file) => {
      try {
        const data = fs.readFileSync(file, "utf-8");
        const parsed = JSON.parse(data);
        console.log(chalk.green(JSON.stringify(parsed, null, 2)));
      } catch {
        console.error(chalk.red("❌ Invalid JSON file or content"));
      }
    });
}
