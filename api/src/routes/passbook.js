/**
 * Default values for the passbook.
 */
const defaultPassbook = {
  'BTC': [],
  'ETH': [],
  'LTC': [],
  'XRP': [],
  'BCH': [],
  'INR': []
};

/**
 * Route: /passbook
 * Return the user's passbook.
 * @param {Request} req 
 * @param {Response} res 
 */
const get = (req, res) => {
  if (!req.user) {
    return res.status(401).send({
      code: Codes.error.userNotSetWithRequest
    });
  }

  const passbook = {
    ...defaultPassbook
  };
  
  // Get all the transaction IDs belonging to the user.
  req.user
    .fetchTransactions()
    .then(transactions => {
      transactions.forEach(transaction => {
        let details = transaction.getDetails();
        let type = details.type;
        delete details.type;
        passbook[type].push(details);
      });
      res.status(200).send(passbook);
    })
    .catch(err => res.status(500).send({
      code: err.code
    }));
};

export default {
  get
};