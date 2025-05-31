const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    Type    : {
        type: String,
    },
    Category: {
        type: String,
    },
    Amount: {
        type: Number,
    },
    Date: {
        type: String,
    },
    Description: {
        type: String,
    }
});



userSchema.methods.getSignedToken = function () {
    return jwt.sign({ id: this._id }, "aadil", {
        expiresIn: "1min",
    });
};
const Entries = mongoose.model("Entries", userSchema);
module.exports = Entries