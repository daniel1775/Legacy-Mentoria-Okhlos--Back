import express from "express";
import cors from 'cors';

import db from "./src/db/db.js";
import apiRoutes from "./src/routes/routes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(apiRoutes);

try {
    await db.authenticate();
    console.log("Connected to database");
} catch (error) {
    console.log(`Database failed on:${error}`);
}

app.get('/', (req, res)=>{
    res.send('Connect')
})

app.listen(3001, () => {
    console.log('Server started on port 3001')
})