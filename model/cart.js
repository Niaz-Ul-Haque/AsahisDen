module.exports = function cart(oldCart){

    if(oldCart.products != undefined){
        this.products = oldCart.products;
    }
    else{
        this.products = {};
    };
    this.totalQuantity = oldCart.totalQuantity || 0;
    this.totalPrice = oldCart.totalPrice || 0;
    this.imgSrc = oldCart.imgSrc || null;
    
    this.add = function(product, id){
        var storedProduct = this.products[id];
        if (!storedProduct){
            storedProduct = this.products[id] = {
                products: product, qty: 0, price: 0
            };
        }
        storedProduct.qty++;
        storedProduct.price= storedProduct.products.price * storedProduct.qty;
        this.totalQuantity += 1;
        this.totalPrice += storedProduct.products.price;
    };

    this.reduceByOne = (id) =>{
        this.products[id].qty--;
        this.products[id].price -= this.products[id].products.price;
        this.totalQuantity--;
        this.totalPrice -= this.products[id].products.price;

        if (this.products[id].qty <= 0){
            delete this.products[id];
        }
    };

    this.removeProduct = (id) =>{
        this.totalQuantity -= this.products[id].qty;
        this.totalPrice -= this.products[id].price;
        delete this.products[id];
    }

    this.generateArray = function(){
        const arr = [];
        for(var id in this.products){
            arr.push(this.products[id]);
        }
        return arr;
    }

}