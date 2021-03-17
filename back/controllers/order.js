const {Order, User, Products} = require("../models/Index");
const {OrderProducts} = require('../models/OrderProducts')
const { Op } = require("sequelize");

const ordersController = {
      
    createOrder(req,res,next){
        console.log(req.body)
        User.findByPk(req.body.userID)
            .then(user=>{
               return Order.create()
                     .then((order)=> {
                            order.orderStatusId = 4
                            order.userId = req.body.userID
                            return order.save()
                        })
                     
            })
            .then(order => {
                const carrito = req.body.carrito
                const productsIds = carrito.map(product => product.id)
                return Products.findAll({where: {
                    id: {
                        [Op.in] : productsIds
                    }
                }}).then(products=>{
                    products.forEach((product, index) => order.addProduct(product, {through: { cantidad: carrito[index].cantidad, precio: carrito[index].precio }}))
                })
            })
            .then(()=> res.sendStatus(201))
            .catch(next)
                        
    },

    updateOrder(req,res,next){
        console.log(req.body.carrito)
        Order.findAll({
            where: {
                [Op.and]: [
                    {orderStatusId: 4},
                    {userId: req.body.userID}
                ]
            },
        })
        .then(order => {
            console.log(Object.keys(order[0].__proto__))
            const carrito = req.body.carrito
            const productsIds = carrito.map(product=> product.id)
            Products.findAll({where: {
                id: {
                    [Op.in] : productsIds
                }
            }})
            .then(products=>{
                products.forEach((product, index)=>order[0].addProducts(product, {through: {cantidad: carrito[index].cantidad, precio: carrito[index].precio}})
            )})
            
        })
        .then(()=>res.sendStatus(204))
        .catch(next)
    },

    getPendingOrder(req,res,next){
        console.log("QUERY",req.query)
        console.log("PARAMS",req.params)
            Order.findAll({
                        where: {
                            [Op.and]: [
                                {orderStatusId: 4},
                                {userId: req.params.id}
                            ] 
                        },
                        include: [
                            {
                              model: Products,
                              through: OrderProducts,
                            },
                          ],
                    })
             .then(orders => res.send(orders))
    },

    checkout(req,res,next){
        Order.findAll({
            where: {
                [Op.and]: [
                    {orderStatusId: 4},
                    {userId: req.body.userID}
                ]
                
            },
        })
        .then(orders => {
            orders[0].orderStatusId = 2
            return orders[0].save()
        })
        .then(()=>res.send("Checkout correcto"))
        .catch(next)
    },

    removeOrder(req,res,next){
        Order.findAll({
            where: {
                [Op.and]: [
                    {orderStatusId: 4},
                    {userId: req.params.id}
                ]
            },
        })
        .then(orders=>orders[0].destroy())
        .then(()=>res.send("orden borrada"))
        .catch(next)
    },

    getPastOrders(req,res,next){
        Order.findAll({
            where: {
                [Op.and]: [
                    {orderStatusId: 2},
                    {userId: req.body.userID}
                ]
            },
            include: [
                {
                  model: Products,
                  through: OrderProducts,
                },
              ]
        })
        .then(orders=>res.send(orders))
    }

}

module.exports = ordersController