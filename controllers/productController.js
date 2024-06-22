const { Category, SubCategory, Product } = require('../models/product');


const getCategory = async (req, res) => {
    try {
        const categories = await Category.find().populate('subCategoryID');
        
        const categoriesWithSubCategoryCount = categories.map(category => ({
            _id: category._id,
            name: category.name,
            description: category.description,
            subCategoryCount: category.subCategoryID.length
        }));

        res.status(200).json(categoriesWithSubCategoryCount);
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

const updateCategory = async (req, res) => {
    const { categoryID } = req.params;
    const { name, description } = req.body;
    try {
        const category = await Category.findByIdAndUpdate(categoryID, { name, description }, { new: true });
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const deleteCategory = async (req, res) => {
    const { categoryID } = req.params;
    try {
        const category = await Category.findByIdAndDelete(categoryID);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getAllSubCategory = async (req, res) => {
    try {
        const subCategories = await SubCategory.find();
        res.status(200).json(subCategories);
    } catch (error) {
        console.log('Error:', error);
        res.status(400).json({ message: error.message });
    }
}

const getSubCategory = async (req, res) => {
    const { categoryID } = req.params;
    try {
        const category = await Category.findById(categoryID).populate('subCategoryID');
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        const subCategoriesWithProductCount = await Promise.all(
            category.subCategoryID.map(async (subCategory) => {
                const productCount = await Product.countDocuments({ _id: { $in: subCategory.productID } });
                return {
                    _id: subCategory._id,
                    name: subCategory.name,
                    productCount: productCount
                };
            })
        );
        // console.log('subCategoriesWithProductCount:', subCategoriesWithProductCount);

        res.status(200).json({subCategoriesWithProductCount});
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

const updateSubCategory = async (req, res) => {
    const { subCategoryID } = req.params;
    const { name } = req.body;
    try {
        const subCategory = await SubCategory.findByIdAndUpdate(subCategoryID, { name }, { new: true });
        if (!subCategory) {
            return res.status(404).json({ message: 'SubCategory not found' });
        }
        res.status(200).json(subCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const deleteSubCategory = async (req, res) => {
    const { subCategoryID } = req.params;
    try {
        const subCategory = await SubCategory.findByIdAndDelete(subCategoryID);
        if (!subCategory) {
            return res.status(404).json({ message: 'SubCategory not found' });
        }
        res.status(200).json({ message: 'SubCategory deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.log('Error:', error);
        res.status(400).json({ message: error.message });
    }
}

const getProducts = async (req, res) => {  
    const { subCategoryID } = req.params;
    try {
        const subCategory = await SubCategory.findById(subCategoryID).populate('productID');
        if (!subCategory) {
            return res.status(404).json({ message: 'SubCategory not found' });
        }
        res.status(200).json(subCategory.productID);
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

const updateProduct = async (req, res) => {
    const { productID } = req.params;
    const { name, description, price, countInStock } = req.body;
    try {
        const product = await Product.findByIdAndUpdate(productID, { name, description, price, countInStock }, { new: true });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const deleteProduct = async (req, res) => {
    const { productID } = req.params;
    try {
        const product = await Product.findByIdAndDelete(productID);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {  getCategory, createCategory, updateCategory, deleteCategory, 
                    getAllSubCategory, getSubCategory, createSubCategory, updateSubCategory, deleteSubCategory,
                    getAllProducts, getProducts, createProduct, updateProduct, deleteProduct
                };
