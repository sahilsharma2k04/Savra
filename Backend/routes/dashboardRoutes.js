const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");
const {
  getOverview,
} = require("../controllers/dashboard/overviewController");

const { getWeeklyTrends } = require("../controllers/dashboard/weeklyController.js");
const { getTeacherAnalysis } = require("../controllers/dashboard/teacherController");

router.get("/overview", protect, getOverview);
router.get("/weekly-trends",protect, getWeeklyTrends);
router.get("/teacher/:id",protect, getTeacherAnalysis);

module.exports = router;