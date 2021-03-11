const Categories = require("./Categories");
const Orders = require("./Orders");
const OrderStatus = require("./OrderStatus");
const Products = require("./Products");
const Reviews = require("./Reviews");
const User = require("./Users");

const db = require("../db/index");


// ACA, EN EL INDEX, IMPORTAMOS TODOS LOS MODELOS Y HACEMOS LAS RELACIONES
// EXPORTAMOS TODOS LOS MODELOS, ESTE INDEX, ES EL UNICO PUNTO DE CONTACTO CON EL EXTERIOR
// EN LO QUE HACE A MODELOS DE DATOS Y SUS RELACIONES

// RECORDAR QUE LAS RELACIONES AGREGAN METODOS

User.hasMany(Orders);

User.hasMany(Reviews);

Reviews.belongsTo(Products);
Reviews.belongsTo(User)

Orders.belongsToMany(Products, {through: "oders_products"});
Products.belongsToMany(Orders,{through: "oders_products"});

Categories.belongsToMany(Products, {through: "products_categories"});
Products.belongsToMany(Categories,{through: "products_categories"});

module.exports = { db, Categories, Orders, OrderStatus, Products, Reviews, User };