const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    teacherId: { type: String, required: true },
    teacherName: { type: String, required: true },
    activityType: {
      type: String,
      enum: ["lesson", "quiz", "assessment"],
      required: true,
    },
    subject: { type: String, required: true },
    class: { type: String, required: true },
    createdAt: { type: Date, required: true },
  },
  { timestamps: true }
);

// 🔥 Hidden twist handling (duplicate prevention)
activitySchema.index(
  { teacherId: 1, activityType: 1, createdAt: 1, subject: 1, class: 1 },
  { unique: true }
);

module.exports = mongoose.model("Activity", activitySchema);