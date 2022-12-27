import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});

export const Team = sequelize.define('team', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    noStudents: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    leaderId: {
        type: DataTypes.NUMBER,
        allowNull: true
    }
},
    {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    }
);