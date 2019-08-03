import koa from 'koa';
require('dotenv').config();
import mongoose from 'mongoose';
import Router from'koa-router';
import ContactRouteMiddleware from './routes/contact-routes';
import smsRouteMiddleware from './routes/sms-route';
import bodyParser from 'koa-bodyparser';
const router = new Router();
const app = new koa();

app.use(bodyParser());
smsRouteMiddleware(router);
ContactRouteMiddleware(router);
app.use(router.routes())
   .use(router.allowedMethods());
let dbUrl;
if (process.env.NODE_ENV === 'development') {
  // dbUrl = `mongodb://${process.env.TEST_USER}:${process.env.TEST_PASSWORD}${process.env.TEST_HOST}/${process.env.TEST_NAME}`;
  
  dbUrl = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}${process.env.DB_HOST}/${process.env.DB_NAME}`;

 mongoose.connect(dbUrl,
{
  auth: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  }, useNewUrlParser: true }).then(() => console.log('connected')).catch((err) => console.log(err));
}
export default app.listen(3000, () => {
  console.log('server is up');

});
