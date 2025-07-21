#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const faker_1 = require("./commands/faker");
const qr_1 = require("./commands/qr");
const jwt_1 = require("./commands/jwt");
const password_1 = require("./commands/password");
const urlValidator_1 = require("./commands/urlValidator");
const paletteGenerator_1 = require("./commands/paletteGenerator");
const welcome_1 = require("./commands/welcome");
const urlShortener_1 = require("./commands/urlShortener");
const program = new commander_1.Command();
program.name("skipy").description("Skipy Developer Tools CLI").version("1.0.0");
(0, welcome_1.registerWelcomeCommand)(program);
(0, jwt_1.registerJwtCommands)(program);
(0, password_1.registerPasswordCommands)(program);
(0, urlValidator_1.registerUrlValidatorCommands)(program);
(0, urlShortener_1.registerUrlShortenerCommands)(program);
(0, faker_1.registerFakerCommands)(program);
(0, qr_1.registerQrCommands)(program);
(0, paletteGenerator_1.registerColorPaletteCommand)(program);
program.action(() => {
    (0, welcome_1.welcomeHandler)();
});
program.parse(process.argv);
