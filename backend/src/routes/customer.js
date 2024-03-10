const express = require('express');
const router = express.Router();
const {
    getAllCustomer,
    postCustomer,
    putCustomer,
    deleteCustomer,
    getOneCustomer
} = require('../controllers/customerController');


// GET all customer
router.get('/',getAllCustomer);

// GET one customer
router.get('/:id', getOneCustomer);

// POST a new customer
router.post('/', postCustomer);

// PUT -> edit a customer
router.put('/:id', putCustomer);

// DELETE a customer
router.delete('/:id', deleteCustomer);



module.exports = router;