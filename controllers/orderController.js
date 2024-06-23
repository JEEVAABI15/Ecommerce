const Order = require('../models/order');
const { Product } = require('../models/product');

const createOrder = async (req, res) => {
    const { productID } = req.query; // Extract productID from query parameters
    console.log('productID',productID)

    try {
        // Checking if the user has already ordered this particular product
        const existingOrder = await Order.findOne({ user: req.user._id, 'products.product': productID });
        if (existingOrder) {
            return res.status(400).json({ message: 'You have already ordered this product.' });
        }

        // Find the product and check stock
        const product = await Product.findById(productID);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        if (product.countInStock <= 0) {
            return res.status(400).json({ message: 'Product out of stock' });
        }

        // Create a new order
        const order = new Order({
            user: req.user._id,
            products: [{ product: productID, quantity: 1 }]
        });

        // Save the order
        await order.save();

        // Decrease the product stock count
        product.countInStock -= 1;
        await product.save();

        res.status(201).json(order);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getOrders = async (req, res) => {
    try {
        // Find all orders and populate user and product details
        const orders = await Order.find().populate({
            path: 'user',
            select: 'username email',
        }).populate({
            path: 'products.product',
            select: 'name price',
        }).sort({ orderDate: -1 }); // Sort by order date, newest first

        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Server error' });
    }
};



module.exports = {
    createOrder,
    getOrders
};
