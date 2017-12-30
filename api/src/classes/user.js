const Parse = require('parse/node');

const className = 'AppUser';

class User extends Parse.Object {
  /**
   * Initialises a user.
   * @param {String} email
   * @param {String} name
   */
  constructor(email, name) {
    super(className);
    this.set('email', email);
    this.set('name', name);
  }

  /**
   * Adds a transaction.
   * @param {Object or Array of instances Transaction class} transaction
   * @return {Promise}
   */
  addTransaction(transaction) {
    const relation = this.relation('transactions');
    relation.add(transaction);
    return relation.save();
  }

  // TODO: Add a method to get all transactions. Should return a Promise.

  // TODO: Add a static method to find a user. Should return a Promise. Refer http://docs.parseplatform.org/js/guide/#retrieving-objects
}

Parse.Object.registerSubclass(className, User);

export default User;
