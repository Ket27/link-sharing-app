const mongoose = require("mongoose");
const userModel = require("./userModel");

const linkSchema = mongoose.Schema({
    userId : {
        type : mongoose.Schema.ObjectId,
        ref : userModel,
    },

    links : [{
        platform : {
            type:String,
            required: true,
        },
        url : {
            type : String,
            required : true,
        },
    }],
})

const linkModel = mongoose.model("linkModel", linkSchema);

module.exports = linkModel;