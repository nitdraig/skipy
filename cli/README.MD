# skipy-devtools-cli

**Skipy Developer Tools CLI** — A multipurpose command-line tool for developers. Generate passwords, create QR codes, manage JWTs, generate fake data, and much more — all from your terminal.

---

## Features

- Secure password generator
- QR code generation and scanning in terminal
- JWT (JSON Web Token) creation, verification, and decoding
- Fake data generation with Faker.js
- URL validation and manipulation
- Palette generator with 60%, 30%, 10% Rule
- And many other developer utilities

---

## Installation

### Via npm (recommended)

```bash
npm install -g skipy-devtools-cli
```

### From source (for development)

```bash
git clone https://github.com/nitdraig/skipy.git
cd skipy
npm install
npm run build:cli
npm link
```

---

## Usage

Once installed, run the CLI using the command:

```bash
skipy --help
```

This will display the main help and list of available commands.

---

### Basic commands

```bash
npx skipy password      # Generate a secure password
npx skipy qr        # Generate a QR code in the terminal
npx skipy jwt                # Create, verify, or decode JSON Web Tokens
npx skipy fake      # Generate fake test data
npx skipy password generate -l 16 -u -d -n -s #It will generate a password of 16 characters that include uppercase, lowercase, numbers and symbols.
npx skipy password generate-random "-l 12"
npx skipy url shorten "https://example.com/long-url"
npx skipy url-validator "https://example.com/"
npx skipy palette --random  # Random Palette
npx skipy palette --base "#3498db" # From Base color
npx skipy palette --light "#3498db" #

```

Example to generate a password:

```bash
npx skipy password--length 16 --symbols
```

Example to generate a QR code:

```bash
npx skipy qr generate "https://example.com"
```

---

## Development

To contribute or customize the CLI:

1. Clone the repository

2. Install dependencies

```bash
npm install
```

3. Build the TypeScript source

```bash
npm run build:cli
```

4. Link the CLI locally for testing

```bash
npm link
```

5. Run the CLI

```bash
npx skipy <command>
```

---

## Configuration

- Written in TypeScript and compiled to JavaScript for Node.js.
- Uses [`commander`](https://github.com/tj/commander.js/) for CLI framework, [`chalk`](https://github.com/chalk/chalk) for terminal colors, and [`qrcode-terminal`](https://github.com/gtanner/qrcode-terminal) for QR code generation.

---

## License

GNU-3 © Agustin Avellaneda

---

## Useful Links

- Repository: [https://github.com/nitdraig/skipy](https://github.com/nitdraig/skipy)
- Issues: [https://github.com/nitdraig/skipy/issues](https://github.com/nitdraig/skipy/issues)
- npm: [https://www.npmjs.com/package/skipy-devtools-cli](https://www.npmjs.com/package/skipy-devtools-cli)
