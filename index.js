const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require('body-parser')

const bestsellers = require("./model/bestSellers")
const allProducts = require("./model/products")
const category = require("./model/category")

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static("public"));

//Home route    
app.get("/", (req,res)=>{
    res.render("home", {
        title: "Homepage",
        productcategory: category.getAllProducts()
    });
})

//Products route
app.get("/products", (req,res)=>{
    res.render("products", {
        title: "Products",
        productlistings: allProducts.getAllProducts()
    });
})

//Sign up route
app.get("/signup", (req,res)=>{
    res.render("signup", {
        title: "Registration"
    });
})

//Login route
app.get("/login", (req,res)=>{
    res.render("login", {
        title: "Login"
    });
})

const port = 3000;
app.listen(port,() => {
    console.log("Connected to Asahi's Den");
})