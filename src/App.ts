import express, { Request, Response } from "express";
import studentsRouter from "./routes/students/studentsAPI";
import { greeting, getPort, isOriginAllowed, setHeaders } from "./functions";
import dotenv from "dotenv";
import Joi from "joi";
import path from "path";

dotenv.config();

const app: express.Express = express();
const port: number = Number(process.env.PORT) || 3000;
const title: string = "Node.js Express TypeScript";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

// Students API route
app.use("/api", studentsRouter);

// CORS middleware
app.use((req: Request, res: Response, next) => {
  const origin: string = req.headers.origin || "";
  if (isOriginAllowed(origin)) {
    setHeaders(res, origin);
  }
  next();
});

// Home route
app.get("/", (req: Request, res: Response) => {
  const querySchema = Joi.object().unknown(false);
  const { error } = querySchema.validate(req.query);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    res.render("index", {
      title: title,
      greeting: `${greeting()} - this is the main app's landing page`,
      method: req.method,
      path: req.path,
      hostname: req.hostname,
      port: `${port} - BrowserSync using port ${getPort()} for dev purposess`,
    });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server for App1 is running on http://localhost:${port}`);
});
