const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const applicationSchema = new Schema(
  {
    userId: {
      type: String,
      ref: "user",
    },
    jobTitle: {
      type: String,
      ref: "job",
    },
    resume: {
      type: String,
    },
  },
  { timestamps: true }
);

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
