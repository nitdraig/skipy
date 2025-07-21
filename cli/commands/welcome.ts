import { Command } from "commander";
import chalk from "chalk";
import figlet from "figlet";
import ora from "ora";

export function registerWelcomeCommand(program: Command) {
  const welcomeCmd = program
    .command("welcome")
    .description("Show the Skipy project presentation");

  welcomeCmd.action(async () => {
    const spinner = ora({
      text: chalk.blue("Loading Skipy..."),
      spinner: "dots",
    }).start();

    await new Promise((r) => setTimeout(r, 1500));
    spinner.succeed(chalk.green("Ready!"));

    console.log(
      chalk.yellow(
        figlet.textSync("Skipy", {
          horizontalLayout: "default",
          verticalLayout: "default",
        })
      )
    );

    console.log(chalk.cyan.bold("Your Multipurpose Tool for Developers\n"));

    console.log(
      chalk.whiteBright(
        "Skipy is a multi-tool application designed to make the lives of developers and IT professionals easier.\n" +
          "Offers a variety of useful utilities for daily tasks, from generating shortened links to creating credit card information for testing.\n" +
          "The application is designed to be centralized and in the future we plan to add more tools to expand its usefulness.\n"
      )
    );

    console.log(chalk.magentaBright("Happy Coding! 🚀"));
  });
}
