import express from 'express';
import config from './config';
import routes from './routes';
import middleware from './middleware';

const app = express();

/**
 * Middleware
 */
app.use(middleware.user);

/**
 * Routes
 */
app.get('/', routes.index.get);
app.get('/user', routes.user.get);
app.get('/passbook', routes.passbook.get);
app.post('/transaction', routes.transaction.post);

app.listen(config.port, () => {
  console.log('Express server started successfully.');
});