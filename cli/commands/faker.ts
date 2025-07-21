import { Command } from "commander";
import { faker } from "@faker-js/faker";

export function registerFakerCommands(program: Command) {
  const fakerCmd = program.command("faker").description("Generate fake data");

  fakerCmd
    .command("user")
    .description("Generate fake user")
    .action(() => {
      console.log({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        address: faker.location.streetAddress(),
      });
    });
}
