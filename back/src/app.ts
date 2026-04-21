import express from "express";
import cors from "cors";
import helmet from "helmet";
import linkRouter from "./domain/url-shorter/routes/linkRoutes";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import qrGeneratorRouter from "./domain/qr-generator/routes/qr-generator";
import { createPulseRouter } from "./shared/routes/pulseRoutes";
const app = express();

app.use(express.json());
app.get("/", (req, res) => {
  res.send(`
     <title>Skipy API | Your Multipurpose Tool for Developers</title>
     <div style="font-family: Arial, sans-serif; text-align: center; margin-top: 50px;">
        <h1>Welcome to Skipy API </h1>
        <p>Spiky is a multi-tool application designed to make the lives of developers and IT professionals easier. Offers a variety of useful utilities for daily tasks, from generating shortened links to creating credit card information for testing. The application is designed to be centralized and in the future we plan to add more tools to expand its usefulness.<p/>
        <p>This is the root of the API. For more information, see the <a href="https://github.com/nitdraig/skipy" style="color: #2b4c7e;">Documentation</a></p>
        <a href="https://skipy.click" style="color: #2b4c7e;"> -> Skipy Web <- </a>
     </div>
  `);
});
app.use(
  cors({
    origin: "https://www.skipy.click",
    //  origin: "*",
  }),
);
app.use(cors());
app.use(helmet());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again later.",
  }),
);
app.use(mongoSanitize());

app.use(express.json());

app.use("/url-shorter", linkRouter);
app.use("/qr-generator", qrGeneratorRouter);

const pulseRouter = createPulseRouter();
if (pulseRouter) {
  app.use(pulseRouter);
}

export default app;
