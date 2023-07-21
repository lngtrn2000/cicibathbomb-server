const express = require('express')
const newsRoute = express.Router()

let News = require('../models/news.model')

//Get News from server
newsRoute.route('/').get(function (req, res) {
    News.find().sort({'newsUploadDate': -1}).then((news,err) => {
        if (err) {
            console.log(error)
        }
        else {
            res.json(news)
        }
    })
})

//Get News by ID
newsRoute.route('/:id').get(function (req, res) {
    News.findById(req.params.id).then((news, err) => {
        if (err) {
            console.log(err)
        }
        else {
            res.json(news)
        }
    })
})

//Create News and post to server
newsRoute.route('/add').post(function (req, res) {
    let createNews = new News(req.body)
    createNews.save()
        .then(createNews => {
            res.status(200).json({ 'news': req.body })
        })
        .catch(err => {
            res.status(400).send('Khong the tao tin tuc moi')
        })
})

//Update News
newsRoute.route('/update/:id').get(function (req, res) {
    News.findByIdAndUpdate(req.params.id, {newsType : req.query.newsType ,newsName : req.query.newsName, newsPreview : req.query.newsPreview, newsContent : req.query.newsContent}, function(news, err) {
        if(err) {
            console.log(err)
        }
        else {
            console.log('Updated news successfully')
        }
    })
    
})

newsRoute.route('/updatelikes/:id').get(function (req, res) {
    News.findByIdAndUpdate(req.params.id, {newsLikes : req.query.likes}, function(err, news) {
        if(err) {
            console.log(err)
        }
        else {
            console.log('Updated Like')
        }
    })
})

//Delete News
newsRoute.route('/delete/:id').get(function (req, res) {
    News.findByIdAndRemove({ _id: req.params.id }, function (err, product) {
        if (err) {
            res.json(err);
        }
        else {
            res.json('Success removed')
        }
    })
})

module.exports = newsRoute