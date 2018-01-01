import Codes from '../codes.js';
import { Transaction } from '../classes';
import transaction from '../classes/transaction';

/**
 * Creates multiple transactions.
 * @param {Array of Objects} transactionsToCreate 
 * @return {Promise}
 */
const createTransactions = (transactionsToCreate = []) => {
  return new Promise ((resolve, reject) => {
    if (transactionsToCreate.length === 0) {
      return reject({
        code: Codes.error.transactionsToCreateEmpty
      });
    }

    let createdTransactions = [];
    transactionsToCreate.forEach(trans => {
      const {
        type,
        qty,
        price,
        fees
      } = trans;
      const transaction = Transaction.create(type, qty, price, fees);
      transaction
        .save()
        .then(transaction => {
          createdTransactions.push(transaction);
          if (createdTransactions.length === transactionsToCreate.length) {
            resolve(createdTransactions);
          }
        })
        .catch(err => {
          return reject({ code: err.code });
        });
    });
  });
}

/**
 * Route: /transaction
 * Create or update the transaction based on Transaction ID.
 * @param {Request} req 
 * @param {Response} res 
 */
const post = (req, res) => {
  if (!req.user) {
    return res.status(401).send({
      code: Codes.error.userNotSetWithRequest
    });
  }

  const {
    id,
    type,
    qty,
    price,
    fees
  } = req.body;

  if (!type || !qty || !price || !fees) {
    return res.status(400).send({
      code: Codes.error.missingFields
    });
  }

  // If there's an ID present with the request, retrieve the transaction.
  if (id) {
    Transaction
      .findById(id)
      .then(transaction => {
        transaction
          .doesBelongTo(req.user)
          .then((transaction, user) => {
            // Update values in the transaction from the request and save to Parse.
            transaction.update({
              type: type || transaction.get('type'),
              qty: qty || transaction.get('qty'),
              price: price || transaction.get('price'),
              fees: fees || transaction.get('fees'),
            })
            .then(transaction => {
              res.status(200).send({
                success: true,
                ...transaction.getDetails()
              });
            })
            .catch(err => res.status(500).send({
              code: Codes.error.failedToUpdateTransaction
            }))
          })
          .catch(err => res.status(401).send({
            // If the retrieved transaction does not belong to req.user, return 401.
            code: err.code
          }));
      })
      .catch(err => {
        if (err && err.code && err.code === Codes.error.transactionClass.findByIdError) {
          createTransactions([{
            type,
            price,
            qty,
            fees
          }])
            .then(transactions => {
              const t = transactions[0];
              res.status(200).send({
                success: true,
                ...t.getDetails()
              });
            })
            .catch(err => {
              res.status(500).send({
                code: err.code
              })
            });
        }
      });
  } else {
    // If there's no ID present, create a new transaction.
    createTransactions([{
      type,
      price,
      qty,
      fees
    }])
      .then(transaction => {
        req.user.addTransaction(transaction)
        .then(transactions => {
          const t = transactions[0];
          res.status(200).send({
            success: true,
            ...t.getDetails()
          });
        })
        .catch(err => {
          res.status(500).send({
            code: err.code || 1
          })
        });
      })
      .catch(err => {
        res.status(500).send({
          code: err.code
        })
      });
  }
};

/**
 * Route: /transaction
 * Create or update the transaction based on Transaction ID.
 * @param {Request} req 
 * @param {Response} res 
 */
const del = (req, res) => {
  if (!req.user) {
    return res.status(401).send({
      code: Codes.error.userNotSetWithRequest
    });
  }

  const {
    id
  } = req.body;

  if (!id) {
    return res.status(400).send({
      code: Codes.error.missingFields
    });
  }

  // Check if a transaction with the ID exists.
  Transaction
    .findById(id)
    .then(transaction => {
      transaction
        .delete(req.user)
        .then(() => res.status(200).send({
          success: true
        }))
        .catch(err => {
          if (err.code === Codes.error.notOwnerOfTransaction) {
            res.status(401).send({
              code: err.code
            });
          } else {
            res.status(500).send({
              code: err.code
            });
          }
        });
    })
    // Return 400 if there's no transaction.
    .catch(err => res.status(409).send({
      code: Codes.error.transactionNotFound
    }));
};

const bulk = {
  /**
   * Route: /transaction/bulk
   */
  post: (req, res) => {
    if (!req.user) {
      return res.status(401).send({
        code: Codes.error.userNotSetWithRequest
      });
    }

    let {
      transactions
    } = req.body;

    if (!transactions) {
      return res.status(400).send({
        code: Codes.error.missingFields
      });
    }

    if (typeof transactions === 'string') {
      try {
        transactions = JSON.parse(transactions);
      } catch (err) {
        return res.status(500).send({
          code: Codes.error.transactionsStringToJSON
        });
      }
    }

    let abort = false;
    transactions.forEach(transaction => {
      const {
        type,
        qty,
        price,
        fees = 0
      } = transaction;
      if (!type || !qty || !price) {
        abort = true;
      }
    })

    if (abort) {
      return res.status(400).send({
        code: Codes.error.missingFields
      });
    }

    // If there's no ID present, create a new transaction.
    createTransactions(transactions)
      .then(transactions => {
        req.user.addTransaction(transactions)
        .then(transactions => {
          let toReturn = [];
          transactions.forEach(t => {
            toReturn.push(t.getDetails())
          });
          res.status(200).send({
            success: true,
            transactions: toReturn
          });
        })
        .catch(err => {
          res.status(500).send({
            code: err.code || 1
          })
        });
      })
      .catch(err => {
        res.status(500).send({
          code: err.code
        })
      });
  }
}

export default {
  post,
  del,
  bulk
};
