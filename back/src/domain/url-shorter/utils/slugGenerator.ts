const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789";

let generateSlug: (size?: number) => string;

(async () => {
  const { customAlphabet } = await import("nanoid");
  generateSlug = customAlphabet(alphabet, 6);
})();

export default function getSlug(): string {
  if (!generateSlug) throw new Error("Slug generator not initialized yet.");
  return generateSlug();
}
