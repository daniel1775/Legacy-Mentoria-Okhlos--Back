import db from "../db/db.js";

import { DataTypes } from "sequelize";

const BusinessModel = db.define('Businesses', {
    name: { type: DataTypes.STRING }
})

export default BusinessModel;