import express, { Request, Response } from "express";
import studentsRouter from "./routes/studentsAPI";
import { greeting, getPort } from "./functions";
import dotenv from "dotenv";
import Joi from "joi";
import path from "path";

dotenv.config();

const app: express.Express = express();
const port: number = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

// Students API route
app.use("/api/students", studentsRouter);

// Home route
app.get("/", (req: Request, res: Response) => {
  const querySchema = Joi.object().unknown(false);
  const { error } = querySchema.validate(req.query);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    res.render("index", {
      greeting: greeting(),
      method: req.method,
      path: req.path,
      hostname: req.hostname,
      port: getPort(),
    });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
