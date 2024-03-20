const { DataTypes } = require('sequelize');
const sequelize = require('../data/database');
const Categoria = require('./Categoria'); // Importar el modelo de Categorias si es necesario

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
            model: Categoria, // Modelo de la tabla Categorias
            key: 'idCategoria'
        }
    }
}, {
    timestamps: false,
    tableName: 'Subcategorias' // Nombre de la tabla en la base de datos
});

module.exports = Subcategoria;
