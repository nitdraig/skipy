import { randomBytes } from "crypto";

const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789";

function generateSlug(length = 6): string {
  const bytes = randomBytes(length);
  let slug = "";
  for (let i = 0; i < length; i++) {
    slug += alphabet[bytes[i] % alphabet.length];
  }
  return slug;
}

export default generateSlug;
