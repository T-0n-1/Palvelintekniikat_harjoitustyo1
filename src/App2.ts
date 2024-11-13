import express, { Request, Response, Express } from "express";
import dotenv from "dotenv";
import Joi from "joi";
import fruitsRouter from "./routes/fruits/fruitsAPI";
import path from "path";
import cors from "cors";
import { getPort } from "./functions";

const app: Express = express();
const port: number = Number(process.env.SERVERPORT) || 3001;
const greeting: string = "Fruit API main";
const title: string = "Fruit API";
dotenv.config();

app.use(
  cors({
    origin: `http://${process.env.SERVERNAME}:${getPort()}`,
  }),
);
app.use("/api", fruitsRouter);
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req: Request, res: Response) => {
  const schema = Joi.object().unknown(false);
  const { error } = schema.validate(req.query);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    res.render("index", {
      title: title,
      greeting: greeting,
      method: req.method,
      path: req.path,
      hostname: req.hostname,
      port: port,
    });
  }
});

app.listen(port, () => {
  console.log(`Server for App2 is running on port ${port}`);
});
