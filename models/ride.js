const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const rideSchema = new Schema({
  driver: { type: String, required: true },
  time: { type: String, required: true },
  address: { type: String, required: true },
  location: {
    type: String,
    required: true,
  },
  riders: { type: Array, required: true },
  maxNumber: { type: Number, required: true },
});

module.exports = mongoose.model("Ride", rideSchema);
