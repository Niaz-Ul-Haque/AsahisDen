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

//string = string.toString();
function checkletters(txt) {
    let letters = /[a-z]/;
    txt = txt.toString();
    if(txt.match(letters)) {
        return true;
    }
    else { 
        return false; 
    }
}
function checkNumbers(txt) {
    let numbers = /[0-9]/;
    txt = txt.toString();
    if(txt.match(numbers)) {
        return true;
    }
    else { 
        return false; 
    }
}

app.post("/signup", (req,res)=>{
    const arr = [];
    if (req.body.name == ""){
        arr.push("Missing First Name");
    }
    if (checkletters(req.body.password) === false){
        arr.push("Password should contain letters");
    }
    if (checkNumbers(req.body.password) === false){
        arr.push("Password should contain numbers");
    }
    if(req.body.repassword != req.body.password)
        arr.push("Both the passwords should be same");
    let pass = req.body.password;
    if(pass.length < 6)
        arr.push("Password should be in between 6-12 letters and numbers")

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