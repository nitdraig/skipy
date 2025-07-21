# skipy-devtools-cli

**Skipy Developer Tools CLI** — A multipurpose command-line tool for developers. Generate passwords, create QR codes, manage JWTs, generate fake data, and much more — all from your terminal.

---

## Features

- Secure password generator
- QR code generation and scanning in terminal
- JWT (JSON Web Token) creation, verification, and decoding
- Fake data generation with Faker.js
- URL validation and manipulation
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
devtools --help
```

This will display the main help and list of available commands.

---

### Basic commands

```bash
devtools password      # Generate a secure password
devtools qr        # Generate a QR code in the terminal
devtools jwt                # Create, verify, or decode JSON Web Tokens
devtools fake      # Generate fake test data
devtools password generate -l 16 -u -d -n -s #It will generate a password of 16 characters that include uppercase, lowercase, numbers and symbols.
devtools url shorten "https://example.com/long-url"
devtools url-validator "https://example.com/"
devtools palette --random  # Random Palette
devtools palette --base "#3498db" # From Base color
devtools palette --light "#3498db" #

```

Example to generate a password:

```bash
devtools password--length 16 --symbols
```

Example to generate a QR code:

```bash
devtools qr generate "https://example.com"
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
devtools <command>
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
