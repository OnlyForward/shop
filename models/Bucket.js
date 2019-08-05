const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Bucket = new Schema({
    userId:{
        required:true,
        type: mongoose.Types.ObjectId,
    },
    products:{
        items: [{
            productId: { type: mongoose.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true }
        }]
    },
    totalPrice:{
        required:true,
        type:Number
    }
});

Bucket.methods.addTobucket = function(product){
    const index = this.products.items.findIndex(item=>{
        return item.productId.toString() === product._id.toString();
    });

    let newQuantity = 1;
    const updatedCartItems = [...this.products.items];
    if(index<0){
        updatedCartItems.push({
            productId: product._id,
            quantity: newQuantity
        });
    }else{
        newQuantity = updatedCartItems[index].quantity + 1;
        updatedCartItems[index].quantity = newQuantity;
    }

    return this.save();
}

Bucket.methods.removeProduct = function(productId){
    const updatedCartItems = this.product.sitems.filter(item=>{
        return item.productId.toString() !== productId.toString();
    })
    this.products.items = updatedCartItems;
    
    return this.save();
}

Bucket.methods.clearBucket = function(){
    this.products = { items: [] }
    return this.save();
}


module.exports = mongoose.model('Bucket',Bucket);