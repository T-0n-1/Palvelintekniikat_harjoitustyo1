import express, { Request, Response, Express } from "express";
import dotenv from "dotenv";
import Joi from "joi";
import fruitsRouter from "./routes/fruits/fruitsAPI";

const app: Express = express();
const port: number = Number(process.env.SERVERPORT) || 3001;
dotenv.config();

app.use("/api", fruitsRouter);

app.get("/", (req: Request, res: Response) => {
  const schema = Joi.object().unknown(false);
  const { error } = schema.validate(req.query);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    res.send("Fruits api main");
  }
});

app.listen(port, () => {
  console.log(`Server for App2 is running on port ${port}`);
});
