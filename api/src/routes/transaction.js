/**
 * Route: /transaction
 * Create or update the transaction based on Transaction ID.
 * @param {Request} req 
 * @param {Response} res 
 */
const post = (req, res) => {
  if (!req.user) res.send(401);

  res.send({
    transaction: true
  });
};

/**
 * Route: /transaction
 * Create or update the transaction based on Transaction ID.
 * @param {Request} req 
 * @param {Response} res 
 */
const del = (req, res) => {
  if (!req.user) res.send(401);

  res.send({
    transaction: false
  });
};

export default {
  post,
  del
};
