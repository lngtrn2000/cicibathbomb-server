const mongoose = require('mongoose')
const Schema = mongoose.Schema;
let products = new Schema({
    productName: {
        type: String
    },
    quantity: {
        type: Number
    },
    price: {
        type: Number
    },
    description : {

    },
    img: {
        type: String
    },
    slider: {
        type: Array
    },
    weight: {
        type: Number
    },
    sold: {
        type: Number
    },
    star: {
        type: Number
    },
    comments: {
        type: Array
    },
    edit: {
        type: Boolean
    }
},
    {
        collection : `products`
    })

module.exports = mongoose.model('Products', products)