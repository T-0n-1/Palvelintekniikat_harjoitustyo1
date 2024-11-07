import express, { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: express.Express = express();
const port: number = Number(process.env.PORT) || 3000;

app.use(express.static("public"));

const students = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    credits: 150,
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Doe",
    credits: 245,
  },
  {
    id: 3,
    firstName: "Tom",
    lastName: "Smith",
    credits: 235,
  },
];

// Routes
// Home route
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
    <h2>Server is running on http://localhost:${port}</h2>
    <p>Request method ${req.method}</p>
    <p>Request path ${req.path}</p>
    <p>Request hostname ${req.hostname}</p>
    </body>
    </html>
    `);
});

// API route to get all students
app.get("/api/students", (req: Request, res: Response) => {
  res.json(students);
});

// API route to get a student by id
app.get("/api/students/:id", (req: Request, res: Response) => {
  const student = students.find(
    (student) => student.id === Number(req.params.id),
  );
  if (student) {
    res.json(student);
  } else {
    res.status(404).json({ id: -1, firstName: "", lastName: "", credits: 0 });
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
