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
        productcategory: category.getAllProducts(),
        productsbest: bestsellers.getAllProducts()
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

app.post("/formval", (req,res)=>{
    const arr = [];
    var lettersandnumbers = /^[A-Za-z]+$/;;

    if (req.body.name == ""){
        arr.push("Please enter a name");
    }
    if (req.body.password.match(lettersandnumbers) == -1){
        arr.push("Please enter a password with atleast a single letter or number, and 6 - 12 characters long");
    }
    

    if(arr.length > 0){
        res.render("signup", {
            title: "Registration",
            message: arr,
            name: req.body.name,
            email: req.body.email,
        })
    } else {
        res.render("products", {
            title: "Products",
            productlistings: allProducts.getAllProducts()
        });
    }
})

const port = 3000;
app.listen(port,() => {
    console.log("Connected to Asahi's Den");
})