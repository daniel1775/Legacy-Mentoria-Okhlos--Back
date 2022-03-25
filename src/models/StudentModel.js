import db from "../db/db.js";

import { DataTypes } from "sequelize";

const StudentModel = db.define('students', {
    name: { type: DataTypes.STRING },
    last_name: { type: DataTypes.STRING },
    birth_date: { type: DataTypes.DATE },
    cohort: { type: DataTypes.INTEGER },
    phone: { type: DataTypes.INTEGER },
    active: { type: DataTypes.INTEGER },
    gender: { type: DataTypes.INTEGER }
})

export default StudentModel;