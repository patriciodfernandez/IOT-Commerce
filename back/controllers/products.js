const {Products, Reviews} = require("../models/Index");
const { Op } =require ('sequelize');

const productsController = {
  getAll(req, res, next) {
        Products.findAll()
        .then(products => res.send(products))
        .catch(err=> next(err)) // Se usaba asi el error MW?
  
  },
  getOne(req, res, next) {
    Products.findByPk(req.params.id)
      .then(product => res.send(product))
      .catch(err=> next(err))
    
  },

  addReview(req, res, next) { 
    Reviews.create({
        /*Llenar con
        campo de review: req.body.datoparacampo */
        productId: req.params.id //Ver con que nombre se creo el id del producto
    })
      .then(review => Products.findByPk(req.params.id).then(product=> res.send(product)))
      .catch(err=> next(err))
  },

  addOne(req, res, next) { 
  
    Products.create(req.body)
    
      .then(product => res.send(product))
      .catch(err=> console.log(err))
  },

  changeOne(req, res, next) {
     Products.findByPk(req.params.id)
     .then(product => product.update(req.body)
            .then(product => Products.findAll().then(products => res.send(products))))
     .catch(err=> next(err))
  },
  deleteOne(req, res,next) {
    Products.findByPk(req.params.id)
     .then(product => product.destroy()
            .then(product => Products.findAll().then(products => res.send(products))))
     .catch(err=> next(err))
  },
  getProductsByKeyword(req,res,next){
    const baseQuery = req.query.name;
   
    Products.findAll({
      where :{
        name:{[Op.iLike]: `%${baseQuery}%` }
      }
    }).then(productsByKeyword => res.send(productsByKeyword))
    .catch(err => next(err))
  }
};

module.exports = productsController;

