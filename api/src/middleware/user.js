/**
 * Middleware to set the user based on the header.
 * @param {Request} req 
 * @param {Response} res 
 * @param {Function} next 
 */
const user = (req, res, next) => {
  // Check if USER header is present.
  // Get user by the ID.
  // Set req.user

  next();
};

export default user;