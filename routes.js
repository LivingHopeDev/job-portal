const { Router } = require("express");
const router = Router();
const { verifyTokenAndAdmin } = require("./middleware/auth");
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
  applyForJob,
} = require("./controllers/jobController");
router.route("/user").post(register);
router.route("/user/login").post(login);
router.route("/user/logout").get(logout);
router.route("/user/:id/resume").post(uploadResume);
router.route("/user/:id").put(updateUser);
router.route("/job").post(verifyTokenAndAdmin, job);
router.route("/job").get(getAllJob);
router.route("/job/:id").get(getJob);
router.route("/job/:id").put(verifyTokenAndAdmin, updateJob);
router.route("/job/:id").delete(verifyTokenAndAdmin, deleteJob);
router.route("/job/:id").post(applyForJob);

module.exports = router;
