import db from '../db/db.js';

export const getUserStudent = async (req,res) => {
    try {
        const result = await db.query(`SELECT Estudiantes.id, users.email, Estudiantes.name, Estudiantes.cohort, Estudiantes.age, Estudiantes.phone, Estudiantes.status, Estudiantes.gender, programs.name as programa FROM Estudiantes, users, programs WHERE Estudiantes.id_user = users.id and Estudiantes.id_program = programs.id ORDER BY Estudiantes.name;`)
        res.json(result[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const createUserStudent = async (req,res) => {
    try {
        await db.query(`INSERT INTO users (email,password,role) VALUES ('${req.body.email}','test123','test');`)

        await db.query(`INSERT INTO Estudiantes (name,email,cohort,age,phone,status,gender, id_program,id_user) VALUES ('${req.body.name}','${req.body.email}',${req.body.cohort},${req.body.age},${req.body.phone},${req.body.status},'${req.body.gender}',(SELECT programs.id FROM programs WHERE programs.name = '${req.body.programa}'),(SELECT users.id FROM users WHERE users.email = '${req.body.email}'));`)

		res.json({
			message: '¡Registro creado correctamente!',
		});
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const deleteAllUserStudent = async(req,res) => {
    try {
        await db.query(`DELETE FROM users WHERE users.role = 'student'; `)
        res.json({
			message: '¡Registro eliminado correctamente!',
		});
    } catch (error) {
        res.json({ message: error.message });
    }
}