const express = require("express");
const Timeslot = require("models/Timeslot");
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        // Create a new Timeslot instance with request body data
        const newTimeslot = new Timeslot(req.body);

        // Save to MongoDB
        const savedTimeslot = await newTimeslot.save();

        // Respond with the newly created timeslot
        res.status(201).json(savedTimeslot);
    } catch (err) {
        console.error("Error creating timeslot:", err);

        // Handle validation errors (e.g., missing fields)
        if (err.name === "ValidationError") {
            return res.status(400).json({ error: err.message });
        }

        // Return generic error response
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
