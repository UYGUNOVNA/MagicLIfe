const mongoose = require("mongoose");

const codeSchema = new mongoose.Schema(
  {
    email_or_phone: {
      type: String,
      required: true,
      unique: [true, "bir xil email saqlab bumiydi"],
    },
    code: {
      type: Number,
      required: Number,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    expired_date: {
      type: Date,
      default: Number(Date.now()) + Number(process.env.EXPIRED_TIME_CODE),
    },
  },
  {
    timestamps: true,
  }
);
const Code = mongoose.model("codes", codeSchema);

module.exports = Code;
