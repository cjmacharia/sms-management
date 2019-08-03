import mongoose from 'mongoose';
import Contact from './contact_model';
const Schema = mongoose.Schema;

const smsSchema = new Schema ({
  _id: Schema.Types.ObjectId,
  body: {
    type: String, required: [true, 'Please insert the message']},
  receiver: {
    type: Number, 
    required: [true  , 'receiver number must be provided']},
  status: {
    type: String,
    enum: ['sent', 'unsent'],
    default: 'unsent'
  },
  sender:{ type:Schema.Types.ObjectId , ref: 'Contact' }

});
const Sms = mongoose.model('Sms', smsSchema);
export default Sms;