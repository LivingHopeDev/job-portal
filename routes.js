const { Router } = require("express");
const router = Router();

const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndEmployer,
} = require("./middleware/auth");
const {
  register,
  login,
  logout,
  uploadResume,
  updateUser,
} = require("./controllers/userController");
const {
  job,
  getAllJob,
  getJob,
  updateJob,
  deleteJob,
  getApplication,
  application,
} = require("./controllers/jobController");
router.route("/user").post(register);
router.route("/user/login").post(login);
router.route("/user/logout").get(logout);
router.route("/user/:id/resume").post(uploadResume);
router.route("/user/:id").put(updateUser);
router.route("/job").post(verifyTokenAndEmployer, job);
router.route("/job").get(getAllJob);
router.route("/job/:id").get(getJob);
router.route("/job/:id").put(verifyTokenAndEmployer, updateJob);
router.route("/job/:id").delete(verifyTokenAndEmployer, deleteJob);
router.route("/job/:id/apply").post(verifyToken, application);
router.route("/applications").get(verifyTokenAndAdmin, getApplication);

module.exports = router;
