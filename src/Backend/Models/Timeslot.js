const mongoose = require("mongoose");

const TimeslotSchema = new mongoose.Schema
({
    employeeName : { type: String, required: true},
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    userId: { type: String, required: true }
});

module.exports = mongoose.model("Timeslot", TimeslotSchema);