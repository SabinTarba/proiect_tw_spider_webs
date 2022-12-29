import { Sequelize, DataTypes } from 'sequelize';


const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});

export const Jury = sequelize.define('jury', {
    studentId: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    teamId: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    grade: {
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