
import Contact from '../models/contact_model';
import Sms from '../models/sms_model';
import mongoose from 'mongoose';
import * as utils from '../utils/utils';
import * as responses from '../utils/responses';


export const getContact = async(ctx) => {
  const contacts = await Contact.find({});
  ctx.body = contacts;
};

export const createContact = async (ctx) => {
  const newContact =  new Contact({
    _id: new mongoose.Types.ObjectId(),
    name: ctx.request.body.name,
    phone: ctx.request.body.phone
  });
  try {
  let validatedResult = await utils.validate(newContact);
  await validatedResult.save();
  responses.creationSuccess(ctx, validatedResult);

  } catch (err) {
     (err.name === 'ValidationError' || err.name === 'MongoError') ?  responses.validationError(ctx, err) : 
    responses.contactDetailsError(ctx, err);
  }
};

export const getOneContact = async (ctx) => {
  let id = ctx.params.id;
  try {
    id = await utils.verifyId(id);
    const contact = await Contact.findById({_id:id});
    (!contact)? responses.NotFound(ctx):
      responses.retrivalSuccessful(ctx, contact);
  } catch(e) {
      if( e instanceof TypeError) {
        responses.invalidIdError(ctx);
      } else {
        responses.serverError(ctx);
      }
  }
   
};

export const removeContact = async (ctx) => {
  let id = ctx.params.id;
  try {
    utils.verifyId(id);
    let contact = await Contact.findById(id);
   if (!contact) {
     responses.NotFound(ctx);
    } else {
      await Sms.findOneAndRemove({sender: contact._id});
      await Contact.findOneAndRemove({_id: id});
      responses.DeleteSuccess(ctx);
    }
   
    } catch(e) {
      if( e instanceof TypeError) {
        responses.invalidIdError(ctx);
      } else {
        responses.serverError(ctx);
      }

  }
  
};
  export const editContact = async (ctx) => {
    let id = ctx.params.id;
    let content = ctx.request.body;
    try {
      id = await utils.verifyId(id);
      let validatedResult = await utils.validate(content);
      const editData = await Contact.findByIdAndUpdate(id, validatedResult);
      if (!editData) {
        responses.NotFound(ctx);
       } else {
      responses.updateSuccess(ctx, validatedResult);
       }
    }   catch(err) {
      if( err instanceof TypeError) {
        responses.invalidIdError(ctx);
      } else {
        (err.name === 'ValidationError' || err.name === 'MongoError' ) ? responses.validationError(ctx, err):
        responses.contactDetailsError(ctx, err);
      }
      
    }
  };