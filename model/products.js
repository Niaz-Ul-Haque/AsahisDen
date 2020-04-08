const product = {

    DB: [{title:'Shirt 1',description:`Best Summer Shirt`,price:`13.99`, isBestSeller: true, imgSrc: "/img/img 2.jpg"},
    {title:'Shirt 2',description:`Best Summer Shirt.`,price:`17.99`, isBestSeller: false, imgSrc: "/img/img 2.png"},
    {title:'Shirt 3',description:`Best Summer Shirt`,price:`49.99`, isBestSeller: true, imgSrc: "/img/img 2.jpg"},
    {title:'Shirt 4',description:`Best Summer Shirt`,price:`49.99`, isBestSeller: true, imgSrc: "/img/img 2.png"},
    {title:'Shirt 5',description:`Best Summer Shirt`,price:`49.99`, isBestSeller: true, imgSrc: "/img/img 2.png"},
    {title:'Shirt 6',description:`Best Summer Shirt`,price:`49.99`, isBestSeller: false, imgSrc: "/img/img 2.jpg"}],  
  
    getAllProducts() {
        return this.DB;
    }

}

module.exports = product;

// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const schema = new Schema({
//     imgSrc:{
//         type: String, 
//         required: true},
//     title:{
//         type: String, 
//         required: true},
//     description:{
//         type: String, 
//         required: true},
//     price:{
//         type: Number, 
//         required: true},
//     isBestSeller:{
//         type: Boolean
//     }
// });

// const productModels =  mongoose.model('Product', schema);
// module.exports = productModels;