import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import router from "./src/routes/linkRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.get("/", (req, res) => {
  res.send(`
     <title>Skipy API | Your Multipurpose Tool for Developers</title>
     <div style="font-family: Arial, sans-serif; text-align: center; margin-top: 50px;">
        <h1>Welcome to Skipy API </h1>
        <p>Spiky is a multi-tool application designed to make the lives of developers and IT professionals easier. Offers a variety of useful utilities for daily tasks, from generating shortened links to creating credit card information for testing. The application is designed to be centralized and in the future we plan to add more tools to expand its usefulness.<p/>
        <p>This is the root of the API. For more information, see the <a href="https://skipy.top" style="color: #2b4c7e;">Documentation</a></p>
        <a href="https://skipy.top" style="color: #2b4c7e;"> -> Skipy Web <- </a>
     </div>
  `);
});
app.use(
  cors({
    origin: "https://skipy.top",
  })
);

mongoose.connect(process.env.MONGODB, {
  serverSelectionTimeoutMS: 30000,
});

app.use(router);

app.listen(PORT, () => {
  console.log(`Servidor Express en ejecución en el puerto ${PORT}`);
});
