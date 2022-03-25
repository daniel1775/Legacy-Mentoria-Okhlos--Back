import db from "../db/db.js";

import { DataTypes } from "sequelize";

const AdminModel = db.define('administrators', {
    name: { type: DataTypes.STRING },
    rol: { type: DataTypes.INTEGER }
})

export default AdminModel;