"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerJwtCommands = registerJwtCommands;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const chalk_1 = __importDefault(require("chalk"));
const crypto_1 = __importDefault(require("crypto"));
function registerJwtCommands(program) {
    const jwtCmd = program
        .command("jwt")
        .description("JWT encoder/decoder & Generator");
    jwtCmd
        .command("decode")
        .argument("<token>", "JWT token")
        .description("Decode a JWT token")
        .action((token) => {
        try {
            const decoded = jsonwebtoken_1.default.decode(token, { complete: true });
            if (!decoded)
                throw new Error("Invalid token");
            console.log(chalk_1.default.green("Header:"));
            console.dir(decoded.header, { depth: null });
            console.log(chalk_1.default.green("Payload:"));
            console.dir(decoded.payload, { depth: null });
        }
        catch (err) {
            console.error(chalk_1.default.red("Invalid token"));
            process.exit(1);
        }
    });
    jwtCmd
        .command("generate-secret")
        .description("Generate a random JWT secret key in hex format")
        .option("-l, --length <number>", "Secret length in hex characters (16-256)", "64")
        .action(({ length }) => {
        const len = parseInt(length, 10);
        if (isNaN(len) || len < 16 || len > 256) {
            console.error(chalk_1.default.red("Error: Length must be a number between 16 and 256"));
            process.exit(1);
        }
        const bytes = Math.ceil(len / 2);
        const secret = crypto_1.default.randomBytes(bytes).toString("hex").slice(0, len);
        console.log(chalk_1.default.green("Generated secret:"));
        console.log(secret);
    });
    jwtCmd
        .command("encode")
        .description("Encode and sign a JWT token")
        .requiredOption("-p, --payload <json>", "Payload JSON string")
        .requiredOption("-s, --secret <secret>", "Secret key for signing")
        .option("-h, --header <json>", 'Header JSON string (default: \'{"alg":"HS256","typ":"JWT"}\')', '{"alg":"HS256","typ":"JWT"}')
        .action(({ payload, secret, header }) => {
        try {
            const parsedPayload = JSON.parse(payload);
            const parsedHeader = JSON.parse(header);
            const token = jsonwebtoken_1.default.sign(parsedPayload, secret, {
                algorithm: parsedHeader.alg || "HS256",
                header: parsedHeader,
            });
            console.log(chalk_1.default.green("Encoded JWT:"));
            console.log(token);
        }
        catch (err) {
            console.error(chalk_1.default.red("Failed to encode JWT:"), err.message);
            process.exit(1);
        }
    });
}
