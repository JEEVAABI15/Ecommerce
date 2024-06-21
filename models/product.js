const mongoose = require('mongoose');

// Category Schema
const categorySchema = new mongoose.Schema({
    name: 
    {
        type: String,
        required: true
    },
    description:
    {
        type: String,
        required: true
    },
    subCategoryID: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory'
    }]
});

// SubCategory Schema
const subCategorySchema = new mongoose.Schema({
    // categoryID: 
    // {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Category',
    //     required: true 
    // },
    name: 
    {
        type: String,
        required: true
    },
    productID: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]   
});

// Product Schema
const productSchema = new mongoose.Schema({

    // subCategoryID: 
    // {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'SubCategory',
    //     required: true
    // },
    name: 
    {
        type: String,
        required: true
    },
    description: 
    {
        type: String,
        required: true
    },
    price: 
    {
        type: Number,
        required: true
    },
    countInStock: 
    {
        type: Number,
        required: true
    }
});

const Category = mongoose.model('Category', categorySchema);
const SubCategory = mongoose.model('SubCategory', subCategorySchema);
const Product = mongoose.model('Product', productSchema);

module.exports = { Category, SubCategory, Product };
