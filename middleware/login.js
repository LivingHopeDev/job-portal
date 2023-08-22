const Employer = require("../model/employer");
const User = require("../model/user");
const bcrypt = require("bcrypt");

const login = async (email, password) => {
  const employer = await Employer.findOne({ email });
  const user = await User.findOne({ email });

  if (employer) {
    const auth = await bcrypt.compare(password, employer.password);
    if (auth) {
      return employer;
    }
    throw new Error("Incorrect password");
  } else if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw new Error("Incorrect password");
  }

  throw new Error("Incorrect email");
};

module.exports = login;
