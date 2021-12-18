const express= require('express');
const router = express.Router();
const {getProducts, 
    newProduct,
     getSingleProduct ,
     updateProduct,
    deleteProduct
 } = require('../controllers/productController')

 const {isAuthenticatedUser} = require('../middlewares/auth')



// Getting of the products
router.route('/products').get(isAuthenticatedUser, getProducts)
router.route('/product/:id').get(getSingleProduct)



// Posting new products as well as updating by the admin
router.route('/admin/products/new').post(isAuthenticatedUser,newProduct)



// Updating and delete of the products
router.route('/admin/product/:id').put(isAuthenticatedUser,updateProduct).delete(isAuthenticatedUser,deleteProduct)




module.exports = router