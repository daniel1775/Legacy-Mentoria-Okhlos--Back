import db from "../db/db.js";

import { DataTypes } from "sequelize";

const ProgramsModel = db.define('programs', {
    name: { type: DataTypes.STRING }
})

export default ProgramsModel;