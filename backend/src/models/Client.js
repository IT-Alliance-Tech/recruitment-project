const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    contactPerson: String,
    email: String,
    phone: String,
    industry: String,
    status: {
      type: String,
      enum: ["active", "inactive", "prospect"],
      default: "prospect",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Client", ClientSchema);
