const isLoggedIn = (req,res,next)=>{

    if(req.session.userInfo){
        next();
    }
    else {
        res.redirect("/users/login")
    }
}

module.exports = isLoggedIn;