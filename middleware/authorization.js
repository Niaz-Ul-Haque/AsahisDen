const loadDashboard = (req,res)=>{

    if(req.session.userInfo.type == "Admin"){
        res.redirect("/users/admin-dashboard")
    }
    else {
        res.redirect("/users/dashboard")
    }
};

module.exports = loadDashboard;