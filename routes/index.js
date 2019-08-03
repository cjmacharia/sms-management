import combine from 'koa-combine-routers';
import contactRoutes from './contact-routes';
import smstRoutes from './sms-route';

 const allRoutes = combine(
   contactRoutes,
   smstRoutes
 );

 export default allRoutes;
