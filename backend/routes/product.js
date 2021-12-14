const express= require('express');
const router = express.Router();
const {getProducts, newProduct} = require('../controllers/productController')


router.route('/products/new').post(newProduct)
router.route('/products').get(getProducts)

module.exports = router