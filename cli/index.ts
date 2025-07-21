import { Command } from "commander";
import { registerJwtCommands } from "./commands/jwt";
import { registerJsonCommands } from "./commands/json";
import { registerUrlCommands } from "./commands/url";
import { registerFakerCommands } from "./commands/faker";
import { registerQrCommands } from "./commands/qr";

const program = new Command();

program.name("devtools").description("Developer Tools CLI").version("1.0.0");

registerJwtCommands(program);
registerJsonCommands(program);
registerUrlCommands(program);
registerFakerCommands(program);
registerQrCommands(program);

program.parse(process.argv);
