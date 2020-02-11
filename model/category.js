const category = {

    categoryDB: [{title:'Shirt A',description:`Best Summer Shirt`,price:`13.99`, imgSrc: "/img/category 1.jpeg", name: "Kids"},
    {title:'Shirt C',description:`Best Summer Shirt`,price:`49.99`, imgSrc: "/img/category 3.jpg", name: "Teens"},
    {title:'Shirt B',description:`Best Summer Shirt.`,price:`17.99`, imgSrc: "/img/category 2.jpg", name: "Male"},
    {title:'Shirt D',description:`Best Summer Shirt`,price:`49.99`, imgSrc: "/img/category 4.jpg", name: "Female"}],

    getAllProducts() {
        return this.categoryDB;
    }

}

module.exports = category;