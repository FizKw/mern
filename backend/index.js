const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const customerRoutes = require('./src/routes/customer');
const orderRoutes = require('./src/routes/order');

app.use(bodyparser.json());

// CORS 
// app.use((req,res,next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// })

app.use('/customers', customerRoutes);

app.use('/orders', orderRoutes);

app.listen(4000, ()=>{
    console.log('test');
})