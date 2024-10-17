import jwt from 'jsonwebtoken';
import User from '../models/userModel.js'; // Assuming your User schema is in the models folder
import { verifyToken } from '../config/jwt.js';


const authMiddleware = async (req, res, next) => {
  try {
    // Get the token from the Authorization header
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    // Verify the token
    const decoded = verifyToken(token);

    // Fetch the user from the database using the decoded user ID
    // console.log(decoded);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: 'User not found, authorization denied' });
    }

    // Attach the user to the request object for later use in the route handler
    req.user = user;
    
    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token is not valid', error: error.message });
  }
};

export default authMiddleware;

