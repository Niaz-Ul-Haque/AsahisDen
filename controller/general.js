const express = require('express')
const router = express.Router();

const category = require("../model/category")
const bestsellers = require("../model/bestSellers")


//Home route    
router.get("/", (req,res)=>{
    res.render("home", {
        title: "Homepage",
        productcategory: category.getAllProducts(),
        productsbest: bestsellers.getAllProducts()
    });
})


module.exports = router;
