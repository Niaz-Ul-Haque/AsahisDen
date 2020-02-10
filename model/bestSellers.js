const bestSeller = {

    bestSellersDB: [{title:'Shirt A',description:`Best Summer Shirt`,price:`13.99`, imgSrc: "/img/best sellers img 1.jpg"},
    {title:'Shirt C',description:`Best Summer Shirt`,price:`49.99`, imgSrc: "/img/best sellers img 2.jpg"},
    {title:'Shirt B',description:`Best Summer Shirt.`,price:`17.99`, imgSrc: "/img/best sellers img 3.jpg"},
    {title:'Shirt D',description:`Best Summer Shirt`,price:`49.99`, imgSrc: "/img/best sellers img 4.jpg"}],

    getAllProducts() {
        return this.bestSellersDB;
    }

}

module.exports = bestSeller;