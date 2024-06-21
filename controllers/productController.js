const { Category, SubCategory, Product } = require('../models/product');


const getCategory = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        console.log('Error:', error);
        res.status(400).json({ message: error.message });
    }
}

const createCategory = async (req, res) => {
    const { name, description } = req.body;
    try {
        const category = await Category.create({ name, description });
        res.status(201).json(category);
    } catch (error) {
        console.log('Error:', error);
        res.status(400).json({ message: error.message });
    }
}

const getSubCategory = async (req, res) => {
    try {
        const subCategories = await SubCategory.find();
        res.status(200).json(subCategories);
    } catch (error) {
        console.log('Error:', error);
        res.status(400).json({ message: error.message });
    }
}

const createSubCategory = async (req, res) => {
    const { categoryID } = req.params;
    // console.log('categoryID:', categoryID);
    const { name } = req.body;
    try {
        const category = await Category.findById(categoryID);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        const subCategory = await SubCategory.create({ name });

    
        category.subCategoryID.push(subCategory._id);
        await category.save();
        
        res.status(201).json(subCategory);
    } catch (error) {
        console.log('Error:', error);
        res.status(400).json({ message: error.message });
    }
}


const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.log('Error:', error);
        res.status(400).json({ message: error.message });
    }
}

const createProduct = async (req, res) => {
    const { subCategoryID } = req.params;
    const { name, description, price, countInStock } = req.body;
    try {
        const subCategory = await SubCategory.findById(subCategoryID);
        if (!subCategory) {
            return res.status(404).json({ message: 'SubCategory not found' });
        }

        const product = await Product.create({ subCategoryID, name, description, price, countInStock });

        subCategory.productID.push(product._id);
        await subCategory.save();
        
        res.status(201).json(product);
    } catch (error) {
        console.log('Error:', error);
        res.status(400).json({ message: error.message });
    }
}


module.exports = { getCategory, createCategory, getSubCategory, createSubCategory, getProducts, createProduct };
