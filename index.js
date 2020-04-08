const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//const csurf = require("csurf")
//const session = require("express-session")
require('dotenv').config({path:"./config/keys.env"});

const bestsellers = require("./model/bestSellers")
//const allProducts = require("./model/products")
const category = require("./model/category")
const productModel = require("./model/products")

//const csurfProtection = csurf();
const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: false }))

//app.use(session({secret: process.env.SECRET_KEY, resave: false, saveUninitialized: false}))
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_CONNECTION_KEY, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log(`Connected to mongo yeay`)
})
.catch(err=>console.log(`Cant connect to mongo due to ${err}`))

const generalController = require("./controller/general");
const productController = require("./controller/product");
const usersController = require("./controller/users");

app.use("/", generalController);
app.use("/products", productController);
app.use("/users", usersController);

const PORT = process.env.PORT;
app.listen(PORT,() => {
    console.log("Connected to Asahi's Den");
})