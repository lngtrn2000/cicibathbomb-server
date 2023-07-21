// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
// const config = require('./DB.js');
const productsRoute = require('./routes/products.route')
const newsRoute = require('./routes/news.route')
const authRoute = require("./routes/auth.route")
const userRoute = require("./routes/user.route")
const adminRoute = require("./routes/admin.route.js")

dotenv.config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({limit: '200mb'}));
app.use(bodyParser.text({ limit: '200mb' }));
app.use('/products',productsRoute)
app.use('/news',newsRoute)
app.use('/auth',authRoute)
app.use('/user',userRoute)
app.use('/admin', adminRoute)

app.listen(process.env.PORT, function(){
  console.log('Server is running on Port:',process.env.PORT);
});

//Authentication

