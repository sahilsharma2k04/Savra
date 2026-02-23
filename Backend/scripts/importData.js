require("dotenv").config();
const mongoose = require("mongoose");
const xlsx = require("xlsx");
const path = require("path");
const connectDB = require("../config/db");
const Activity = require("../models/Activity");

const normalizeActivityType = (type) => {
  const value = type.trim().toLowerCase();

  if (value === "lesson plan") return "lesson";
  if (value === "quiz") return "quiz";
  if (value === "question paper") return "assessment";

  return null;
};

const importData = async () => {
  try {
    await connectDB();

    const filePath = path.join(__dirname, "../Savra_Teacher Data Set.xlsx");
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    const formattedData = sheetData.map((row) => {
      const activityType = normalizeActivityType(row.Activity_type);

      if (!activityType) {
        console.warn("Unknown activity type:", row.Activity_type);
      }

      return {
        teacherId: String(row.Teacher_id).trim(),
        teacherName: String(row.Teacher_name).trim(),
        activityType,
        subject: String(row.Subject).trim(),
        class: String(row.Grade).trim(),
        createdAt: new Date(row.Created_at),
      };
    });

    // Remove invalid rows (if any)
    const validData = formattedData.filter((item) => item.activityType);

    await Activity.insertMany(validData, { ordered: false });

    console.log(" Data Imported Successfully");
    process.exit();
  } catch (error) {
    console.error(" Import Failed:", error.message);
    process.exit(1);
  }
};

importData();