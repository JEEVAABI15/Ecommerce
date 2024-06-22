const express = require('express');
const router = express.Router();
const { protect, admin} = require('../middleware/auth');
const { createOrder,
        getOrders,
        } = require('../controllers/orderController');

router.route('/').post(protect, createOrder);
router.route('/allOrders').get( protect, admin, getOrders);

module.exports = router;
