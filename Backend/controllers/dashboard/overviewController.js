const Activity = require("../../models/Activity");

exports.getOverview = async (req, res) => {
  try {
    const { grade, subject } = req.query;

    // Build match filter dynamically
    const matchStage = {};

    if (grade && grade !== "All Grades") {
      matchStage.class = grade; // Change if your DB field is different
    }

    if (subject && subject !== "All Subjects") {
      matchStage.subject = subject;
    }

    // 🔥 Teacher stats with filter
    const teacherStats = await Activity.aggregate([
      { $match: matchStage },  // THIS WAS MISSING
      {
        $group: {
          _id: {
            teacherId: "$teacherId",
            teacherName: "$teacherName",
          },
          lessons: {
            $sum: {
              $cond: [{ $eq: ["$activityType", "lesson"] }, 1, 0],
            },
          },
          quizzes: {
            $sum: {
              $cond: [{ $eq: ["$activityType", "quiz"] }, 1, 0],
            },
          },
          assessments: {
            $sum: {
              $cond: [{ $eq: ["$activityType", "assessment"] }, 1, 0],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          teacherId: "$_id.teacherId",
          teacherName: "$_id.teacherName",
          lessons: 1,
          quizzes: 1,
          assessments: 1,
        },
      },
    ]);

    // Totals with filter
    const totals = await Activity.aggregate([
      { $match: matchStage },  // ALSO REQUIRED HERE
      {
        $group: {
          _id: null,
          totalLessons: {
            $sum: {
              $cond: [{ $eq: ["$activityType", "lesson"] }, 1, 0],
            },
          },
          totalQuizzes: {
            $sum: {
              $cond: [{ $eq: ["$activityType", "quiz"] }, 1, 0],
            },
          },
          totalAssessments: {
            $sum: {
              $cond: [{ $eq: ["$activityType", "assessment"] }, 1, 0],
            },
          },
        },
      },
      { $project: { _id: 0 } },
    ]);

    res.json({
      teachers: teacherStats,
      totals: totals[0] || {
        totalLessons: 0,
        totalQuizzes: 0,
        totalAssessments: 0,
      },
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};