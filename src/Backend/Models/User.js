const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema
({
    id : { type: Number, required: true},
    permissions: { type: Number, required: true, default: 0 },
    name : { type: String, required: true},
    workhours: { 
        Mo: { type: [String], default: [] },
        Tu: { type: [String], default: [] },
        We: { type: [String], default: [] },
        Th: { type: [String], default: [] },
        Fr: { type: [String], default: [] },
        Sa: { type: [String], default: [] },
        Su: { type: [String], default: [] }
    }

});

module.exports = mongoose.model("User", UserSchema);