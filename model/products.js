const product = {

    DB: [],

    inDB() {
    
    this.DB.push({title:'Shirt 1',description:`Best Summer Shirt`,price:`13.99`, imgSrc: "/img/img1.jpg"});
    this.DB.push({title:'Shirt 2',description:`Best Summer Shirt.`,price:`17.99`, imgSrc: "/img/img 2.jpg"});
    this.DB.push({title:'Shirt 3',description:`Best Summer Shirt`,price:`49.99`, imgSrc: "/img/img 3.jpg"});
    this.DB.push({title:'Shirt 4',description:`Best Summer Shirt`,price:`49.99`, imgSrc: "/img/img 4.jpg"});
    this.DB.push({title:'Shirt 5',description:`Best Summer Shirt`,price:`49.99`, imgSrc: "/img/img 5.jpg"});
    this.DB.push({title:'Shirt 6',description:`Best Summer Shirt`,price:`49.99`, imgSrc: "/img/img 6.jpg"});
    },

    getAllProducts() {
        this.inDB();
        return this.DB;
    }

}

module.exports = product;