/**
 * Middleware to set the user based on the header.
 * @param {Request} req 
 * @param {Response} res 
 * @param {Function} next 
 */
const user = (req, res, next) => {
  next();
};

export default user;