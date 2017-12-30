/**
 * Route: /user
 * Save the user if doesn't already exist.
 * Send the name and user ID.
 * @param {Request} req 
 * @param {Response} res 
 */
const get = (req, res) => {
  if (req.user) res.send(400);
  res.send({
    user: true
  });
};

export default {
  get
};
