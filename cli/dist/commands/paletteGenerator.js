"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerColorPaletteCommand = registerColorPaletteCommand;
const chalk_1 = __importDefault(require("chalk"));
const lighten = (hex, amount) => {
    let col = hex.replace("#", "");
    if (col.length === 3) {
        col = col[0] + col[0] + col[1] + col[1] + col[2] + col[2];
    }
    const num = parseInt(col, 16);
    let r = (num >> 16) + amount;
    let g = ((num >> 8) & 0x00ff) + amount;
    let b = (num & 0x0000ff) + amount;
    r = Math.min(255, Math.max(0, r));
    g = Math.min(255, Math.max(0, g));
    b = Math.min(255, Math.max(0, b));
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};
const percentToAmount = (percent) => Math.round(255 * (percent / 100));
function randomColor() {
    return ("#" +
        Math.floor(Math.random() * 0xffffff)
            .toString(16)
            .padStart(6, "0"));
}
function generateRandomPalette() {
    return {
        color1: randomColor(),
        color2: randomColor(),
        color3: randomColor(),
    };
}
function generatePaletteWithBase(base60) {
    const amount10 = percentToAmount(10);
    const amount30 = percentToAmount(30);
    return {
        color1: lighten(base60, -amount30),
        color2: base60,
        color3: lighten(base60, amount10),
    };
}
function generateLightPalette(base) {
    const amount10 = percentToAmount(10);
    const amount30 = percentToAmount(30);
    return {
        color1: base,
        color2: lighten(base, amount10),
        color3: lighten(base, amount30),
    };
}
function registerColorPaletteCommand(program) {
    const paletteCmd = program
        .command("palette")
        .description("Generate color palettes with different rules");
    paletteCmd
        .option("-r, --random", "Generate 3 random colors")
        .option("-b, --base <hex>", "Generate palette with base color (60%)")
        .option("-l, --light <hex>", "Generate palette with base and 10%, 30% lighter colors")
        .action((options) => {
        if (options.random) {
            const palette = generateRandomPalette();
            console.log(chalk_1.default.cyan("Random Palette:"));
            console.log(palette);
        }
        else if (options.base) {
            const base = options.base.startsWith("#")
                ? options.base
                : "#" + options.base;
            const palette = generatePaletteWithBase(base);
            console.log(chalk_1.default.green("Palette with base 60%:"));
            console.log(palette);
        }
        else if (options.light) {
            const base = options.light.startsWith("#")
                ? options.light
                : "#" + options.light;
            const palette = generateLightPalette(base);
            console.log(chalk_1.default.magenta("Light Palette (base + 10%, 30% lighter):"));
            console.log(palette);
        }
        else {
            console.log(chalk_1.default.red("Please provide an option. Use --help for more information."));
        }
    });
}
