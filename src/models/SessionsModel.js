import db from "../db/db.js";

import { DataTypes } from "sequelize";

const SessionsModel = db.define('name_table', {
    example: { type: DataTypes.STRING }
})

export default SessionsModel;