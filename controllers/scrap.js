const {Category, SubCategory, Product } = require('../models/product'); 
const mongoose = require('mongoose');


const getCategory = async (req, res) => {
    try{
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {   
        res.status(400).json({ message: error.message });
    }
} 

const createCategory = async (req, res) => {
    const {categoryID, name } = req.body;
    console.log('Request Body:', req.body);
    try {

        const categoryExists = await Category.findOne({ categoryID });
        if (categoryExists) {
            return res.status(400).json({ message: 'Category already exists' });
        }

        const category = await Category.create({ categoryID, name });
        res.status(201).json(category);
    } catch (error) {
        console.log('Error:', error);  // Log the error
        res.status(400).json({ message: error.message });
    }
  };

const updateCategory = async (req, res) => {
    const {id} = req.params;
    const { name } = req.body;
    const category = await Category.findByIdAndUpdate(id, { name }, { new: true });
    res.json(category);
}

const deleteCategory = async (req, res) => {
    const {id} = req.params;
    await Category.findByIdAndDelete(id);
    res.json({ message: 'Category deleted' });
}

const getSubCategory = async (req, res) => {
    try{
        const subCategories = await SubCategory.find();
        res.json(subCategories);
    } catch (error) {   
        res.status(400).json({ message: error.message });
    }
}

// const createSubCategory = async (req, res) => {
//     try {
//         const { subCategoryID, name } = req.body;

//         // idExist = await SubCategory.findOne({
//         //     subCategoryID
//         // });
//         // if (idExist) {
//         //     return res.status(400).json({ message: 'SubCategory already exists' });
//         // }

//         const subCategory = await SubCategory.create({ subCategoryID, name });
//         // const subCategory = new SubCategory({ subCategoryID, name });
//         // await subCategory.save();
//         res.status(201).json(subCategory);
//     }
//     catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// }


// const createSubCategory = async (req, res) => {
//     try {
//         const { subCategoryID, categoryID, name } = req.body;

//         if (!subCategoryID || !categoryID || !name) {
//             return res.status(400).json({ message: 'subCategoryID, categoryID, and name are required' });
//         }

//         // Validate that categoryID is a valid ObjectId
//         if (!mongoose.Types.ObjectId.isValid(categoryID)) {
//             return res.status(400).json({ message: 'Invalid categoryID format' });
//         }

//         const subCategoryExists = await SubCategory.findOne({ subCategoryID });
//         if (subCategoryExists) {
//             return res.status(400).json({ message: 'SubCategory already exists' });
//         }

//         const subCategory = await SubCategory.create({ subCategoryID, categoryID, name });

//         // Optionally, you can also update the Category to include this subCategory
//         const category = await Category.findById(categoryID);
//         if (category) {
//             category.subCategoryID.push(subCategory._id);
//             await category.save();
//         }

//         res.status(201).json(subCategory);
//     } catch (error) {
//         console.log('Error:', error);
//         res.status(400).json({ message: error.message });
//     }
// };

const createSubCategory = async (req, res) => {
    try {
        const { subCategoryID, categoryID, name } = req.body;

        if (!subCategoryID || !categoryID || !name) {
            return res.status(400).json({ message: 'subCategoryID, categoryID, and name are required' });
        }

        const subCategoryExists = await SubCategory.findOne({ subCategoryID });
        if (subCategoryExists) {
            return res.status(400).json({ message: 'SubCategory already exists' });
        }

        const subCategory = await SubCategory.create({ subCategoryID, categoryID, name });

        const category = await Category.findOne({ categoryID });
        if (category) {
            category.subCategoryID.push(subCategory.subCategoryID);
            await category.save();
        }

        res.status(201).json(subCategory);
    } catch (error) {
        console.log('Error:', error);
        res.status(400).json({ message: error.message });
    }
};




const getProducts = async (req, res) => {   
    try{
        const products = await Product.find();
        res.json(products);
    } catch (error) {   
        res.status(400).json({ message: error.message });
    }
}

// const createProduct = async (req, res) => {
//     try {
//         const { categoryID, subCategoryID, productID, name, description, price, countInStock } = req.body;
        
//         productExists = await Product.findOne({
//             productID 
//         });
//         if (productExists) {
//             return res.status(400).json({ message: 'Product already exists' });
//         }

//         const product = await Product.create({ categoryID, subCategoryID, productID, name, description, price, countInStock });
//         res.status(201).json(product);
//     }
//     catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// }

const createProduct = async (req, res) => {
    try {
        const { categoryID, subCategoryID, productID, name, description, price, countInStock } = req.body;

        if (!categoryID || !subCategoryID || !productID || !name || !description || !price || !countInStock) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const productExists = await Product.findOne({ productID });
        if (productExists) {
            return res.status(400).json({ message: 'Product already exists' });
        }

        const product = await Product.create({ categoryID, subCategoryID, productID, name, description, price, countInStock });

        const subCategory = await SubCategory.findOne({ subCategoryID });
        if (subCategory) {
            subCategory.productID.push(product.productID);
            await subCategory.save();
        }

        res.status(201).json(product);
    } catch (error) {
        console.log('Error:', error);
        res.status(400).json({ message: error.message });
    }
};

module.exports = {  getCategory, createCategory, updateCategory,  deleteCategory, getSubCategory, createSubCategory, getProducts, createProduct};