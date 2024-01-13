// models/link.js
import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

const Link = mongoose.models.Link || mongoose.model("Link", linkSchema);

export default Link;
