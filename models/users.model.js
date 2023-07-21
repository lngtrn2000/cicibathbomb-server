const mongoose = require('mongoose')
const users = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
    admin : {
        type : Boolean,
        default : false,
    },
    cart : {
        type : Array,
        default : []
    },
    ordered : {
        type : Array,
        default : []
    }
}, {timestamps : true},
)

module.exports = mongoose.model("User", users)