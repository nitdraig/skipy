import LinkModel from "../models/LinkModel.js";
import isValidUrl from "../utils/urlValidator.js";
import generateSlug from "../utils/slugGenerator.js";

async function createShortLink(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  let { originalUrl } = req.body;

  if (
    !originalUrl.startsWith("http://") &&
    !originalUrl.startsWith("https://")
  ) {
    originalUrl = "https://" + originalUrl;
  }

  if (!isValidUrl(originalUrl)) {
    return res.status(400).json({ error: "URL no válida" });
  }

  try {
    const existingLink = await LinkModel.findOne({ originalUrl });

    if (existingLink) {
      const frontendDomain = req.headers.origin || `http://${req.headers.host}`;
      const shortenedUrl = `${frontendDomain}/${existingLink.slug}`;
      return res.status(200).json({ shortenedUrl });
    }

    const slug = generateSlug();

    await LinkModel.create({ originalUrl, slug });

    const frontendDomain = req.headers.origin || `http://${req.headers.host}`;

    const shortenedUrl = `${frontendDomain}/${slug}`;

    res.status(200).json({ shortenedUrl });
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function redirectToOriginalUrl(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { slug } = req.params;

  if (!slug) {
    return res.status(400).json({ error: "Slug no proporcionado" });
  }

  try {
    const existingLink = await LinkModel.findOne({ slug });

    if (!existingLink) {
      return res.status(404).json({ error: "Enlace no encontrado" });
    }

    const redirectedUrl = existingLink.originalUrl;
    res.status(200).json({ redirectedUrl });
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

export { createShortLink, redirectToOriginalUrl };
