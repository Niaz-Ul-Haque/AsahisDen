const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require("express-session")
const fileUpload = require("express-fileupload");
const mongoStore = require("connect-mongo")(session);
require('dotenv').config({path:"./config/keys.env"});

//const bestsellers = require("./model/bestSellers")
//const category = require("./model/category")
const productModel = require("./model/products")

const app = express();

app.engine('handlebars', exphbs({
    helpers: {
        iff : function(condition) {
            return condition == true;
        }   
    }
}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_CONNECTION_KEY, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log(`Connected to mongo yeay`)
})
.catch(err=>console.log(`Cant connect to mongo due to ${err}`))

const generalController = require("./controller/general");
const productController = require("./controller/product");
const usersController = require("./controller/users");

app.use(session({
    secret: `${process.env.SECRET_KEY}`, 
    resave: false, 
    saveUninitialized: true,
    store: new mongoStore({ 
        mongooseConnection: mongoose.connection
    }),
    cookie: {
        maxAge: 180 * 60 * 1000
    }
}))

app.use((req,res,next)=>{
    res.locals.user = req.session.userInfo;
    res.locals.session = req.session;
    next();
})

app.use((req,res,next)=>{
    if (req.query.method == "PUT"){
        req.method = "PUT";
    } 
    else if (req.query.method == "DELETE"){
        req.method = "DELETE";
    }
    next();
    
})

app.use(fileUpload());

app.use("/", generalController);
app.use("/products", productController);
app.use("/users", usersController);

const PORT = process.env.PORT;
app.listen(PORT,() => {
    console.log("Connected to Asahi's Den");
})