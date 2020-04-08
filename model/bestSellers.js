const bestSeller = {

    bestSellersDB: [{title:'Shirt A',description:`Best Summer Shirt`,price:`13.99`, imgSrc: "/img/img 2.jpg"},
    {title:'Shirt C',description:`Best Summer Shirt`,price:`49.99`, imgSrc: "/img/img 2.jpg"},
    {title:'Shirt B',description:`Best Summer Shirt.`,price:`17.99`, imgSrc: "/img/img 2.jpg"},
    {title:'Shirt D',description:`Best Summer Shirt`,price:`49.99`, imgSrc: "/img/img 2.jpg"}],

    getAllProducts() {
        return this.bestSellersDB;
    }

}

module.exports = bestSeller;