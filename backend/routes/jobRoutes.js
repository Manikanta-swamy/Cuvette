const express = require("express");
const jobController = require("../controllers/jobController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/post-jobs", protect, jobController.postJob);
router.get("/", protect, jobController.listJobs);

module.exports = router;
