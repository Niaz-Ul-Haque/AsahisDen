const express = require('express')
const router = express.Router();

const allProducts = require("../model/products")

router.get("/allProducts", (req,res)=>{
    res.render("products/allProducts", {
        title: "Products",
        productlistings: allProducts.getAllProducts()
    });
})

router.get("/cart", (req,res)=>{
    res.render("products/cart", {
        title: "Cart"
    });
})

 module.exports = router;
