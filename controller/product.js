// const express = require('express')
// const router = express.Router();

// const allProducts = require("../model/products")


// router.get("/products", (req,res)=>{
//     res.render("products", {
//         title: "Products",
//         productlistings: allProducts.getAllProducts()
//     });
// })

// router.get("/signup", (req,res)=>{
//     res.render("signup", {
//         title: "Registration"
//     });
// })

// //string = string.toString();
// function checkletters(txt) {
//     let letters = /[a-z]/;
//     txt = txt.toString();
//     if(txt.match(letters)) {
//         return true;
//     }
//     else { 
//         return false; 
//     }
// }
// function checkNumbers(txt) {
//     let numbers = /[0-9]/;
//     txt = txt.toString();
//     if(txt.match(numbers)) {
//         return true;
//     }
//     else { 
//         return false; 
//     }
// }

// router.post("/signup", (req,res)=>{
//     const arr = [];
//     if (req.body.name == ""){
//         arr.push("Missing First Name");
//     }
//     if (checkletters(req.body.password) === false){
//         arr.push("Password should contain letters");
//     }
//     if (checkNumbers(req.body.password) === false){
//         arr.push("Password should contain numbers");
//     }
//     if(req.body.repassword != req.body.password)
//         arr.push("Both the passwords should be same");
//     let pass = req.body.password;
//     if(pass.length < 6)
//         arr.push("Password should be in between 6-12 letters and numbers")

//     if(arr.length > 0){
//         res.render("signup", {
//             title: "Registration",
//             message: arr,
//             name: req.body.name,
//             email: req.body.email,
//         })
//     } else {
//         res.render("products", {
//             title: "Products",
//             productlistings: allProducts.getAllProducts()
//         });
//     }
// })


// module.exports = router;
