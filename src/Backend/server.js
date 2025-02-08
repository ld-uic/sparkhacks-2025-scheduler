const express = require("express");
const cors = require("cors");
const timeslotRoutes = require("/routes/timeslots");
var fs = require("fs"),json;

const data = JSON.parse(await fs.readFile('data.json', 'utf8'));

const app = express();
const port = process.env.PORT || 5000;


//connectDB();

app.use(cors());
app.use(express.json());

app.use("/timeslots", timeslotRoutes);

app.get("/", (req, res) => {
    res.send(":rocket: API is working!");
});

app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
});