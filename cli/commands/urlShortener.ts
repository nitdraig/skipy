import { Command } from "commander";
import chalk from "chalk";

export function registerUrlShortenerCommands(program: Command) {
  const urlCmd = program.command("url").description("URL shortener");

  urlCmd
    .command("shorten")
    .argument("<url>", "URL to shorten")
    .description("Shorten a given URL")
    .action(async (url) => {
      if (!url.trim()) {
        console.error(chalk.red("Please enter a valid URL to shorten!"));
        process.exit(1);
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

      try {
        const response = await fetch(`${apiUrl}/url-shorter/shorter`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ originalUrl: url }),
        });

        const data = await response.json();

        if (!response.ok || !data.shortenedUrl) {
          throw new Error(data.message || "Error shortening the URL");
        }

        console.log(chalk.green("URL shortened successfully!"));
        console.log(chalk.blue(data.shortenedUrl));
      } catch (error: any) {
        console.error(
          chalk.red("Error shortening the URL:"),
          error.message || error
        );
        process.exit(1);
      }
    });
}
