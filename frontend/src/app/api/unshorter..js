import mongoose from "mongoose";
import LinkModel from "../models/LinkModel";

mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default async function getOriginalUrl(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { slug } = req.query;

  if (!slug) {
    return res.status(400).json({ error: "Slug no proporcionado" });
  }

  try {
    // Buscar en la base de datos por el slug
    const existingLink = await LinkModel.findOne({ slug });

    if (!existingLink) {
      return res.status(404).json({ error: "Enlace no encontrado" });
    }

    // Devolver la URL original
    res.status(200).json({ originalUrl: existingLink.originalUrl });
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}
