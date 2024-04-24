const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("- ✅ Connection to the database successful !");
  } catch (error) {
    console.log("Connection failed: ", error);
    process.exit();
  }
};

module.exports = connectDB;
