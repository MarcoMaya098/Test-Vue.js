const { DataTypes } = require('sequelize');
const sequelize = require('../data/database');

const Categoria = sequelize.define('Categoria', {
    idCategoria: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    categoria: { 
        type: DataTypes.STRING, 
        allowNull: false 
    }
}, {
    timestamps: false,
    tableName: 'Categorias'
});

module.exports = Categoria;
