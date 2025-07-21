"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerFakerCommands = registerFakerCommands;
const faker_1 = require("@faker-js/faker");
function registerFakerCommands(program) {
    const fakerCmd = program.command("faker").description("Generate fake data");
    fakerCmd
        .command("user")
        .description("Generate fake user")
        .action(() => {
        console.log({
            name: faker_1.faker.person.fullName(),
            email: faker_1.faker.internet.email(),
            address: faker_1.faker.location.streetAddress(),
        });
    });
}
