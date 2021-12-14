const mongoose =require('mongoose')

const ProductSchema = new mongoose.Schema({

name:{
    type:String,
    required: [true, "Please enter product name"],
    trim: true,
    maxlength:[20, "Product name cannot exceed 20 characters"]
},
price:{
    type: Number,
    required:[true, "Please enter the product price"],
    maxLength:[5,'Product price cannot exceed 5 digits'],
    default: 0.0
},
description:{
    type: String,
    required: [true, "Please enter product Description"]
},
ratings:{
    type: Number,
    default: 0
},
images:[
    {
    public_id: {
        type: String,
        required: true
    },
    url:{
        type: String,
        required: true
    }
}
],
category:{
    type: String,
    required: [true, "Please select category for this product"],
    enum: {
        values: [
            'Electronics',
            'Cameras',
            'Laptop',
            'Accessories',
            'Headphones',
            'Food',
            'Books',
            'Clothes/Shoes',
            'Beauty/Health',
            'Sports',
            'Outdoor',
            'Home'
        ],
        message: "Please select correct category for products"
    }
},
stock: {
    type: Number,
    required: [true, "Please enter product stock"],
    maxlength:[5, "Product name cannot exceed 5 characters"],
    default: 0
},
seller: {
    type: String,
    required: [ true, "Please enter product seller"]
},
numofReviews:{
    type: Number,
    default: 0 
},
reviews:[
    {
        name:{
            type: String,
            required: true
        },
        rating:{
            type:Number,
            required:true
        },
        comment:{
            type: String,
            required: true
        }
    }
],
createdAt:{
    type:Date,
    default: Date.now
}

});

module.exports = mongoose.model('Product', ProductSchema)