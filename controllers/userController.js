const User = require("../model/user");
const Employer = require("../model/employer");
const jwt = require("jsonwebtoken");
const { handleErrors } = require("../middleware/errorHandler");
const { createToken } = require("../middleware/auth");
const Login = require("../middleware/login");

const register = async (req, res) => {
  try {
    if (req.body.number_of_employees) {
      await Employer.create(req.body);
      res
        .status(201)
        .json({ status: true, message: "Registration successful" });
    } else {
      await User.create(req.body);
      res
        .status(201)
        .json({ status: true, message: "Registration successful" });
    }
  } catch (err) {
    const error = handleErrors(err);
    res.status(500).json({ status: false, message: error });
  }
};

const login = async (req, res) => {
  const { password, email } = req.body;
  try {
    const user = await Login(email.trim(), password.trim());

    if (user) {
      const token = createToken(user._id);
      const { password, ...others } = user._doc;
      res.status(200).json({ ...others, token });
    }
  } catch (err) {
    const error = handleErrors(err);
    res.status(400).json({ error });
  }
};

const logout = async (req, res) => {
  const authHeader = req.headers.token;
  jwt.sign(
    authHeader,
    "",
    {
      expiresIn: 1,
    },
    (logout, err) => {
      if (logout) {
        res.status(200).json({ message: "Logged out" });
      } else {
        res.status(401).json({ message: err });
      }
    }
  );
};
const uploadResume = async (req, res) => {};
const updateUser = async (req, res) => {};

module.exports = {
  register,
  login,
  logout,
  uploadResume,
  updateUser,
};
