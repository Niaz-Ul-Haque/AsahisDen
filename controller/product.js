const express = require('express')
const router = express.Router();
const path = require('path');

const productModel = require("../model/products");
const Cart = require("../model/cart");
const isLogged = require('../middleware/auth')
const otherAuthor = require('../middleware/otherAuthor')

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

router.get("/adminProducts",isLogged, otherAuthor, (req,res)=>{
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

router.get("/cart", isLogged, (req,res)=>{

    if (!req.session.cart){
        return res.render("products/cart", {
            hTitle: "Cart",
            products: null
        })
    }
    const cart = new Cart(req.session.cart);
    res.render("products/cart",{
        hTitle: "Cart",
        products: cart.generateArray(),
        totalPrice: cart.totalPrice,
        imgSrc: cart.imgSrc
    })
    
})


router.get("/cart/:id", isLogged, (req,res)=>{

    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {})

    productModel.findById(productId, (err, product)=>{
        if(err){
            console.log(`Err when adding to cart : -- ${err}`);
        }
        cart.add(product, product.id)
        req.session.cart = cart;
        res.redirect("/products/allProducts")
    });
})

router.get("/reduce/:id", (req, res)=>{
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.reduceByOne(productId);
    req.session.cart = cart;
    res.redirect("/products/cart")
});

router.get("/remove/:id", (req, res)=>{
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.removeProduct(productId);
    req.session.cart = cart;
    res.redirect("/products/cart")
});

router.get("/checkout", isLogged, (req,res)=>{
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
        //req.session.userInfo = user;
       // req.session.cart = cart;
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
        to: `${req.session.userInfo.email}`,
        from: `firstsharer@gmail.com`,
        subject: `Asahi's Den Reciept`,
        html: 
        `
        Thank you for shopping with us ${req.session.userInfo.name}!. Here is your purchase details - <br>
        <table style=" border: 1px solid black">
            <tr>
                <th style=" border: 1px solid black">Product Name</th>
                <th style=" border: 1px solid black">Price</th>
            </tr>
            {{#each req.session.cart}}
            <tr>
                <td style=" border: 1px solid black">${Object.keys(req.session.cart.products).map(productId => req.session.cart.products[productId].products.title)}</td>
                <td style=" border: 1px solid black">${Object.keys(req.session.cart.products).map(productId => req.session.cart.products[productId].products.price)}</td>
            </tr>
            {{/each}}
                <tr>
                <td colspan="2" style=" border: 1px solid black">Total: ${req.session.cart.totalPrice}</td>
            </tr>
        </table>
        
        `,
        };

        sgMail.send(msg)
        .then(()=>{
            req.session.cart = null;
            res.render("general/home", {
                hTitle: "Homepage",
                data: filteredProducts,
                checkoutMessage: true
            });
        })
        .catch(err =>console.log(`EWrror wehn checkingout with emails final${err}`));    

    })
    .catch(err =>console.log(`EWrror wehn checkingout with emails first ${err}`))

})

router.get("/addProduct",  isLogged, otherAuthor, (req,res)=>{
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
        res.redirect("/");
    }
})


router.get("/productDetails/:id",(req,res)=>{

    productModel.findById(req.params.id)
    .then((product)=>{
        
        const {_id, title, description, price, isBestSeller, quantity, category, imgSrc} = product
        res.render("products/productDetails", {
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
    .catch(err =>console.log(`Error when getting product details : ${err}`))
})

 module.exports = router;
