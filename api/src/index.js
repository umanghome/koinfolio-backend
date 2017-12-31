import express from 'express';
import bodyParser from 'body-parser';
import config from './config';
import routes from './routes';
import middleware from './middleware';
import Parse from 'parse/node';
import Config from './config';

const app = express();

/**
 * Middleware
 */
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(middleware.user); // for setting req.user

/**
 * Routes
 */
app.get('/', routes.index.get);
app.post('/user', routes.user.post);
app.get('/passbook', routes.passbook.get);
app.post('/transaction', routes.transaction.post);
app.delete('/transaction', routes.transaction.del);
app.post('/transaction/bulk', routes.transaction.bulk.post);

app.listen(config.port, () => {
  console.log('Express server started successfully.');
  Parse.initialize(Config.parse.appId);
  Parse.serverURL = Config.parse.url;
});