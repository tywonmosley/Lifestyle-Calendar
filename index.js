// Import and configure the dotenv package to load environment variables from a .env file
require("dotenv").config();

// Import the server module from the server.js file
const server = require("./server");

// Define the port on which the server will listen, using the value of the PORT environment variable if available, otherwise defaulting to 8080
const PORT = process.env.PORT || 8080;

// Start the server listening for incoming connections on the specified port
server.listen(PORT, () => {
    // Log a message to the console indicating that the server is now listening, along with the port number
    console.log(`Server listening on port ${PORT}`);
});