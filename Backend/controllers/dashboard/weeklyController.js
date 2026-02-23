const Activity = require("../../models/Activity");

exports.getWeeklyTrends = async (req, res) => {
  try {
    const { teacherId } = req.query;

    const matchStage = teacherId
      ? { $match: { teacherId } }
      : { $match: {} };

    const weeklyData = await Activity.aggregate([
      matchStage,
      {
        $addFields: {
          dayOfWeek: { $dayOfWeek: "$createdAt" }
        }
      },
      {
        $group: {
          _id: "$dayOfWeek",
          lessons: {
            $sum: { $cond: [{ $eq: ["$activityType", "lesson"] }, 1, 0] }
          },
          quizzes: {
            $sum: { $cond: [{ $eq: ["$activityType", "quiz"] }, 1, 0] }
          },
          assessments: {
            $sum: { $cond: [{ $eq: ["$activityType", "assessment"] }, 1, 0] }
          }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const dayMap = {
      1: "Sun",
      2: "Mon",
      3: "Tue",
      4: "Wed",
      5: "Thu",
      6: "Fri",
      7: "Sat"
    };

    const formatted = weeklyData.map(item => ({
      day: dayMap[item._id],
      lessons: item.lessons,
      quizzes: item.quizzes,
      assessments: item.assessments
    }));

    res.json(formatted);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};