const express = require('express');
const router = express.Router();
const {
    getAllOrder,
    postOrder,
    putOrder,
    deleteOrder,
    getOneOrder
} = require('../controllers/orderController');


// GET all customer
router.get('/',getAllOrder);

// GET one customer
router.get('/:id', getOneOrder);

// POST a new customer
router.post('/', postOrder);

// PUT -> edit a customer
router.put('/:id', putOrder);

// DELETE a customer
router.delete('/:id', deleteOrder);



module.exports = router;