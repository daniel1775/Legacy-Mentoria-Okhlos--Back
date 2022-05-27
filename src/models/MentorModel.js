import db from "../db/db.js";

import { DataTypes } from "sequelize";

const MentorModel = db.define('mentors', {
name: { type: DataTypes.STRING },
email: { type: DataTypes.STRING },
age: { type: DataTypes.INTEGER },
sons: { type: DataTypes.INTEGER },
num_estudiantes: { type: DataTypes.INTEGER },
phone: { type: DataTypes.INTEGER },
status: { type: DataTypes.BOOLEAN },
gender: { type: DataTypes.STRING }
})

export default MentorModel; 