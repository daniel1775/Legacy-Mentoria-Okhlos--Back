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
        await db.query(`INSERT INTO users (email,password,role) VALUES ('${req.body.email}','mentor123','mentor');`)

        await db.query(`SELECT Estudiantes.id, Estudiantes.name ,users.email, Estudiantes.cohort, Estudiantes.age, Estudiantes.phone, Estudiantes.status, Estudiantes.gender, programs.name as programa FROM Estudiantes, users, programs WHERE Estudiantes.id_user = users.id and Estudiantes.id_program = programs.id ORDER BY Estudiantes.name;)`)

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