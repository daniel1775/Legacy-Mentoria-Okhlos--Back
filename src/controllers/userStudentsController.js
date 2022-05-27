import db from '../db/db.js';

export const getUserStudent = async (req,res) => {
    try {
        const result = await db.query(`SELECT Estudiantes.id, Estudiantes.name ,users.email, Estudiantes.cohort, Estudiantes.age, Estudiantes.phone, Estudiantes.status, Estudiantes.gender, programs.name as programa FROM Estudiantes, users, programs WHERE Estudiantes.id_user = users.id and Estudiantes.id_program = programs.id ORDER BY Estudiantes.name;`)
        res.json(result[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const createUserStudent = async (req,res) => {
    try {
        await db.query(`INSERT INTO users (email,password,role) VALUES ('${req.body.email}','mentor123','mentor');`)

        await db.query(`INSERT INTO mentors (name,email,age,sons,num_estudiantes,phone,status,gender,id_studies,id_bussiness, id_cargo,id_user) VALUES ('${req.body.name}','${req.body.email}',${req.body.age},${req.body.sons},${req.body.num_estudiantes},${req.body.phone},${req.body.status},'${req.body.gender}',(SELECT studies.id FROM studies WHERE studies.title = '${req.body.title}'),(SELECT Businesses.id FROM Businesses WHERE Businesses.name = '${req.body.bussiness}'),(SELECT Cargos.id FROM Cargos WHERE Cargos.name = '${req.body.cargo}'),(SELECT users.id FROM users WHERE users.email = '${req.body.email}')); `)

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