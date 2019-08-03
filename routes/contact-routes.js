import * as ctrl from '../controllers/contact';

export default async (router) => {

router.get('/contacts', ctrl.getContact);

router.get('/contact/:id', ctrl.getOneContact);

router.post('/contact/create', ctrl.createContact);

router.delete('/contact/:id', ctrl.removeContact);

router.put('/contact/:id', ctrl.editContact);

};