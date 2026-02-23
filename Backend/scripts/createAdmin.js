require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const connectDB = require("../config/db");
const User = require("../models/User");

const createAdmin = async () => {
  await connectDB();

  const hashedPassword = await bcrypt.hash(process.env.pass, 10);

  await User.create({
    email: "admin@savra.com",
    password: hashedPassword,
  });

  console.log("Admin user created");
  process.exit();
};

createAdmin();