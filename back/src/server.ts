import dotenv from "dotenv";
import app from "./app";
import mongoose from "mongoose";

dotenv.config();

const PORT = process.env.PORT || 5000;
const DB_URI = process.env.DB_URI!;

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error de conexión a la base de datos:", err);
  });
