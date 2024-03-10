const prisma = require('../../prisma/index');
const { json } = require('body-parser');
const {faker} = require('@faker-js/faker');
const { connect } = require('../routes/customer');


// GET all Order
const getAllOrder = async (req, res, next) => {
    try{
        const orders = await prisma.order.findMany({
            
            include: {
                customer:{
                    select:{customer_name:true}
                },
                
            },
        });
        var sum_total = 0;
        orders.map((total) => sum_total += total.total_amount)
        
        
        res.status(200).json({sum_total, data:(orders)});
    }catch(error){
        res.status(404).json({error: error.message});
    }
    next();
};

// GET One Order
const getOneOrder = async(req, res, next) => {
    const {id} = req.params;

    try{
        const oneOrder = await prisma.order.findUnique({
            where:{
                id:parseInt(id)
            },
            include:{
                customer:{
                    select:{customer_name:true}
                }
            }
        })
        res.status(200).json(oneOrder);
    }catch(error){
        res.status(400).json({error: error.message});
    }
    next();};

// POST a new Order
const postOrder = async (req, res, next) => {
    const {customer_id} = req.body;

    const order_name = faker.vehicle.vehicle();
    const total_amount = faker.number.int({min:1,max:5});


    try{
        const order = await prisma.order.create({
            data:{
                order_name,
                total_amount,
                customer:{
                    connect:{id:customer_id}
                }
            }
        })
        res.status(201).json(order);
    }catch(error){
        res.status(400).json({error: error.message});
    }

    next();
};

// PUT - Edit a order
const putOrder = async (req, res, next) => {
    const {id} = req.params;

    try{

        const updateOrder = await prisma.order.update({
            where:{
                id: parseInt(id),
            },
            data:(req.body)
            
        })
        res.status(200).json(updateOrder)

    }catch(error){
        res.status(400).json({error: error.message});
    }

    res.json({
        customer_id:id,
        data:(
            req.body
        )
    });
    next();
};

// DELETE a order
const deleteOrder = async (req, res, next) => {
    const {id} = req.params;

    try{
        const orderDelete = await prisma.order.delete({
            where:{
                id: parseInt(id)
            }
        })
        res.status(200).json({
            message:"Order deleted succesfully",
            data:(orderDelete)
        });
    }catch(error){
        res.status(400).json({error: error.message});
    }
    next();
};




module.exports = {
    getAllOrder,
    postOrder,
    putOrder,
    deleteOrder,
    getOneOrder
}