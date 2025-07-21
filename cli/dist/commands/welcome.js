"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.welcomeHandler = welcomeHandler;
exports.registerWelcomeCommand = registerWelcomeCommand;
const chalk_1 = __importDefault(require("chalk"));
const figlet_1 = __importDefault(require("figlet"));
const ora_1 = __importDefault(require("ora"));
function welcomeHandler() {
    return __awaiter(this, void 0, void 0, function* () {
        const spinner = (0, ora_1.default)({
            text: chalk_1.default.blue("Loading Skipy..."),
            spinner: "dots",
        }).start();
        yield new Promise((r) => setTimeout(r, 1500));
        spinner.succeed(chalk_1.default.green("Ready!"));
        console.log(chalk_1.default.yellow(figlet_1.default.textSync("Skipy", {
            horizontalLayout: "default",
            verticalLayout: "default",
        })));
        console.log(chalk_1.default.cyan.bold("Your Multipurpose Tool for Developers\n"));
        console.log(chalk_1.default.whiteBright("Skipy is a multi-tool application designed to make the lives of developers and IT professionals easier.\n" +
            "Offers a variety of useful utilities for daily tasks, from generating shortened links to creating credit card information for testing.\n" +
            "The application is designed to be centralized and in the future we plan to add more tools to expand its usefulness.\n"));
        console.log(chalk_1.default.magentaBright("Happy Coding! 🚀"));
    });
}
function registerWelcomeCommand(program) {
    program
        .command("welcome")
        .description("Show the Skipy project presentation")
        .action(welcomeHandler);
}
