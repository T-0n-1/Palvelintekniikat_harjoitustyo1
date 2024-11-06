const serverPort = process.env.PORT || 3000;

module.exports = {
  proxy: `http://localhost:${serverPort}`, // Proxy your Express server
  port: 4000, // BrowserSync’s port
  files: ["public/**/*.{html,js,css}", "src/**/*.ts"], // Watch files for changes
  injectChanges: true, // Enable injecting changes
  reloadOnRestart: true, // Reload the browser when BS restarts
};
