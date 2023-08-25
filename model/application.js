const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const applicationSchema = new Schema(
  {
    userId: {
      type: String,
      ref: "user",
    },
    userName: {
      type: String,
      ref: "user",
    },
    jobTitle: {
      type: Array,
      ref: "job",
    },
    resume: {
      type: Array,
    },
  },
  { timestamps: true }
);

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
