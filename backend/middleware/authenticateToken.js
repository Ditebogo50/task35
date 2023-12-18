// Middleware function to authenticate the JWT token
const jwt = require('jsonwebtoken'); // Importing the JWT library
const jwtSecretKey = process.env.JWT_SECRET_KEY; // Getting the JWT secret key from environment variables

exports.authenticateToken = (req, res, next) =>  {
    const authHeader = req.headers['authorization']; // Getting the 'Authorization' header from the request
    const token = authHeader && authHeader.split(' ')[1]; // Extracting the token from the 'Authorization' header
  
    if (token == null) { // Checking if the token is not present
      return res.status(401).json({ error: 'Unauthorized' }); // Returning a JSON response with 401 status code indicating unauthorized access
    }
  
    jwt.verify(token, jwtSecretKey, (err, user) => { // Verifying the token using the secret key
      if (err) { // Checking if there is an error in token verification
        return res.status(403).json({ error: 'Invalid token' }); // Returning a JSON response with 403 status code indicating invalid token
      }
  
      req.user = user; // Storing the user object from the token in the request object
      next(); // Calling the next middleware function
    });
}
