const { json } = require('body-parser');
const prisma = require('../../prisma/index');

const {faker} = require('@faker-js/faker');


// GET all Customer
const getAllCustomer = async (req, res, next) => {
    try{
        const customers = await prisma.customer.findMany();
        res.status(200).json(customers);
    }catch(error){
        res.status(404).json({error: error.message});
    }

    next();
};

// Find One Customer
const getOneCustomer = async (req, res, next) => {
    const {id} = req.params;

    try{
        const customer = await prisma.customer.findUnique({
            where:{
                id:parseInt(id)
            }
        })
        res.status(200).json(customer);
    }catch(error){
        res.status(400).json({error: error.message});
    }
    next();
};

// POST a new Customer
const postCustomer =  async (req, res, next) => {
    try{
        // Input
        // const {customer_name, email, city} = req.body
        // if (!customer_name || !email || !city) {
        //     throw new Error('All fields required');
        // }


        const customer_name = faker.person.fullName();
        const email = faker.internet.email();
        const city = faker.location.city();

        const user = await prisma.customer.create({
            data:{
                customer_name,
                email,
                city
            }
        })
        res.status(201).json({
            message:"User created succesfully",
            data:(user)
        });
    }catch(error){
        res.status(400).json({error: error.message});
    }
    next();
};

// PUT - Edit a customer
const putCustomer = async (req, res, next) => {
    const {id} = req.params;

    try{
        const updateCustomer = await prisma.customer.update({
            where:{
                id: parseInt(id),
            },
            data:(req.body)
            
        })
        res.status(200).json(updateCustomer)
    }catch(error){
        res.status(400).json({error: error.message});
    }

    
    next();
};

// DELETE a customer
const deleteCustomer = async (req, res, next) => {
    const {id} = req.params;

    try{
        const deleteUser = await prisma.customer.delete({
            where:{
                id: parseInt(id)
            }
        })
        res.status(200).json({
            message:"User deleted succesfully",
            data:(deleteUser)
        });
    }catch(error){
        res.status(400).json({error: error.message});
    }

    next();
};

module.exports = {
    getAllCustomer,
    postCustomer,
    putCustomer,
    deleteCustomer,
    getOneCustomer
}