import express from "express";

const app: express.Express = express();

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

// Function for defining port depending on environment
function getPort(): number {
  if (app.get("env") === "development") {
    return Number(process.env.BROWSERSYNCPORT);
  } else {
    return Number(process.env.PORT);
  }
}

export { greeting, getPort };
