const loadDashboard = (req,res)=>{

    if(req.session.userInfo.type == "Admin"){
        res.render("users/admin-dashboard")
    }
    else {
        res.render("users/dashboard")
    }
};

module.exports = loadDashboard;