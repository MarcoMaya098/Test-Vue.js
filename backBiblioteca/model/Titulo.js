const { DataTypes } = require('sequelize');
const sequelize = require('../data/database');
const Subcategoria = require('./Subcategoria'); // Importar el modelo de Subcategorias si es necesario

const Titulo = sequelize.define('Titulo', {
    idTitulo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    editorial: {
        type: DataTypes.STRING(100)
    },
    isbn: {
        type: DataTypes.STRING(100)
    },
    fechaPublicacion: {
        type: DataTypes.DATE
    },
    noEjemplares: {
        type: DataTypes.INTEGER
    },
    idSubcategoria: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Subcategoria, // Modelo de la tabla Subcategorias
            key: 'idSubcategoria'
        }
    }
}, {
    timestamps: false,
    tableName: 'Titulos'
});

module.exports = Titulo;
