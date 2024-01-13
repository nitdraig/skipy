import mongoose from "mongoose";
import Link from "../models/Link";

mongoose.connect("mongodb://localhost:27017/linkshortener", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default async function handler(req, res) {
  console.log("Solicitud recibida:", req.body);

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  let { originalUrl } = req.body;

  // Agregar "https://" si no está presente
  if (
    !originalUrl.startsWith("http://") &&
    !originalUrl.startsWith("https://")
  ) {
    originalUrl = "https://" + originalUrl;
  }

  // Validar la URL
  if (!isValidUrl(originalUrl)) {
    return res.status(400).json({ error: "URL no válida" });
  }

  try {
    // Verificar si la URL ya existe en la base de datos
    const existingLink = await Link.findOne({ originalUrl });

    if (existingLink) {
      // Si la URL ya existe, devolver el enlace corto existente
      const shortenedUrl = `${getBaseUrl(req)}/${existingLink.slug}`;
      return res.status(200).json({ shortenedUrl });
    }

    // Generar un slug único
    const slug = generateSlug();

    // Guardar en la base de datos MongoDB
    await Link.create({ originalUrl, slug });

    const shortenedUrl = `${getBaseUrl(req)}/${slug}`;
    res.status(200).json({ shortenedUrl });
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

// Función para validar una URL
function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

// Función para generar un slug único
function generateSlug() {
  // Puedes utilizar bibliotecas como `shortid` o `nanoid`
  return Math.random().toString(36).substring(2, 8);
}

// Función para obtener la URL base del servidor
function getBaseUrl(req) {
  const baseUrl =
    req.headers["x-forwarded-host"] || `http://${req.headers.host}`;
  return baseUrl;
}
