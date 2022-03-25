import { Sequelize } from "sequelize";

const db = new Sequelize('mentoringapp', 'root', '',{
    host:'localhost',
    dialect: 'mysql'
})

export default db