const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
         type: String,
        required:[true, "Please enter the product name" ],
        trim: true, 
        maxLength: [100, "Product name cannot exceed 100 characters"]
    },
    price: {
        type: Number,
       required:[ true, "PLease enter product price"], 
       maxLength: [5, "Product price cannot exceed 5 digits"]
   },
   description: {
    type: String,
   required:[ true, "PLease enter product description"],
    },
    ratings:{
    type: Number,
    default: 0
    }, 
    images:[
        {
            public_id: {
                type: String,
                // required: [true]
            },
            url:{
                type: String,
                // required: true
            }
        }
    ],
    category:{
        type: String,
        required: [ true, "Please select category for this product"],
        enum: { 
            values:[
                'Electronics',
                'Cameras',
                'Laptops',
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
            message: 'Please select correct category for the product'
        }
    },
    seller: {
        type: String,
        required: [ true, 'Please enter product seller']
    },
    stock: {
        type: Number,
        required: [true, 'Please enter product stock'],
        maxLength: [5, 'Product name cannot exceed 5 characters'],
        default:0
    },
    numofReviews:{
        type: Number,
        default: 0
    },
    reviews: [ 
         {
            name:{
            type: String,
            required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    createdAt: { 
        type: Date,  
        default: Date.now
    }

})

module.exports = mongoose.model('Product', productSchema);