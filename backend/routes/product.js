const express = require('express');
const router = express.Router();
const { getProducts,
    newProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')



// Getting of the products
router.route('/products').get(isAuthenticatedUser, authorizeRoles('admin'), getProducts)
router.route('/product/:id').get(getSingleProduct)



// Posting new products as well as updating by the admin
router.route('/admin/products/new').post(isAuthenticatedUser, authorizeRoles('admin'), newProduct)



// Updating and delete of the products
router.route('/admin/product/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct).delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct)




module.exports = router