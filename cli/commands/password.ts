import { Command } from "commander";
import chalk from "chalk";

export function registerPasswordCommands(program: Command) {
  const passwordCmd = program
    .command("password")
    .description("Random Password generator");

  passwordCmd
    .command("generate")
    .description("Generate a random password")
    .option("-l, --length <number>", "Password length", "12")
    .option("-u, --uppercase", "Include uppercase letters")
    .option("-d, --lowercase", "Include lowercase letters")
    .option("-n, --numbers", "Include numbers")
    .option("-s, --symbols", "Include symbols")
    .action((opts) => {
      const length = parseInt(opts.length, 10);
      if (isNaN(length) || length <= 0) {
        console.error(chalk.red("Length must be a positive number"));
        process.exit(1);
      }

      let charset = "";
      if (opts.uppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      if (opts.lowercase) charset += "abcdefghijklmnopqrstuvwxyz";
      if (opts.numbers) charset += "0123456789";
      if (opts.symbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";

      if (charset.length === 0) {
        console.error(
          chalk.red("You must select at least one character set option")
        );
        process.exit(1);
      }

      let password = "";
      for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
      }

      console.log(chalk.green("Generated password:"));
      console.log(password);
    });
}
