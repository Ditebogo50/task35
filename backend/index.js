// Import required dependencies
const express = require('express'); // Express.js framework for creating web applications
const mongoose = require('mongoose');
const mongo_config = require('./mongo_config');
const cors = require("cors"); // Enable Cross-Origin Resource Sharing (CORS)
const helmet = require("helmet"); // Set various HTTP headers for security
require('dotenv').config(); // Load environment variables from .env file

const userController = require('./controllers/user_controller');

const app = express(); // Create an instance of the Express application

// Use helmet, cors, and json middleware
app.use(helmet()); // Add helmet middleware to set various HTTP headers for security
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)
app.use(express.json()); // Parse JSON request bodies

// Connect to MongoDB database using mongoose
mongoose.connect(mongo_config.connectionString, mongo_config.config);

app.post('/api/users/login', userController.login);
app.post('/api/users/register', userController.register);

// Start the server and listen for requests on port 3001
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
