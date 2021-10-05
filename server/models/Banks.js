const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BanksSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Banks", BanksSchema);
