import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
   required: [true, 'your username cannot be blank']},
  phone: {
    type: Number,
    required: [true, 'your phone number cannot be blank'],
    unique: true
  },
});

const Contact = mongoose.model('Contact', contactSchema);
contactSchema.plugin(uniqueValidator, { message: 'expected {PATH} to be unique.' });
export default Contact;
