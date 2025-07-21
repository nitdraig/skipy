import { Command } from "commander";
import chalk from "chalk";

export function registerUrlCommands(program: Command) {
  const urlCmd = program.command("url").description("URL utilities");

  urlCmd
    .command("validate")
    .argument("<url>", "URL to validate")
    .description("Check if URL is valid")
    .action((url) => {
      try {
        new URL(url);
        console.log(chalk.green("✅ URL is valid"));
      } catch {
        console.error(chalk.red("❌ Invalid URL"));
      }
    });
}
