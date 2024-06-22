const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const {
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
    getAllSubCategory,
    getSubCategory,
    createSubCategory,
    updateSubCategory,
    deleteSubCategory,
    getAllProducts,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
} = require('../controllers/productController');

router.route('/categories')
        .get(getCategory)
        .post(protect, admin, createCategory);
router.route('/categories/:categoryID')
        .put(protect, admin, updateCategory)
        .delete(protect, admin, deleteCategory);


router.route('/subcategories')
        .get(getAllSubCategory)
router.route('/subcategories/:categoryID')
        .post(protect, admin, createSubCategory)
        .get(getSubCategory);
router.route('/subcategories/:subCategoryID')
        .put(protect, admin, updateSubCategory)
        .delete(protect, admin, deleteSubCategory);


router.route('/')
        .get(protect, admin, getAllProducts )
router.route('/:subCategoryID')
        .post(protect, admin, createProduct)
        .get(getProducts);
router.route('/:productID')
        .put(protect, admin, updateProduct)
        .delete(protect, admin, deleteProduct);
        
module.exports = router;