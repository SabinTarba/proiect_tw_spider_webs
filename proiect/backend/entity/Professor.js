import { Sequelize, DataTypes } from 'sequelize';
import { Student } from './Student.js';
import { Team } from './Team.js';


const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});


export const Professor = sequelize.define('professor', {
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
},
    {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    }
);


Professor.hasMany(Student);
Student.belongsTo(Professor);

Team.hasMany(Student);
Student.belongsTo(Team);

Professor.hasMany(Team);
Team.belongsTo(Professor);

Professor.sync();
Student.sync();
Team.sync();
