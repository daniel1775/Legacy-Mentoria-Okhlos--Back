import { Sequelize } from "sequelize";

const db = new Sequelize(process.env.DB_DATABASE || 'mentoringapp', process.env.DB_USER || 'root', process.env.DB_PASSWORD || '123456',{
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql'
})

export default db