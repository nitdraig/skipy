````markdown
# 🧱 Skipy CLI

A lightweight command-line version of **Skipy**, built for speed and convenience. Run tools instantly using `npx`.

---

## 🚀 Quick Start

```bash
npx skipy-cli [command] [options]
```
````

> ⚠️ No global installation required.

---

## 📌 Available Commands

### 🔐 `password`

Generates a random password.

```bash
npx skipy-cli password --length 16 --symbols
```

**Options:**

| Flag        | Description                        | Default |
| ----------- | ---------------------------------- | ------- |
| `--length`  | Password length                    | 12      |
| `--symbols` | Include special characters (`!@#`) | false   |

---

### 🔑 `jwt`

Encode or decode JSON Web Tokens.

```bash
npx skipy-cli jwt encode '{"user":"admin"}' --secret=secret123
npx skipy-cli jwt decode eyJhbGciOi...
```

**Modes:**

- `encode <payload>`: Encode a JSON object as a JWT
- `decode <token>`: Decode an existing JWT
- `--secret`: Optional secret to sign/verify the token

---

### 🧾 `faker`

Generate fake test data.

```bash
npx skipy-cli faker --type=email
```

**Supported types:**

- `name`
- `email`
- `address`
- `phone`
- `company`

---

### 🧪 More Commands (in progress)

- `shorten`: Create short URLs
- `qr`: Generate QR code from URL
- `encode`: Convert text between formats (Base64, ROT13, etc.)

---

## 📊 Examples

```bash
# Generate a strong 20-character password
npx skipy-cli password --length 20 --symbols

# Decode a JWT token
npx skipy-cli jwt decode eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Generate a fake name
npx skipy-cli faker --type=name
```

---

## 🤝 Contribute to the CLI

Want to help improve the CLI or add more tools?
👉 [Open an Issue or Pull Request](https://github.com/nitdraig/skipy)

---

## 📄 License

This CLI is licensed under the **GNU General Public License v3.0**.
[View License](https://github.com/nitdraig/skipy/blob/main/LICENSE)

```

---

Would you like me to generate these as actual files ready for GitHub, or include badges and links for auto-generated documentation (like for npm CLI tools)?
```
