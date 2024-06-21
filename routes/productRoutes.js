const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const {
    getCategory,
    createCategory,
//   updateCategory,
//   deleteCategory,
    getSubCategory,
    createSubCategory,
    getProducts,
    createProduct,
} = require('../controllers/productController');

router.route('/categories')
    .get(getCategory)
    .post(createCategory);


router.route('/subcategories').get(getSubCategory)
router.route('/subcategories/:categoryID').post(createSubCategory);

router.route('/').get(getProducts)
router.route('/:subCategoryID').post(createProduct);
module.exports = router;