const { DataTypes } = require('sequelize');
const sequelize = require('../data/database');
const Autor = require('./Autor'); 
const Titulo = require('./Titulo'); 

const TituloAutor = sequelize.define('TituloAutor', {
    idAutor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Autor, // Modelo de la tabla Autores
            key: 'idAutor'
        }
    },
    idTitulo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Titulo, // Modelo de la tabla Titulos
            key: 'idTitulo'
        }
    }
}, {
    timestamps: false,
    tableName: 'TitulosAutores', // Nombre de la tabla en la base de datos
    primaryKey: true // Definir la clave primaria compuesta por idAutor e idTitulo
});

module.exports = TituloAutor;
