import { Sequelize } from "sequelize";

const db = new Sequelize('database_name', 'root', '',{
    host:'localhost',
    dialect: 'mysql'
})

export default db