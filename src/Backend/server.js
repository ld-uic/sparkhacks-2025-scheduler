const express = require("express");
const cors = require("cors");
const timeslotRoutes = require("/routes/timeslots");

const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());

app.use("/timeslots", timeslotRoutes);

app.get("/", (req, res) => {
    res.send(":rocket: API is working!");
});

app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
});