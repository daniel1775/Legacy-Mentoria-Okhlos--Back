import db from "../db/db.js";

import { DataTypes } from "sequelize";

const StudiesModel = db.define('studies', {
    title: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
})

export default StudiesModel;