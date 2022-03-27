import db from "../db/db.js"

export const checkLogin = async (req, res) => {
	try {
    const email = req.params.email;
    const password = req.params.password;
    const [ result, metadata ] = await db.query(`SELECT role FROM users
      WHERE email='${email}' and password='${password}'`);
		res.json(result);
	} catch (error) {
		res.json({ message: error.message });
	}
};
