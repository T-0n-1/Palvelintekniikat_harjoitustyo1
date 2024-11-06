import express, { Request, Response } from "express";
// import { UserInfo } from "os";

const app: express.Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send(`
    <html>
    <head>
  
    <h1>Task 3</h1>
    <p>Server is running on http://localhost:${port}</p>
    <h2>Request method ${req.method}</h2>
    <p>Request URL ${req.url}</p>
    <p>Request path ${req.path}</p>
    <p>Request hostname ${req.hostname}</p>
    </head>
    <body></body>
    </html>
    `);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
