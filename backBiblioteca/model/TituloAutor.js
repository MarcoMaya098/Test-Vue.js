const { DataTypes } = require('sequelize');
const sequelize = require('../data/database');
const Autor = require('./Autor'); 
const Titulo = require('./Titulo'); 

const TituloAutor = sequelize.define('TituloAutor', {
    idAutor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Autor, 
            key: 'idAutor'
        }
    },
    idTitulo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Titulo,
            key: 'idTitulo'
        }
    }
}, {
    timestamps: false,
    tableName: 'TitulosAutores', 
    primaryKey: true 
});

module.exports = TituloAutor;
