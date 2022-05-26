import db from "../db/db.js";

import { DataTypes } from "sequelize";

const StudentModel = db.define('estudiantes', {
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    cohort: { type: DataTypes.INTEGER },
    age: { type: DataTypes.INTEGER },
    phone: { type: DataTypes.INTEGER },
    status: { type: DataTypes.BOOLEAN },
    gender: { type: DataTypes.STRING }
})

export default StudentModel;