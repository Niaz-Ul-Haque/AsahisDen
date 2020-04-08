const express = require('express')
const router = express.Router();
const userModel = require("../model/users") 
//Sign up route
router.get("/signup", (req,res)=>{
    res.render("users/signup", {
       // csrfToken: req.csrfToken(),
        title: "Registration"
    });
})

router.get("/login", (req,res)=>{
    res.render("users/login", {
        title: "Log in"
    });
})

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

router.post("/signup", (req,res)=>{
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
        res.render("users/signup", {
            title: "Registration",
            message: arr,
            name: req.body.name,
            email: req.body.email,
        })
    
    } else {

        //const { name, email, password } = req.body;
        // const sgMail = require('@sendgrid/mail');
        // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        // const msg = {
        // to: `${email}`,
        // from: `theniaz619@gmail.com`,
        // subject: 'Confirmation Email',
        // html: 
        // `
        // Welcome ${name}!, thank you for registering with us. We hope you enjoy your shopping with Asahi's Den<br>
        // Your account details are - <br>
        // Name : ${name} <br>
        // Email : ${email} <br>
        // Password: ${password} <br>
        // `,
        // };

        // sgMail.send(msg)
        // .then(()=>{
        //     res.render("users/dashboard", {
        //         title: "Dashboard",
        //         name: name,
        //         email: email
        //     });
        // })
        // .catch(err=>{
        //     console.log(`Error ${err}`);
        // });

        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }

        const user = new userModel(newUser);
        user.save()
        .then(()=>{
            res.render("users/dashboard", {
                title: "Dashboard",
                name: req.body.name,
                email: req.body.email
            });
        })
        .catch(err=>{
            console.log(`Error ${err}`);
        });
    }
})

router.post("/login", (req,res)=>{
        res.render("users/dashboard", {
            title: "Dashboard"
        });
    }
)


router.get("/dashboard", (req,res)=>{
    res.render("users/dashboard", {
        title: "Dashboard"
    });
})
module.exports = router;