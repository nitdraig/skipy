#!/usr/bin/env node

const { Command } = require("commander");
const chalk = require("chalk");

const program = new Command();

program
  .name("skipy")
  .description("Multipurpose dev CLI: passwords, short links, encoders, etc.")
  .version("1.0.0");

program
  .command("password")
  .description("Generate a random password")
  .option("-l, --length <number>", "Password length", "12")
  .option("-s, --symbols", "Include symbols")
  .action((options) => {
    const length = parseInt(options.length);
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const symbols = "!@#$%^&*()_+[]{}";

    let allChars = chars;
    if (options.symbols) allChars += symbols;

    let password = "";
    for (let i = 0; i < length; i++) {
      password += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }

    console.log(chalk.green(`Generated password: ${password}`));
  });

program.parse(process.argv);
