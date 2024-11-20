import jwt from "jsonwebtoken";
import User from "../models/users-models.js";

// Middleware to protect routes
const protect = async (req, res, next) => {
  let token;

  // Check if Authorization header with 'Bearer <token>' exists
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from the header
      token = req.headers.authorization.split(' ')[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user by decoded ID, and attach the user to the request object
      req.user = await User.findById(decoded.id).select('-password');

      // Call next middleware
      next();
    } catch (error) {
      console.error('Error in token verification', error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  // If no token is found in the header, return unauthorized
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export default protect
