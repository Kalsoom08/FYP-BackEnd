const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Mongo DB Connected");
    } catch (error) {
        console.log("DB Connection Error:", error.message);
        process.exit()
    }
}
module.exports = connectDB();