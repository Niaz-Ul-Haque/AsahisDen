const loadAuthor = (req,res, next)=>{

    if(req.session.userInfo.type == "Admin"){
        next();
    }
    else {
        res.render("users/dashboard", {
            message: true
        })
    }
};

module.exports = loadAuthor;