import Sms from '../models/sms_model';
import Contact from '../models/contact_model';
import mongoose from 'mongoose';
import * as responses from '../utils/responses';
import * as utils from '../utils/utils';

export const getSms = async (ctx) => {
  const messages = await Sms.find({});
  ctx.body = messages;
};

export const createSms = async(ctx) => {
  try {
    let sender = await Contact.findOne({phone: ctx.request.body.sender});
    const receiver = await Contact.findOne({phone: ctx.request.body.receiver});
    if (!sender || !receiver) {
      responses.RegisterContact(ctx);
    } else {
      const newMessage = new Sms({
        _id: new mongoose.Types.ObjectId(),
        receiver: ctx.request.body.receiver,
        body: ctx.request.body.message,
        sender: sender._id,
        status: 'sent'
      });
      let validatedData = await utils.validate(newMessage);
      await validatedData.save();
      responses.creationSuccess(ctx, validatedData);
    }
     
  } catch (err) {
      (err.name === 'ValidationError' || err.name === 'MongoError') ?  responses.validationError(ctx, err) : 
     responses.contactDetailsError(ctx, err);
  }
 
};

export const removeMessage = async (ctx) => {
  let id = ctx.params.id;
  try {
    utils.verifyId(id);
    let deleteData = await Sms.findOneAndDelete({_id:id});
    (!deleteData)? responses.NotFound(ctx):
      responses.DeleteSuccess(ctx);
    } catch(e) {
      if( e instanceof TypeError) {
        responses.invalidIdError(ctx);
      } else {
        responses.serverError(ctx);
      }

  }
};
export const getOneMessage = async (ctx) => {
  let id = ctx.params.id;
  try {
    id = await utils.verifyId(id);
    const message = await Sms.findById(id);
    (!message)? responses.NotFound(ctx):
      responses.retrivalSuccessful(ctx, message);
  } catch(e) {
      if( e instanceof TypeError) {
        responses.invalidIdError(ctx);
      } else {
        responses.serverError(ctx);
      }
  }
   
};
export const getContactMessages = async(ctx) => {
  let id = ctx.params.id;
  try {
    utils.verifyId(id);
    const messages = await Sms.find({sender: id});
    (!messages)? responses.NotFound(ctx):
    ctx.body = messages;
  } catch (e) {
    if (e instanceof TypeError) responses.invalidIdError(ctx);
      responses.serverError(ctx);
  }
};