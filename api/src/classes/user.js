import Codes from '../codes';
import Transaction from './transaction';

const Parse = require('parse/node');

const className = 'AppUser';

class User extends Parse.Object {
  constructor() {
    super(className);
  }

  /**
   * Creates a user.
   * @param {String} email
   * @param {String} name
   * @return {User}
   */
  static create(email, name) {
    const user = new User();
    user.set('email', email);
    user.set('name', name);
    return user;
  }

  /**
   * Saves the user.
   * @return {Promise}
   */
  save() {
    return new Promise((resolve, reject) => {
      super.save(null, {
        success: x => resolve(x),
        error: () =>
          reject({
            code: Codes.error.failedToCreateUser
          })
      });
    });
  }

  /**
   * Updates User with properties given.
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
   * Adds a transaction.
   * @param {Object or Array of instances Transaction class} transaction
   * @return {Promise}
   */
  addTransaction(transaction) {
    return new Promise((resolve, reject) => {
      const relation = this.relation('transactions');
      relation.add(transaction);
      super.save(null, {
        success: (user) => resolve(transaction, user),
        error: (a, b) => reject({
          code: Codes.errors.userClass.addTransactionFailure
        })
      });
    });
  }

  /**
   * Method to fetch all transactions.
   * @return {Promise}
   */
  fetchTransactions() {
    return new Promise((resolve, reject) => {
      const relation = this.relation('transactions');
      relation
        .query()
        .find()
        .then(transactions => {
          // If no transactions, resolve.
          if (transactions.length === 0) {
            return resolve([]);
          }

          // Populate transactions
          let _transactions = [];
          transactions.forEach(trans => {
            Transaction.findById(trans.id)
              .then(transaction => {
                _transactions.push(transaction);

                // If everything's been pushed, resolve.
                if (_transactions.length === transactions.length) {
                  resolve(_transactions);
                }
              })
              .catch(() =>
                reject({
                  code: Codes.error.userClass.transactionFetchFailure
                })
              );
          });
        })
        .catch(() =>
          reject({
            code: Codes.error.userClass.relationshipFailure
          })
        );
    });
  }

  /**
   * Gets a user by ID.
   * @param {String} id
   * @return {Promise}
   */
  static findById(id) {
    return new Promise((resolve, reject) => {
      const query = new Parse.Query(User);
      query.get(id, {
        success: user => {
          if (!user) {
            reject({
              code: Codes.error.userNotFound
            });
          }
          resolve(user);
        },
        error: () =>
          reject({
            code: Codes.error.userClass.findByIdError
          })
      });
    });
  }

  /**
   * Gets a user by email.
   * @param {String} email
   * @return {Promise}
   */
  static findByEmail(email) {
    return new Promise((resolve, reject) => {
      const query = new Parse.Query(User);
      query.equalTo('email', email);
      query.first({
        success: user => {
          if (!user) {
            return reject({
              code: Codes.error.userNotFound
            });
          }
          resolve(user);
        },
        error: () =>
          reject({
            code: Codes.error.userClass.findByEmailError
          })
      });
    });
  }
}

Parse.Object.registerSubclass(className, User);

export default User;
