const Activity = require("../../models/Activity");

exports.getTeacherAnalysis = async (req, res) => {
  try {
    const { id } = req.params;

    // Total stats
    const totals = await Activity.aggregate([
      { $match: { teacherId: id } },
      {
        $group: {
          _id: null,
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
      { $project: { _id: 0 } },
    ]);

    //  Subject breakdown
    const subjectBreakdown = await Activity.aggregate([
      { $match: { teacherId: id } },
      {
        $group: {
          _id: "$subject",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          subject: "$_id",
          count: 1,
        },
      },
    ]);

    //  Class breakdown
    const classBreakdown = await Activity.aggregate([
      { $match: { teacherId: id } },
      {
        $group: {
          _id: "$class",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          class: "$_id",
          count: 1,
        },
      },
    ]);

    // Weekly trend
    const weeklyTrend = await Activity.aggregate([
      { $match: { teacherId: id } },
      {
        $group: {
          _id: {
            year: { $isoWeekYear: "$createdAt" },
            week: { $isoWeek: "$createdAt" },
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
        $sort: { "_id.year": 1, "_id.week": 1 },
      },
      {
        $project: {
          _id: 0,
          week: {
            $concat: [
              { $toString: "$_id.year" },
              "-W",
              { $toString: "$_id.week" },
            ],
          },
          lessons: 1,
          quizzes: 1,
          assessments: 1,
        },
      },
    ]);

    res.json({
      totals: totals[0] || { lessons: 0, quizzes: 0, assessments: 0 },
      subjectBreakdown,
      classBreakdown,
      weeklyTrend,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};