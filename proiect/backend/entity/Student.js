import { Sequelize, Model, DataTypes } from 'sequelize';
import { Professor } from './Professor.js';


const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});

export const Student = sequelize.define('student', {
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },

    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }

    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

    class: {
        type: DataTypes.CHAR,
        allowNull: false
    },

    series: {
        type: DataTypes.STRING,
        allowNull: false
    },
    firstLogin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
},
    {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    }
);

