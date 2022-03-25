import db from "../db/db.js";

import { DataTypes } from "sequelize";

const MentorModel = db.define('mentors', {
    name: { type: DataTypes.STRING },
    last_name: { type: DataTypes.STRING },
    birth_date: { type: DataTypes.DATE },
    sons: { type: DataTypes.INTEGER },
    num_students: { type: DataTypes.INTEGER },
    phone: { type: DataTypes.INTEGER },
    active: { type: DataTypes.INTEGER },
    gender: { type: DataTypes.INTEGER }
})

export default MentorModel;