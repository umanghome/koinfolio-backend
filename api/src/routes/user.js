/**
 * Route: /user
 * Save the user if doesn't already exist.
 * Send the name and user ID.
 * @param {Request} req 
 * @param {Response} res 
 */
const get = (req, res) => {
  if (req.user) res.send(400);

  // Check if a user with the same exists.
  // If there exists, return user_id and name.
  // If there's no user with the email, create one. Return user_id and name.

  res.send({
    user: true
  });
};

export default {
  get
};
