const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    name: {
        type:String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    type: {
        type:String,
        default: "User"
    }
})
userSchema.pre("save", function(next){
    bcrypt.genSalt(10)
    .then((salt)=>{
        bcrypt.hash(this.password, salt)
        .then((encryptPassword)=>{
            this.password = encryptPassword;
            next();
        })
        .catch(err=>console.log(`Err when salting 1: ${err}`))
    })
    .catch(err =>console.log(`Err when salting 2: ${err}`))
})

module.exports = mongoose.model('User', userSchema);