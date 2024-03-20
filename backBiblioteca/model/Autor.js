const { DataTypes } = require('sequelize');
const sequelize = require('../data/database');

const Autor = sequelize.define('Autor', {
    idAutor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    nacionalidad: {
        type: DataTypes.STRING(100)
    },
    correoElectronico: {
        type: DataTypes.STRING(100)
    }
}, {
    timestamps: false,
    tableName: 'Autores'
});

module.exports = Autor;
