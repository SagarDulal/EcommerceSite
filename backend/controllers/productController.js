const Product = require('../models/product')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
// Create new product = > api/v1/product/new

exports.newProduct = catchAsyncErrors (async (req,res) =>{
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
})

// Get all products => /api/v1/products
exports.getProducts =  catchAsyncErrors (async (req,res) =>{
    
    const products = await Product.find();
    res.status(200).json({
        success:true,
        counts: products.length,
        products
    })
})

// Get single products details => /api/v1/product/:id


exports.getSingleProduct = catchAsyncErrors (async(req,res , next) =>{
    const product = await Product.findById(req.params.id);

    if( !product){
        return next(new ErrorHandler("Product is not found", 404));
    }
    res.status(200).json({
        success : true,
        product
    })
})

// Update Products => /api/v1/product/:id

exports.updateProduct = catchAsyncErrors (async(req,res)=>{

    let product = await Product.findById(req.params.id);
    
    if( !product){
        return next(new ErrorHandler("Product is not found", 404));
    }
    product  = await Product.findByIdAndUpdate(req.params.id , req.body,{
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({
        success: true,
        product

    })
})

// Deleting the product => /api/v1/admin/product/:id

exports.deleteProduct =catchAsyncErrors (async(req,res)=>{
    const product = await Product.findById(req.params.id);

    if(!product){
        return res.status(404).json({
            success: false,
            message: "Product is not found"
        })
        
    }
    await product.remove();
        res.status(200).json({
            success: true,
            message:"Product is deleted"
        })

})