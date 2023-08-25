const { handleErrors } = require("../middleware/errorHandler");
const Job = require("../model/job");
const Application = require("../model/application");
const User = require("../model/user");

const job = async (req, res) => {
  try {
    await Job.create(req.body);
    res.status(200).json({
      status: true,
      message: "Job posted",
    });
  } catch (err) {
    const error = handleErrors(err);
    res.status(400).json({ error });
  }
};
const getAllJob = async (req, res) => {
  try {
    const data = await Job.find();
    if (data.length) {
      res.status(200).json({
        status: true,
        message: data,
      });
    } else {
      res.status(200).json({
        status: true,
        message: "No job posted yet",
      });
    }
  } catch (err) {
    const error = handleErrors(err);
    res.status(500).json({ status: false, message: error });
  }
};
const getJob = async (req, res) => {
  try {
    const data = await Job.find({ _id: req.params.id });
    if (data.length) {
      res.status(200).json({
        status: true,
        message: data,
      });
    } else {
      res.status(404).json({
        status: false,
        message: "Not found",
      });
    }
  } catch (err) {
    const error = handleErrors(err);
    res.status(500).json({ status: false, message: error });
  }
};
const updateJob = async (req, res) => {
  try {
    const data = await Job.findOneAndUpdate({ _id: req.params.id }, req.body);
    if (data) {
      res.status(200).json({
        status: true,
        message: "Job Updated",
      });
    } else {
      res.status(404).json({
        status: true,
        message: "Not found",
      });
    }
  } catch (err) {
    const error = handleErrors(err);
    res.status(500).json({ status: false, message: error });
  }
};
const deleteJob = async (req, res) => {
  try {
    const data = await Job.findByIdAndDelete(req.params.id);
    if (data) {
      res.status(200).json({ message: "Job deleted" });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (err) {
    const error = handleErrors(err);
    res.status(500).json({ status: false, message: "Job deletion failed" });
  }
};

const application = async (req, res) => {
  const userId = req.user.id;
  const { resume } = req.body; // Must be a link to the resume
  const job = await Job.findOne({ _id: req.params.id });
  const jobTitle = job.title;

  try {
    const isPresent = await Application.findOne({ userId: userId });

    if (isPresent) {
      res.status(201).json({
        status: true,
        message: "You have already applied: Check out others",
      });
    } else {
      const data = {
        userId,
        jobTitle,
        resume,
      };

      await Application.create(data);
      await User.findOneAndUpdate(
        { _id: userId },
        { $addToSet: { appliedJob: jobTitle } } // Using $addToSet to prevent duplicate jobTitle entries
      );
      res.status(201).json({ status: true, message: "Application successful" });
    }
  } catch (err) {
    const error = handleErrors(err);
    res.status(500).json({ status: false, message: "Application failed" });
  }
};
const getApplication = async (req, res) => {
  try {
    const app = await Application.find();
    if (app.length) {
      res.status(200).json({ status: true, message: app });
    } else {
      res.status(404).json({ message: "No application yet" });
    }
  } catch (err) {
    const error = handleErrors(err);
    res.status(500).json({ status: false, error });
  }
};
module.exports = {
  job,
  getAllJob,
  getJob,
  updateJob,
  deleteJob,
  getApplication,
  application,
};
