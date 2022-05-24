import db from "../db/db.js";

import { DataTypes } from "sequelize";

const CargoModel = db.define('Cargo', {
    name: { type: DataTypes.STRING }
})

export default CargoModel;