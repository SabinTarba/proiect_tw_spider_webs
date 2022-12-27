import { Sequelize, DataTypes } from 'sequelize';


const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});

export const Project = sequelize.define('project', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    noTasks: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    grade: {
        type: DataTypes.NUMBER,
        allowNull: true
    },
},
    {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    }
);