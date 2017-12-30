/**
 * Route: /transaction
 * Create or update the transaction based on Transaction ID.
 * @param {Request} req 
 * @param {Response} res 
 */
const post = (req, res) => {
  if (!req.user) res.send(401);

  // If there's an ID present with the request, retrieve the transaction.
  // If the retrieved transaction does not belong to req.user, return 401.
  
  // If there's no ID present, create a new transaction.

  // Update values in the transaction from the request and save to Parse.

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

  // Check if a transaction with the ID exists. Return 400 if there's no transaction.
  // Check if the transaction belongs to req.user. If not, return 401.
  // Delete the transaction.

  res.send({
    transaction: false
  });
};

export default {
  post,
  del
};
