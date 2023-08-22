const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  place: {type:mongoose.Schema.Types.ObjectId, required:true, ref:'Place'},
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // or the name of your user model
    required: true, // Ensure that the user field is required
  },
  date: {type:Date, required:true},
  time: {type:String, required:true},
  count:{type:Number,required:true},
  name: {type:String, required:true},
  phone: {type:String, required:true},
});

const BookingModel = mongoose.model('Booking', bookingSchema);

module.exports = BookingModel;