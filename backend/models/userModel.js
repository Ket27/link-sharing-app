const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
    },

    email : {
        type : String,
        unique:true,
        required: true,
    },

    password : {
        type : String,
        required:true,
    },

    photo : {
        type : String,
        default : "",
    }
})

const userModel = mongoose.model("userModel", userSchema);
module.exports = userModel;