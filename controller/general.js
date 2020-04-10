const express = require('express');
const router = express.Router();

const productModel = require("../model/products")
// //Home route    
router.get("/", (req,res)=>{

    productModel.find(/*{isBestSeller: true}*/)
    .then((products)=>{

        const filteredProducts = products.map(product=>{
            return {
                id: product._id,
                title: product.title,
                description: product.description,
                isBestSeller: product.isBestSeller,
                category: product.category,
                price: product.price,
                cc: product.cc,
                imgSrc: product.imgSrc
            }
        });

        res.render("general/home", {
            hTitle: "Homepage",
            data: filteredProducts
        });

    })
    .catch(err =>console.log(`EWrror wehn injecting data to home ${err}`))

})

 module.exports = router;
