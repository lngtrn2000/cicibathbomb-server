const Products = require("../models/products.model")
const User = require("../models/users.model")

const getController = {
    getHomePage: (req, res) => {
        let perPage = 12
        Products
            .find()
            // .sort({'sold' : -1})
            .limit(perPage)
            .then((product) => {
                res.json(product)
            })
    },

    getAllUser : (req, res) => {
        User.find().then((user) => {
            res.json(user)
        })
    },

    getUserCart : async (req, res) => {
        await User.findOne({_id : Object.keys(req.body)}, function(err,user) {
            if(err){
                console.log(err)
                res.status(404).json("Cannot get user cart")
            }
            else{
                res.json(user)
            }
        })
    },

    getUserOredered : async (req, res) => {
        await User.findOne({_id : Object.keys(req.body)}, function(err,user) {
            if(err){
                console.log(err)
                res.status(404).json("Cannot get user cart")
            }
            else{
                res.json(user)
            }
        })
    },

    getProduct : async (req, res) => {
        await Products.findOne({_id : Object.keys(req.body)}, function(err,product) {
            if(err){
                console.log(err)
                res.status(404).json("Cannot get user cart")
            }
            else{
                res.json(product)
            }
        })
    }
}

module.exports = getController