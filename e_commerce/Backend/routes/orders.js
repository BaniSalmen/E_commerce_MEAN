const {Order} = require('../models/order');
const {User} = require('../models/user');
const {Product} = require('../models/product');
const express = require('express');
const { OrderItem } = require('../models/order_Item');
const router = express.Router();
const multer = require('multer');

//afficher tout les orders
router.get(`/`, async (req, res) => {
  const orderList = await Order.find()
    .populate("user", "name")
    .sort({ dateOrdered: -1 });

  if (!orderList) {
    res.status(500).json({ success: false });
  }
  res.send(orderList);
});

//afficher un order by id (recherche)
router.get(`/:id`, async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("user", "name")
    .populate({
      path: "orderItems",
      populate: {
        path: "product",
        populate: "category",
      },
    });

  if (!order) {
    res.status(500).json({ success: false });
  }
  res.send(order);
});

// Ajouter Order et calculer la sommme des prix de produit
router.post('/',async(req,res)=>{
    const orderItemsIds = Promise.all( req.body.orderItems.map(async orderItem =>{

        let newOrderItem = new OrderItem({
            quantity : orderItem.quantity ,
            product : orderItem.product
        })     
  
      newOrderItem = await newOrderItem.save();

      return newOrderItem._id;    
    }))
     
    const orderItemsIdsResolved = await orderItemsIds; 
 
    const totalPrices = await Promise.all(orderItemsIdsResolved.map(async (orderItemsId) =>{
        const orderItem = await OrderItem.findById(orderItemsId).populate('product','price');
        const  totalPrice = orderItem.product.price * orderItem.quantity;
        return totalPrice 
    })) 

    const totalPrice = totalPrices.reduce((acc, curr) => acc + curr, 0); // calculate the sum of all prices

    console.log(totalPrices);
 

    let order = new Order({
        orderItems : orderItemsIdsResolved, 
        ShippingAddress1:req.body.ShippingAddress1,
        ShippingAddress2:req.body.ShippingAddress2,
        city:req.body.city,  
        zip:req.body.zip,  
        country:req.body.country, 
        phone:req.body.phone,  
        status:req.body.status, 
        totalPrice: totalPrice,
        User : req.body.User,    
    })    
    order = await order.save();  
     
    if(!order)  
    return res.status(404).send('the order cannot be created')

    res.send(order);
})

const stripe = require('stripe')('sk_test_51N6ebULVbJpIoXMkDDxwScjRxrlbzzpwXbpAk75jxKCBMhN1q7sN12t3uLM6aiMTDwqTNUBNtC7dUyBqurDVAvnB00feWhfMc8');

router.post('/create-checkout-session', async (req, res) => {
    const orderItems = req.body;

    if (!orderItems) {
        return res.status(400).send('Checkout session cannot be created - check the order items');
    } 
 
    const lineItems = await Promise.all(orderItems.map(async (orderItem) => {
        const product = await Product.findById(orderItem.product);
        return {
            price_data: {
                currency: 'usd',
                product_data: {
                    name: product?.name
                }, 
                unit_amount: product?.price * 100
            },
            quantity: orderItem.quantity
        };
    })); 

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: 'http://localhost:4200/success',
            cancel_url: 'http://localhost:4200/error',
        });
        res.json({ id: session.id });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating the Checkout session');
    }
});




//sum des ventes
router.get('/get/totalsales' ,async (req,res)=>{
    const totalsales = await Order.aggregate([
        {$group :{ _id: null , totalsales: { $sum :'$totalPrice'}}}
    ])

    if(!totalsales){
        return res.status(400).send('the order sales cannot be generated')
    }
    res.send({totalsales : totalsales.pop().totalsales})
})

// afficher nombre des orders
router.get(`/get/count`, async (req, res) =>{ 
    const orderCount= await Order.countDocuments((req.count) = req.count)

    if(!orderCount) {
        res.status(500).json({success: false})
    }   
    res.send({ orderCount : orderCount})
})

//afficher les orders de user by userid
/*router.get('/get/userorders/:userid', async (req, res) =>{
    const userOrderList = await Order.findById({user :req.params.userid})
    .populate({ path: 'orderItems', populate: {path : 'product', populate: 'category'} })
    .sort({'dateOrdered': -1});

    if(!userOrderList) {
        res.status(500).json({success: false}); 
    } 
    res.send(userOrderList);
})*/

// Define the route to get the user orders
router.get('/get/userorders/:userid', async (req, res) => {
    try {
      const userOrders = await Order.find({ user: req.params.userid })
        .populate('user', 'name','email') // Optional: Populate the user data
        .populate('orderItems.product', 'name price'); // Optional: Populate the order item data
  
      if (!userOrders) {
        return res.status(404).json({ message: 'No orders found for this user.' });
      }
  
      res.status(200).json(userOrders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error.' });
    }
  });

  
 
// Update order 
router.put('/:id',async(req,res)=>{
    let order = await Order.findByIdAndUpdate(req.params.id ,
    {
        status : req.body.status
    },
    {new : true }
    ) 

    if(!order)
    return res.status(400).send('the order cannot be updated')

    res.send(order);
})


//Supprimer order  api/v1/'id'
router.delete('/:id',async(req,res)=>{
    Order.findByIdAndRemove(req.params.id).then(async order =>{
        if(order){
            await order.orderItems.map(async orderItem => {
                await OrderItem.findByIdAndRemove(orderItem)
            })
            return res.status(200).json({success : true , message : 'the order is deleted! '});

        }else {
            return res.status(404).json({success : false ,message : 'order not found !'})
        }
    }).catch(err=>{
        return res.status(400).json({success: false ,error : err})
    })
})



module.exports =router; 