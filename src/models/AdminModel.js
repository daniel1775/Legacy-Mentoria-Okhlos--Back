import db from "../db/db.js";

import { DataTypes } from "sequelize";

const AdminModel = db.define('Admin', {
    name: { type: DataTypes.STRING },
    status: {type: DataTypes.BOOLEAN }
})

export default AdminModel;