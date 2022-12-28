import { Sequelize, DataTypes } from 'sequelize';


const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});

export const Task = sequelize.define('task', {
    comment: {
        type: DataTypes.STRING,
        allowNull: true
    },
    taskNumber: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    link: {
        type: DataTypes.STRING,
        allowNull: true
    },
    linkType: {
        type: DataTypes.STRING,
        allowNull: true
    },
    dueDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    dueDateAlreadyUpdated: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
},
    {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    }
);