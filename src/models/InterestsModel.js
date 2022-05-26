import db from "../db/db.js";

import { DataTypes } from "sequelize";

const InterestsModel = db.define('Interest', {
    name: { type: DataTypes.STRING }
})

export default InterestsModel;