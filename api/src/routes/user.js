import Codes from '../codes.js';
import { User } from '../classes';

/**
 * Route: /user
 * Save the user if doesn't already exist.
 * Send the name and user ID.
 * 
 * @param {String} email
 * @param {String} name
 * @param {User} user
 * 
 * @return {String} name
 * @return {String} user_id
 */
const post = (req, res) => {
  if (req.user) {
    return res.status(400).send({
      code: Codes.error.userSetWithRequest
    });
  }

  const {
    email,
    name
  } = req.body;

  // Check for missing fields.
  if (!email || !name) {
    return res.status(400).send({
      code: Codes.error.missingFields
    });
  }

  // Check if a user with the same exists.
  if (email) {
    User.findByEmail(email)
      .then(user => {
        // If there exists, return user_id and name.
        return res.status(200).send({
          name: user.get('name'),
          user_id: user.id
        });
      })
      .catch(err => {
        // If there's no user with the email, create one.
        if (err && err.code && err.code === Codes.error.userNotFound) {
          let user = User.create(email, name);
          user.save()
            .then(user => {
              // Return user_id and name.
              return res.status(200).send({
                name: user.get('name'),
                user_id: user.id
              });
            })
            .catch(err => {
              // Failed to create a user.
              return res.status(500).send({
                code: Codes.error.failedToCreateUser
              });
            });
        } else {
          return res.status(500).send({
            code: 0
          });
        }
      });
  }
};

export default {
  post
};
