import db from "../db/db.js";

import { DataTypes } from "sequelize";

const ActualRoleModel = db.define('actual_roles', {
    name: { type: DataTypes.STRING }
})

export default ActualRoleModel;