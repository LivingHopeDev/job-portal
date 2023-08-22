const bcrypt = require("bcrypt");
const { isEmail } = require("validator");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const employerSchema = new Schema(
  {
    first_name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    last_name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    email: {
      type: String,
      required: [true, "Please enter email"],
      lowercase: true,
      unique: true,
      validate: [isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please enter password"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    position_in_company: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    industry: {
      type: String,
      required: true,
    },
    number_of_employees: {
      type: String,
      required: true,
    },
    type_of_employer: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    isEmployer: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// encrypt user's password before saving to db
employerSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
});

const Employer = mongoose.model("Employer", employerSchema);

module.exports = Employer;
