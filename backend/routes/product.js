const express= require('express');
const router = express.Router();
const {getProducts, 
    newProduct,
     getSingleProduct ,
     updateProduct,
    deleteProduct
 } = require('../controllers/productController')

// Getting of the products
router.route('/products').get(getProducts)
router.route('/product/:id').get(getSingleProduct)

// Posting new products as well as updating by the admin
router.route('/admin/products/new').post(newProduct)

// Updating and delete of the products
router.route('/admin/product/:id').put(updateProduct).delete(deleteProduct)

module.exports = router