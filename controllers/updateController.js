const User = require("../models/users.model")
const Products = require("../models/products.model")
const updateController = {
    addToUserCart: (req, res) => {
        User.findByIdAndUpdate(req.params.id, { cart: req.body }, function (err, user) {
            if (err) {
                console.log(err)
            }
            else {
                res.status(200).json({ message: "Đã thêm vào giỏ hàng" })
            }
        })
        console.log(req.body)
    },

    addToUserOrdered: (req, res) => {
        User.findByIdAndUpdate(req.params.id, { ordered: req.body }, function (err, user) {
            if (err) {
                console.log(err)
            }
            else {
                res.status(200).json({ message: "Đặt hàng thành công" })
            }
        })
        console.log(req.body)
    },

    updateProductQuantity : async (req, res) => {
        let minus = 0
        await Products.findOne({_id : req.params.id}, function(err,product) {
            if(err){
                console.log(err)
                res.status(404).json("Cannot get user cart")
            }
            else{
                minus = product.quantity - Object.keys(req.body)
            }
        })

        await Products.findByIdAndUpdate(req.params.id, { quantity: minus }, function (err, user) {
            if (err) {
                console.log(err)
            }
            else {
                res.status(200).json({ message: "Đặt hàng thành công" })
            }
        })
    }

}

module.exports = updateController