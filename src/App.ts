import express, { Request, Response } from "express";
import dotenv from "dotenv";
import Joi from "joi";
import studentsRouter from "./routes/studentsAPI";

dotenv.config();

const app: express.Express = express();
const port: number = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use(express.static("public"));

// Students API route
app.use("/api/students", studentsRouter);

// Home route
app.get("/", (req: Request, res: Response) => {
  const querySchema = Joi.object().unknown(false);
  const { error } = querySchema.validate(req.query);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    res.send(`
      <html>
      <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Node.js Express TypeScript</title>
      <link rel="stylesheet" href="css/styles.css">
      </head>
      
      <body>
      <h1>${greeting()}</h1>
      <h2>Server is running on http://localhost:${port}</h2>
      <p>Request method ${req.method}</p>
      <p>Request path ${req.path}</p>
      <p>Request hostname ${req.hostname}</p>
      </body>
      </html>
      `);
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Greeting function
function greeting(): string {
  const now = new Date();
  const hour = now.getHours();

  if (hour >= 0 && hour < 6) {
    return "Good night";
  }
  if (hour >= 6 && hour < 12) {
    return "Good morning";
  }
  if (hour >= 12 && hour < 18) {
    return "Good afternoon";
  }
  if (hour >= 18 && hour < 24) {
    return "Good evening";
  }

  return "Hello";
}
