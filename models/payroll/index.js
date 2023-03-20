const mongoose = require("mongoose");

const payrollScheme = new mongoose.Schema(
  {
    staffId : {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
      required: [true, "Please provide StaffId"],
    },
    basic : {
      type: Number,
      required: [true, "Please provide basic"],
    },
    hra : {
      type: Number,
      required: [true, "Please provide hra"],
    },
    pf : {
      type: Number,
      required: [true, "Please provide pf"],
    },
    gratuity : {
      type: Number,
      required: [true, "Please provide gratuity"],
    },
    otherAllowance : {
      type: Number,
      required: [true, "Please provide otherAllowance"],
    },
    pension : {
      type: Number,
      required: [true, "Please provide pension"],
    },
    personalPay : {
      type: Number,
      required: [true, "Please provide personalPay"],
    },
    professionTax : {
      type: Number,
      required: [true, "Please provide professionTax"],
    },
    otherPay : {
      type: Number,
      required: [true, "Please provide otherPay"],
    },
    otherDeductions : {
      type: Number,
      required: [true, "Please provide otherDeductions"],
    },
    incentive : { 
      type: Number,
      default: 0,
    },
    anyDeductions : { 
      type: Number,
      default: 0,
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("payroll", payrollScheme);