const express = require('express')
const router = express.Router();
const path = require('path');

const adminProdLoader = require('../middleware/adminProductsLoader');
const productModel = require("../model/products")

router.get("/allProducts", (req,res)=>{
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

        res.render("products/allProducts", {
            hTitle: "All Products",
            data: filteredProducts
        });

    })
    .catch(err =>console.log(`EWrror wehn injecting data to home ${err}`))
})

router.get("/adminProducts", (req,res)=>{
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

        res.render("products/adminProducts", {
            hTitle: "Admin Products",
            data: filteredProducts
        });

    })
    .catch(err =>console.log(`EWrror wehn injecting data to home ${err}`))
})

router.get("/cart", (req,res)=>{
    res.render("products/cart", {
        hTitle: "Cart"
    });
})

router.get("/addProduct",   (req,res)=>{
    res.render("products/addProduct", {
        hTitle: "Add a Product"
    });
})

router.post("/addProduct", (req,res)=>{
    
    const newProduct = {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        isBestSeller: req.body.isBestSeller,
        quantity: req.body.quantity,
        category: req.body.category
        //imgSrc: req.body.imgSrc
    }
    
    const singleProduct = new productModel(newProduct);
    singleProduct.save()
    .then((product)=>{
        const imgSrcReal = `product_${product._id}${path.parse(req.files.imgSrc.name).ext}`;
        req.files.imgSrc.mv(`public/imguploaded/${imgSrcReal}`)
        .then(()=>{
            productModel.updateOne({_id: product._id},{
                imgSrc: imgSrcReal
            })
            .then(()=>{
                res.redirect("/products/allProducts");
            })
            .catch(err => console.log(`Error when uploading an image final step : ${err}`));
        })
        .catch(err =>console.log(`Error when uploading an image : ${err}`));
    })
    .catch(err => console.log(`Erro when adding product ${err}`));

  
})

router.get("/editProduct/:id",(req,res)=>{

    productModel.findById(req.params.id)
    .then((product)=>{
        
        const {_id, title, description, price, isBestSeller, quantity, category, imgSrc} = product
        res.render("products/editProduct", {
            _id,
            title,
            description,
            price, 
            isBestSeller,
            quantity,
            category,
            imgSrc
        });
    })
    .catch(err =>console.log(`Error when editing a product : ${err}`))
})

router.put("/update/:id", (req, res) => {

    const product = {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price, 
        isBestSeller: req.body.isBestSeller,
        quantity: req.body.quantity,
        category: req.body.category,
        imgSrc: req.body.imgSrc
    }

    productModel.updateOne({_id:req.params.id}, product)
    .then(() =>{
        res.redirect("/products/allProducts");
    })
    .catch(err => console.log(`Error when updating a single product - ${err}`))

});


router.delete("/delete/:id",(req, res) =>{
    productModel.deleteOne({_id: req.params.id})
    .then(() =>{
        res.redirect("/products/allProducts");
    })
    .catch(err=>console.log(`Error when deleting a product: ${err}`))
});


//----------------------------
router.get("/:category", (req,res)=>{
    if (req.params.category == "Summer") {
        productModel.find({category: req.params.category})
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
            res.render("products/allProducts", {
                hTitle: `${req.params.category} Products`,
                data: filteredProducts
            });
        })
        .catch(err =>console.log(`EWrror wehn injecting data to home ${err}`))
    } 
    else if(req.params.category == "Winter") {
        productModel.find({category: req.params.category})
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
            res.render("products/allProducts", {
                hTitle: `${req.params.category} Products`,
                data: filteredProducts
            });
        })
        .catch(err =>console.log(`EWrror wehn injecting data to home ${err}`))
    } 
    else if(req.params.category == "Spring") {
        productModel.find({category: req.params.category})
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
            res.render("products/allProducts", {
                hTitle: `${req.params.category} Products`,
                data: filteredProducts
            });
        })
        .catch(err =>console.log(`EWrror wehn injecting data to home ${err}`))
    } 
    else if(req.params.category == "Fall") {
        productModel.find({category: req.params.category})
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
            res.render("products/allProducts", {
                hTitle: `${req.params.category} Products`,
                data: filteredProducts
            });
        })
        .catch(err =>console.log(`EWrror wehn injecting data to home ${err}`))
    } 
    else {
        res.redirect("/general/home");
    }
})


 module.exports = router;
