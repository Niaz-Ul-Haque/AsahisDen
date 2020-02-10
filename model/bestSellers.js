const bestSeller = {

    bestSellersDB: [],

    inDB() {
    
    this.bestSellersDB.push({title:'Shirt 1',description:`Best Summer Shirt`,price:`13.99`, imgSrc: "/img/img1.jpg"});
    this.bestSellersDB.push({title:'Shirt 2',description:`Best Summer Shirt.`,price:`17.99`, imgSrc: "/img/img 2.jpg"});
    this.bestSellersDB.push({title:'Shirt 3',description:`Best Summer Shirt`,price:`49.99`, imgSrc: "/img/img 3.jpg"});
    this.bestSellersDB.push({title:'Shirt 4',description:`Best Summer Shirt`,price:`49.99`, imgSrc: "/img/img 4.jpg"});
    },

    getAllProducts() {
        
        return this.bestSellersDB;
    }

}
this.inDB();
module.exports = bestSeller;