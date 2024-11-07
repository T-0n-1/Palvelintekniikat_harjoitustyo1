import express, { Request, Response } from "express";
import dotenv from "dotenv";
import Joi from "joi";

dotenv.config();

const app: express.Express = express();
const port: number = Number(process.env.PORT) || 3000;

app.use(express.json());
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
  const querySchema = Joi.object().unknown(false);
  const { error } = querySchema.validate(req.query);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    res.json(students);
  }
});

// API route to get a student by id
app.get("/api/students/:id", (req: Request, res: Response) => {
  const schema = Joi.object({
    id: Joi.number().integer().min(1).max(9999),
  }).unknown(false);
  const { error } = schema.validate(req.params);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    const student = students.find(
      (student) => student.id === Number(req.params.id),
    );
    if (student) {
      res.json(student);
    } else {
      res.status(404).json({ id: -1, firstName: "", lastName: "", credits: 0 });
    }
  }
});

// API route to add a student
app.post(
  "/api/students/:firstName/:lastName/:credits",
  (req: Request, res: Response) => {
    const schema = Joi.object({
      firstName: Joi.string().min(2).max(15).required(),
      lastName: Joi.string().min(2).max(20).required(),
      credits: Joi.number().integer().min(0).max(300).required(),
    }).unknown(false);
    const { error, value } = schema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
    } else {
      const student = {
        id: students.length + 1,
        firstName: value.firstName,
        lastName: value.lastName,
        credits: value.credits,
      };
      students.push(student);
      res.json(student);
    }
  },
);

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
