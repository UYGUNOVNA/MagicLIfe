const mongoose = require("mongoose");

const paymeSchema = new mongoose.Schema({
  payme_id: {
    type: String,
  },
  time: {
    type: String,
  },
  amount: {
    type: Number,
  },
  account: {
    type: Number,
  },
  create_time: {
    type: String,
    default: Date.now(),
  },
  perform_time: {
    type: String,
  },
  cancel_time: {
    type: String,
  },
  transaction_id: {
    type: Number,
  },
  state: {
    type: Number,
    enum: [1, 2, -1, -2],
  },
  reason: {
    type: Number,
    enum: [1, 2, 3, 4, 5, 10],
  },
  receivers: [
    {
      id: {
        type: String,
      },
      amount: {
        type: Number,
      },
    },
  ],
});
const Payme = mongoose.model("paymes", paymeSchema);
module.exports = Payme;
