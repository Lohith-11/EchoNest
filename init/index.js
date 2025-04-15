const mongoose = require('mongoose');
const initData = require('./data');
const Listing = require("../models/listing");

const MONGO_URL = "mongodb://127.0.0.1:27017/echoNest"; // Use localhost for debugging locally
main().then(() => {
    console.log("Database connected");
}).catch((err) => {
    console.log("Database connection error:", err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});
    console.log("Existing listings deleted");
    initData.data = initData.data.map((obj) => ({ ...obj, owner: "67baba1616aa76370b8590f7" }));
    const insertedListings = await Listing.insertMany(initData.data);
    console.log("Inserted Listings:", insertedListings);
    console.log("Data was initialized");
};

initDB();