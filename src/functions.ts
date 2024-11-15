import express from "express";
import dotenv from "dotenv";

const app: express.Express = express();

dotenv.config();

// List of whitelisted origins
const whitelist: string[] = [
  `http://${process.env.SERVERNAME}:${process.env.PORT}`,
  `http://${process.env.SERVERNAME}:${process.env.BROWSERSYNCPORT}`,
  `http://${process.env.SERVERNAME}:${process.env.SERVERPORT}`,
  "https://tonimertanen.fi",
  "https://www.google.com:3000",
];

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

// Function for checking if the request is from a whitelisted origin
function isOriginAllowed(origin: string): boolean {
  return whitelist.indexOf(origin) !== -1;
}

// Function for setting headers for CORS
function setHeaders(res: express.Response, origin: string): void {
  res.header("Access-Control-Allow-Origin", origin);
}

export { greeting, getPort, isOriginAllowed, setHeaders };
