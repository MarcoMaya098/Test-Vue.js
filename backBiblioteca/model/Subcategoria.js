const { DataTypes } = require('sequelize');
const sequelize = require('../data/database');
const Categoria = require('./Categoria'); 

const Subcategoria = sequelize.define('Subcategoria', {
    idSubcategoria: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    subcategoria: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    idCategoria: { 
        type: DataTypes.INTEGER, 
        allowNull: false,
        references: {
            model: Categoria,
            key: 'idCategoria'
        }
    }
}, {
    timestamps: false,
    tableName: 'Subcategorias'
});

module.exports = Subcategoria;
