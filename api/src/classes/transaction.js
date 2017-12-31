import Codes from '../codes';
import User from './user';

const Parse = require('parse/node');

const className = 'Transaction';

class Transaction extends Parse.Object {
  constructor() {
    super(className);
  }

  /**
   * Creates a transaction.
   * @param {String} type
   * @param {Float} qty
   * @param {Float} price
   * @param {Float} fees
   * @return {Transaction}
   */
  static create(type, qty, price, fees = 0) {
    const transaction = new Transaction();
    transaction.set('type', `${type}`);
    transaction.set('qty', `${qty}`);
    transaction.set('price', `${price}`);
    transaction.set('fees', `${fees}`);
    return transaction;
  }

  /**
   * Saves the transaction.
   * @return {Promise}
   */
  save() {
    return new Promise((resolve, reject) => {
      super.save(null, {
        success: x => resolve(x),
        error: () => reject({
          code: Codes.error.failedToCreateTransaction
        })
      });
    });
  }

  /**
   * Updates Transaction with properties given.
   * @param {Object} properties
   * @return Promise
   */
  update(properties) {
    for (let prop in properties) {
      this.set(prop, properties[prop]);
    }
    return this.save();
  }

  /**
   * Deletes a transaction.
   * @return {Promise}
   */
  delete(user) {
    return new Promise((resolve, reject) => {
      if (!user) {
        reject({
          code: Codes.error.notOwnerOfTransaction
        });
      }

      this
        .doesBelongTo(user)
        .then((transaction, user) => {
          transaction.destroy({
            success: () => resolve(true),
            error: () => reject({
              code: Codes.error.failedToDeleteTransaction
            })
          });
        })
        .catch(err => reject(err))
    });
  }

  /**
   * Tells whether the given transaction belongs to a given user.
   * TODO: Make this method better.
   * @param {User} user 
   * @return Promise
   */
  doesBelongTo(user) {
    return new Promise((resolve, reject) => {
      const relation = user.relation('transactions');
      const query = relation.query();
      query.equalTo('objectId', this.id);
      query.first({
        success: transaction => {
          if (!transaction) {
            return reject({
              code: Codes.error.notOwnerOfTransaction
            });
          }
          if (transaction.id === this.id) {
            return resolve(transaction, user);
          } else {
            return reject({
              code: Codes.error.notOwnerOfTransaction
            });
          }
        },
        error: () => reject({
          code: Codes.error.notOwnerOfTransaction
        })
      });
    });
  }

  /**
   * Returns details about the transcation,
   * mostly to be used as a reponse to for the API.
   * @return {Object}
   */
  getDetails() {
    return {
      id: this.id,
      type: this.get('type'),
      price: this.get('price'),
      qty: this.get('qty'),
      fees: this.get('fees'),
    }
  }

  /**
   * Gets a transaction by ID.
   * @param {String} id
   * @return {Promise}
   */
  static findById(id) {
    return new Promise((resolve, reject) => {
      const query = new Parse.Query(Transaction);
      query.get(id, {
        success: transaction => {
          if (!transaction) {
            reject({
              code: Codes.error.transactionNotFound
            });
          }
          resolve(transaction);
        },
        error: () =>
          reject({
            code: Codes.error.transactionClass.findByIdError
          })
      });
    });
  }
}

Parse.Object.registerSubclass(className, Transaction);

export default Transaction;
