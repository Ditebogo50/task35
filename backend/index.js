// Import required dependencies
const express = require('express'); // Express.js framework for creating web applications
const mongoose = require('mongoose');
const mongo_config = require('./mongo_config');
const cors = require("cors"); // Enable Cross-Origin Resource Sharing (CORS)
const helmet = require("helmet"); // Set various HTTP headers for security
require('dotenv').config(); // Load environment variables from .env file

const authenticateToken = require('./middleware/authenticateToken').authenticateToken;
const isAdmin = require('./middleware/isAdmin').isAdmin;
const userController = require('./controllers/user_controller');
const usersController = require('./controllers/users_controller');
const credentialsController = require('./controllers/credentials_controller');

const app = express(); // Create an instance of the Express application

// Use helmet, cors, and json middleware
app.use(helmet()); // Add helmet middleware to set various HTTP headers for security
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)
app.use(express.json()); // Parse JSON request bodies

// Connect to MongoDB database using mongoose
mongoose.connect(mongo_config.connectionString, mongo_config.config);

app.post('/api/users/login', userController.login);
app.post('/api/users/register', userController.register);

app.get('/api/users', [authenticateToken, isAdmin], usersController.getAllUsers);
app.get('/api/users/:userId', [authenticateToken, isAdmin], usersController.getUser);
app.post('/api/users/:userId/change_role', [authenticateToken, isAdmin], usersController.changeRole);
app.post('/api/users/:userId/assignDivision', [authenticateToken, isAdmin], usersController.assignDivision);
app.post('/api/users/:userId/assignOU', [authenticateToken, isAdmin], usersController.assignOU);
app.post('/api/users/:userId/designDivision', [authenticateToken, isAdmin], usersController.designDivision);
app.post('/api/users/:userId/designOU', [authenticateToken, isAdmin], usersController.designOU);
app.get('/api/ous', [authenticateToken, isAdmin], usersController.getAllOUs);

app.get('/api/divisions/:divisionId/credentials', authenticateToken, credentialsController.getCredentials);
app.post('/api/division/:divisionId/credentials', authenticateToken, credentialsController.createCredential);
app.put('/api/credentials/:credentialId', authenticateToken, credentialsController.updateCredential);

// Start the server and listen for requests on port 3001
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
