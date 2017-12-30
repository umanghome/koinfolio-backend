import user from './user';
import passbook from './passbook';
import transaction from './transaction';

/**
 * Route: /
 * Tells the user to fuck off.
 * @param {Request} req 
 * @param {Response} res 
 */
const get = (req, res) => {
  res.send({
    you: 'are lost'
  });
};

const routes = {
  index: {
    get
  },
  user,
  passbook,
  transaction
};

export default routes;