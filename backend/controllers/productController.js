const Product = require('../models/product')

// Create new product = > api/v1/product/new

exports.newProduct = async (req,res) =>{
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
}

// Get all products => /api/v1/products
exports.getProducts =  async (req,res) =>{
    
    const products = await Product.find();
    res.status(200).json({
        success:true,
        counts: products.length,
        products
    })
}

// Get single products details => /api/v1/product/:id


exports.getSingleProduct = async(req,res) =>{
    const product = await Product.findById(req.params.id);

    if( !product){
        return res.status(404).json({
            success: false,
            message: "Product not found"
        })
    }
    res.status(200).json({
        success : true,
        product
    })
}

// Update Products => /api/v1/product/:id

exports.updateProduct = async(req,res)=>{

    let product = await Product.findById(req.params.id);
    
    if( !product){
        return res.status(404).json({
            success: false,
            message: "Product not found"
        })
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
}

// Deleting the product => /api/v1/admin/product/:id

exports.deleteProduct =async(req,res)=>{
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

}