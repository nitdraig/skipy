"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerPasswordCommands = registerPasswordCommands;
const chalk_1 = __importDefault(require("chalk"));
function registerPasswordCommands(program) {
    const passwordCmd = program
        .command("password")
        .description("Random Password generator");
    passwordCmd
        .command("generate-random")
        .description("Generate a completely random password with mixed characters (uppercase, lowercase, numbers, symbols)")
        .option("-l, --length <number>", "Password length (default: 12)", (value) => parseInt(value, 10), 12)
        .action((opts) => {
        const length = opts.length;
        if (isNaN(length) || length <= 0) {
            console.error(chalk_1.default.red("Length must be a positive number"));
            process.exit(1);
        }
        const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
        let password = "";
        for (let i = 0; i < length; i++) {
            password += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        console.log(chalk_1.default.green("Generated random password:"));
        console.log(password);
    });
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
            console.error(chalk_1.default.red("Length must be a positive number"));
            process.exit(1);
        }
        let charset = "";
        if (opts.uppercase)
            charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (opts.lowercase)
            charset += "abcdefghijklmnopqrstuvwxyz";
        if (opts.numbers)
            charset += "0123456789";
        if (opts.symbols)
            charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";
        if (charset.length === 0) {
            console.error(chalk_1.default.red("You must select at least one character set option"));
            process.exit(1);
        }
        let password = "";
        for (let i = 0; i < length; i++) {
            password += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        console.log(chalk_1.default.green("Generated password:"));
        console.log(password);
    });
}
