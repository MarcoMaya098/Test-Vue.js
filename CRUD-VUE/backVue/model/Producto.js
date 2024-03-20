const { DataTypes } = require('sequelize');
const sequelize = require('../data/database');

const Producto = sequelize.define('Productos', {
    idProducto: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombreProducto : { type: DataTypes.STRING, allowNull: false },
    precio : { type: DataTypes.DECIMAL, allowNull: false},
    stock : { type: DataTypes.INTEGER, allowNull: false},
    idMarca : { type: DataTypes.INTEGER, allowNull: false}

    },
    {
        timestamps: false
    }
);

module.exports = Producto;