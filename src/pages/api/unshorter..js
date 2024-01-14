// pages/api/unshorter.js
import mongoose from "mongoose";
import Link from "../models/Link";

mongoose.connect("mongodb://localhost:27017/linkshortener", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default async function handler(req, res) {
  const { slug } = req.query;

  try {
    // Buscar la URL original en la base de datos MongoDB
    const link = await Link.findOne({ slug });

    if (link) {
      // Permitir solicitudes CORS desde cualquier origen
      res.setHeader("Access-Control-Allow-Origin", "*");
      console.log("Original URL found:", link.originalUrl);
      // Devolver la URL original en formato JSON
      res.status(200).json({ originalUrl: link.originalUrl });
    } else {
      res.status(404).json({ error: "URL no encontrada" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al desacortar la URL" });
  }
}
