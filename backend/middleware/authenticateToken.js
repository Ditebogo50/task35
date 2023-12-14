// Middleware function to authenticate the JWT token
const jwt = require('jsonwebtoken'); // JWT
const jwtSecretKey = process.env.JWT_SECRET_KEY;

exports.authenticateToken = (req, res, next) =>  {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    jwt.verify(token, jwtSecretKey, (err, user) => {
      if (err) {
        return res.status(403).json({ error: 'Invalid token' });
      }
  
      req.user = user;
      next();
    });
  }
