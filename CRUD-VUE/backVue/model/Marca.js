const { DataTypes } = require('sequelize');
const sequelize = require('../data/database');

const Marca = sequelize.define('Marcas', {
    idMarca: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    marca : { type: DataTypes.STRING, allowNull: false },
    idCategoria : { type: DataTypes.INTEGER, allowNull: false}

    },
    {
        timestamps: false
    }
);

module.exports = Marca;