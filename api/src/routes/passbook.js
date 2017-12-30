/**
 * Default values for the passbook.
 */
const defaultPassbook = {
  "BTC": [],
  "ETH": [],
  "LTC": [],
  "XRP": [],
  "BCH": [],
  "INR": []
};

/**
 * Route: /passbook
 * Return the user's passbook.
 * @param {Request} req 
 * @param {Response} res 
 */
const get = (req, res) => {
  if (!req.user) res.send(401);

  // Get all the transaction IDs belonging to the user.
  // Get values for each transaction.
  
  // Clone defaultPassbook
  let passbook = {
    ...defaultPassbook
  };

  // Add transactions to arrays in keys of passbook.

  // Send the passbook to the user.

  res.send({
    passbook: true
  });
};

export default {
  get
};