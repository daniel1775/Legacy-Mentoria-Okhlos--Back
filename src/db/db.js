import { Sequelize } from "sequelize";



<<<<<<< HEAD
// const db = new Sequelize(process.env.DB_DATABASE || 'heroku_e691640e5c518b5', process.env.DB_USER || 'b1403ff4a9ad39', process.env.DB_PASSWORD || 'a031feee',{
//     host: process.env.DB_HOST || 'us-cdbr-east-05.cleardb.net',
//     dialect: 'mysql',
=======
/* const db = new Sequelize(process.env.DB_DATABASE || 'heroku_e691640e5c518b5', process.env.DB_USER || 'b1403ff4a9ad39', process.env.DB_PASSWORD || 'a031feee',{
    host: process.env.DB_HOST || 'us-cdbr-east-05.cleardb.net',
    dialect: 'mysql', */
    const db = new Sequelize(process.env.DB_DATABASE || 'okhlos', process.env.DB_USER || 'root', process.env.DB_PASSWORD || '',{
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql',
>>>>>>> 6e29ab7d87fcc9a27ab8d0856c497ab860236f8c

// })

const db = new Sequelize(process.env.DB_DATABASE || 'Okhlos', process.env.DB_USER || 'root', process.env.DB_PASSWORD || '',{
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql'
})

export default db