import express, { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: express.Express = express();
const port: number = Number(process.env.PORT) || 3000;

app.use(express.static("public"));

app.get("/", (req: Request, res: Response) => {
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
    <p>Server is running on http://localhost:${port}</p>
    <h2>Request method ${req.method}</h2>
    <p>Request URL ${req.url}</p>
    <p>Request path ${req.path}</p>
    <p>Request hostname ${req.hostname}</p>
    </body>
    </html>
    `);
});

app.get("/api/students", (req: Request, res: Response) => {
  res.json([
    {
      id: 1,
      name: "John Doe",
      age: 20,
    },
    {
      id: 2,
      name: "Jane Doe",
      age: 22,
    },
  ]);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

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
