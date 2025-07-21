#!/usr/bin/env node

import { Command } from "commander";
import { registerFakerCommands } from "./commands/faker";
import { registerQrCommands } from "./commands/qr";
import { registerJwtCommands } from "./commands/jwt";
import { registerPasswordCommands } from "./commands/password";
import { registerUrlValidatorCommands } from "./commands/urlValidator";
import { registerColorPaletteCommand } from "./commands/paletteGenerator";
import { registerWelcomeCommand } from "./commands/welcome";

const program = new Command();

program.name("skipy").description("Skipy Developer Tools CLI").version("1.0.0");

registerWelcomeCommand(program);
registerJwtCommands(program);
registerPasswordCommands(program);
registerUrlValidatorCommands(program);
registerFakerCommands(program);
registerQrCommands(program);
registerColorPaletteCommand(program);

program.parse(process.argv);
