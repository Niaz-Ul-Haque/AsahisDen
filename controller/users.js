const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')

const isLogged = require('../middleware/auth')
const dashboardLoader = require("../middleware/authorization")

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
            res.render("users/login", {
                title: "Sign in"
            });
        })
        .catch(err=>{
            console.log(`Error ${err}`);
        });
    }
})

router.post("/login", (req,res)=>{

    const arr = [];
    userModel.findOne({email: req.body.email})
    .then(user=>{
        if(user == null){
            arr.push("Email or Password is incorrect");
            res.render("users/login", {
                title: "Registration",
                message: arr
            })
        }
        else {
                bcrypt.compare(req.body.password, user.password)
                .then((isMatched)=>{
                    if(isMatched){
                        req.session.userInfo = user;
                        //res.redirect("/users/dashboard")
                        dashboardLoader(req,res);
                    }
                    else {
                        arr.push("Email or Password is incorrect");
                        res.render("users/login", {
                            title: "Registration",
                            message: arr
                        })
                    }

                })
                .catch((err=>console.log(`Error when logging (password) from db 1 ${err}`)));
        }
    })
    .catch((err=>console.log(`Error when logging (email) from db 1 ${err}`)));

})


router.get("/logout", (req,res)=>{
    req.session.destroy();
    res.redirect("/users/login");
})

router.get("/dashboard", isLogged, (req,res)=>{
    res.render("users/dashboard", {
        title: "Dashboard",
        name: req.body.name
    });
})

router.get("/admin-dashboard", isLogged, (req,res)=>{
    res.render("users/admin-dashboard", {
        title: "Admin Dashboard",
        name: req.body.name
    });
})
module.exports = router;