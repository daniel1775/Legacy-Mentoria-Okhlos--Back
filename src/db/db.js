import { Sequelize } from "sequelize";



// const db = new Sequelize(process.env.DB_DATABASE || 'heroku_e691640e5c518b5', process.env.DB_USER || 'b1403ff4a9ad39', process.env.DB_PASSWORD || 'a031feee',{
//     host: process.env.DB_HOST || 'us-cdbr-east-05.cleardb.net',
//     dialect: 'mysql',

// })

const db = new Sequelize(process.env.DB_DATABASE || 'l5ppphiy12vci4m3', process.env.DB_USER || 'ovfdg77mq8lsi2mt', process.env.DB_PASSWORD || 'cb0mj6qzt0exkw0y',{
    host: process.env.DB_HOST || 'ebh2y8tqym512wqs.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    dialect: 'mysql'
})

export default db