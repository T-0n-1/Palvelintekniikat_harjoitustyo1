module.exports = {
  serverport: process.env.PORT || 3000, // Set the server port. Defaults to 3000
  proxy: "http://localhost:${serverport}", // Match the port your Node.js server is running on
  files: ["public/**/*.{html,js,css}", "src/**/*.ts"], // Watch public files and TypeScript files
  port: 4000, // The port where BrowserSync will run
  reloadDelay: 500, // Delay reloading to give nodemon time to restart
};
