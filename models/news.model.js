const mongoose = require('mongoose')
const Schema = mongoose.Schema
let news = new Schema({
    newsName: {
        type: String
    },
    newsImage: {
        type: String
    },
    newsContent: {
        type: String
    },
    newsPreview: {
        type: String
    },
    newsUploadDate: {
        type: Date
    },
    newsLikes: {
        type: Number
    },
    newsType: {
        type: String
    }
},
    {
        collection : `news`
    })
module.exports = mongoose.model('News', news)