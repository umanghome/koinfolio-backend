import { User } from '../classes';

/**
 * Middleware to set the user based on the header.
 * @param {Request} req 
 * @param {Response} res 
 * @param {Function} next 
 */
const user = (req, res, next) => {
  // Check if USER header is present.
  const userId = req.get('USER');

  if (userId) {
    // Get user by the ID.
    User.findById(userId)
      .then(user => {
        // Set req.user
        req.user = user;
        next();
      })
      .catch(() => next())
  } else {
    next();
  }
};

export default user;