import db from "../db/db.js";

import { DataTypes } from "sequelize";

const SessionsModel = db.define('sessions', {
    title: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    start_date: { type: DataTypes.DATE },
    end_date: { type: DataTypes.DATE },
    link_meet: { type: DataTypes.STRING },
    status: { type: DataTypes.BOOLEAN },
})

export default SessionsModel;