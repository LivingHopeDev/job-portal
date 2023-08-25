const jwt = require("jsonwebtoken");
const Employer = require("../model/employer");
require("dotenv").config();
// create token for password hashing
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {});
};

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    // decodedToken will return the user payload in this case userId
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        // redirect to the login page
        res.status(403).json({ error: true, message: "Invalid token" });
      } else {
        req.user = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ error: true, message: "You are not authenticated" });
  }
};
const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    req.user.id === req.params.id
      ? next()
      : res
          .status(403)
          .json({ error: true, message: "You are not authorized" });
  });
};

const verifyTokenAndEmployer = (req, res, next) => {
  verifyToken(req, res, () => {
    Employer.findOne({ _id: req.user.id })
      .then((data) => {
        data.isEmployer || data.isAdmin
          ? next()
          : res
              .status(403)
              .json({ error: true, message: "You are not authorized!" });
      })
      .catch((error) => {
        res
          .status(403)
          .json({ error: true, message: "You are not authorized!" });
      });
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    Employer.findOne({ _id: req.user.id })
      .then((data) => {
        data.isAdmin
          ? next()
          : res
              .status(403)
              .json({ error: true, message: "You are not authorized!" });
      })
      .catch((error) => {
        res
          .status(403)
          .json({ error: true, message: "You are not authorized!" });
      });
  });
};
module.exports = {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
  verifyTokenAndEmployer,
  createToken,
};
