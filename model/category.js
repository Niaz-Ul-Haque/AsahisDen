const category = {

    categoryDB: [{imgSrc: "/img/img 2.jpg", name: "Kids"},
    {imgSrc: "/img/img 2.jpg", name: "Teens"},
    {imgSrc: "/img/img 2.jpg", name: "Male"},
    {imgSrc: "/img/img 2.jpg", name: "Female"}],

    getAllProducts() {
        return this.categoryDB;
    }

}

module.exports = category;

// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const schema = new Schema({
//     imgSrc:{
//         type: String, 
//         required: true},
//     categoryTitle:{
//         type: String, 
//         required: true}
//     
// });

// const categoryModel =  mongoose.model('Category', schema);
// module.exports = categoryModel;