try {
  require("dotenv").config();
  console.log("Loaded environment variables from .env file");
} catch (error) {
  console.log(
    "dotenv not installed or .env file not found; skipping .env configuration",
  );
}

const serverPort = process.env.PORT || 3000;

module.exports = {
  proxy: `http://localhost:${serverPort}`, // Proxy your Express server
  port: process.env.BROWSERSYNCPORT, // BrowserSync’s port
  files: ["src/**/*.ts"], // Watch files for changes
  injectChanges: true, // Enable injecting changes
  reloadOnRestart: true, // Reload the browser when BS restarts
  reloadDebounce: 700,
};
