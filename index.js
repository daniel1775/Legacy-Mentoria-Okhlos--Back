import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './src/db/db.js';
import apiRoutes from './src/routes/routes.js';

dotenv.config()
const app = express();
app.use(cors());
app.use(express.json());
app.use(apiRoutes);

const PORT = process.env.PORT || 8001

try {
    await db.authenticate();
    console.log("Connected to database");
} catch (error) {
    console.log(`Database failed on:${error}`);
}

app.get('/', (req, res)=>{
    res.send('Connect')
})

app.listen(PORT, ()=>{
<<<<<<< HEAD
    console.log('Server started on http://localhost:8000')
=======
    console.log('Server started on port 8001')
>>>>>>> ecdc66332baf42a6d4b476b8e539201225974e13
})