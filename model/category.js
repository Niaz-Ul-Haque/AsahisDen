const category = {

    categoryDB: [],

    inDB() {
    
    this.categoryDB.push({title:'Shirt A',description:`Best Summer Shirt`,price:`13.99`, imgSrc: "/img/category 1.jpeg"});
    this.categoryDB.push({title:'Shirt B',description:`Best Summer Shirt.`,price:`17.99`, imgSrc: "/img/category 2.jpg"});
    this.categoryDB.push({title:'Shirt C',description:`Best Summer Shirt`,price:`49.99`, imgSrc: "/img/category 3.jpg"});
    this.categoryDB.push({title:'Shirt D',description:`Best Summer Shirt`,price:`49.99`, imgSrc: "/img/category 4.jpg"});
    },

    getAllProducts() {
      
        return this.categoryDB;
    }

}
this.inDB();
module.exports = category;