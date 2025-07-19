import { customAlphabet } from "nanoid";

const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789";

const generateSlug = customAlphabet(alphabet, 6);

export default generateSlug;
