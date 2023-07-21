const express = require('express')
const productRoutes = express.Router()
const getController = require('../controllers/getController')


let Products = require('../models/products.model')
const updateController = require('../controllers/updateController')

//Get One Product
productRoutes.post('/find', getController.getProduct)

productRoutes.post('/update/quantity/:id', updateController.updateProductQuantity)

//Add Products
productRoutes.route('/add').post(function (req, res) {
    Products.find({ productName: req.body.productName }, function (err, product) {
        if (product.length) {
            res.status(200).json({ message: 'Tên sản phẩm đã tồn tại!' })
        }
        else {
            let product = new Products(req.body)
            product.save()
                .then(person => {
                    res.status(200).json({ message: 'Sản phẩm "' + req.body.productName + '" đã được tạo thành công' });
                })
                .catch(err => {
                    res.status(400).send("unable to save to database");
                });

        }
    })

});

//Get Products
productRoutes.route('/').get(function (req, res) {
    Products.find().sort({'star' : -1}).exec (function (err, products) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(products);
        }
    });
});

//Product Detail
productRoutes.route('/detail/:id').get(function (req, res) {
    Products.findById(req.params.id, function (err, product) {
        if (err) {
            console.log(err)
        }
        else {
            res.json(product)
        }
    })
})

//Update Star
productRoutes.route('/updatestar/:id').get(function (req, res) {
    Products.findByIdAndUpdate(req.params.id, {star : req.params.star}, function (err, product) {
        if(err) {
            console.log(err)
        }
        else {
           console.log('Update star success')
        }
    })
})

//Get Product Home Page
productRoutes.route('/home').get(function (req, res) {
    let perPage = 12
    Products
        .find()
        // .sort({'sold' : -1})
        .limit(perPage)
        .then((product) => {
            res.json(product)
        })
})

//Remove Product
productRoutes.route('/delete/:id').get(function (req, res) {
    Products.findByIdAndRemove({ _id: req.params.id }, function (err, product) {
        if (err) {
            res.json(err);
        }
        else {
            res.json('Success removed')
        }
    })
})

//Update Product
productRoutes.route('/update/:id').get(function (req, res) {
    Products.findByIdAndUpdate(req.params.id, { productName: req.query.productName, quantity: req.query.quantity, price: req.query.price, weight: req.query.weight }, function (err, product) {
        if (err) {
            console.log(err)
        }
        else {
            console.log(("Updated user: ", product))
        }
    })
    console.log(req.query)
})



//Update Comments
productRoutes.route('/updatecomments/:id').get(function (req, res) {
    let cmt = req.query.comments
    if(cmt == undefined || cmt == null){
        cmt = []
    }
    Products.findByIdAndUpdate(req.params.id, { comments: cmt }, function (product, err) {
        if (err) {
            console.log(req.query.comments)
        }
        else {
            console.log(req.query.comments)
        }
    })
})

//Update Liked Comment
// productRoutes.route('/updatelikedcomment/:id').get(function (req, res) {
//     Products.findByIdAndUpdate(req.params.id, { comments})
// })

//Search Product
productRoutes.route('/search/:name').get(function (req, res) {
    Products.find({ productName: { $regex: `${req.params.name}`, $options: 'i' } }, (err, product) => {
        if (err) {
            throw err
        }
        else {
            res.json(product)
        }
    })
})

productRoutes.route('/sort/:sorttype/:ordertype').get(function (req, res) {
    let sorttype = req.params.sorttype
    let ordertype = req.params.ordertype
    Products.find().sort({ [sorttype]: [ordertype] }).then((product) => {
        res.json(product)
    })
})

//Phân trang Product
productRoutes.route('/productspage/:page').get(function (req, res, next) {
    let perPage = 12
    let page = req.params.page || 1
    Products
        .find()
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec((err, products) => {
            Products.countDocuments((err, count) => {
                if (err) return next(err);
                res.send(products)
            })
        })
})

//Phân trang và phân loại
productRoutes.route('/productspage/:page/:sorttype/:ordertype').get(function (req, res, next) {
    let perPage = 12
    let page = req.params.page || 1
    let sorttype = req.params.sorttype
    let ordertype = req.params.ordertype
    Products
        .find()
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .sort({ [sorttype]: [ordertype] })
        .exec((err, products) => {
            Products.countDocuments((err, count) => {
                if (err) return next(err);
                else res.send(products)
            })
        })
})


module.exports = productRoutes