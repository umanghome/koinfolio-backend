/**
 * Route: /passbook
 * Return the user's passbook.
 * @param {Request} req 
 * @param {Response} res 
 */
const get = (req, res) => {
  if (!req.user) res.send(401);

  res.send({
    passbook: true
  });
};

export default {
  get
};