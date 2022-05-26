import db from "../db/db.js";

import { DataTypes } from "sequelize";

const UsersModel = db.define('users', {
    email: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING }
})

export default UsersModel;