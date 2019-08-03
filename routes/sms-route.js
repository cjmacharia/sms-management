import * as controller from '../controllers/sms';

export default async(router) => {

router.post('/message', controller.createSms);

router.get('/messages/contact/:id', controller.getContactMessages );

router.get('/message/:id', controller.getOneMessage);

router.get('/messages', controller.getSms);

router.delete('/message/:id', controller.removeMessage);
};


