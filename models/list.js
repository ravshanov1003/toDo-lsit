const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const listSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    snippet: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const List = mongoose.model("list", listSchema)
module.exports = List;