const mongoose = require("mongoose");
const cron = require("node-cron");
const config = require("../config/index");
const citiesName = require("./citiesName");

const citySchema = new mongoose.Schema({
  name: String,
  latitude: Number,
  longitude: Number,
});

const City = mongoose.model("City", citySchema);

const mongoDBUrl = config.MongoDBURL;

const checkAndInsertData = async () => {
  try {
    const count = await City.countDocuments({});

    if (count === 0) {
      const citiesData = citiesName;

      await City.insertMany(citiesData);
      console.log("CronJob:Data inserted successfully!");
    } else {
      console.log("CronJob:Data already exists in the collection.");
    }
  } catch (err) {
    console.error("Error:", err);
  }
};

// Schedule the script to run every day at midnight
cron.schedule("0 0 * * *", () => {
  console.log("CronJob:Running script to check and insert data...");
  checkAndInsertData();
});

mongoose.connect(mongoDBUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

checkAndInsertData();
