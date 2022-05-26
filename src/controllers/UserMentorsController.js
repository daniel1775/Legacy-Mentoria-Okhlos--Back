import db from '../db/db.js';

export const getUserMentor = async (req,res) => {
    try {
        const result = await db.query(`SELECT mentors.id, mentors.name, mentors.email, mentors.age, mentors.phone, studies.title, Businesses.name as company, Cargos.name as cargo FROM mentors, Businesses, studies, Cargos WHERE studies.id = mentors.id_studies and Businesses.id = mentors.id_bussiness and Cargos.id = mentors.id_cargo ORDER BY mentors.name;
        `)
        res.json(result[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const createUserMentor = async (req,res) => {
    try {
        await db.query(`INSERT INTO users (email,password,role) VALUES ('${req.body.email}','mentor123','mentor');`)

        await db.query(`INSERT INTO mentors (name,email,age,sons,num_estudiantes,phone,status,gender,id_studies,id_bussiness, id_cargo,id_user) VALUES ('${req.body.name}','${req.body.email}',${req.body.age},${req.body.sons},${req.body.num_estudiantes},${req.body.phone},${req.body.status},'${req.body.gender}',(SELECT studies.id FROM studies WHERE studies.title = '${req.body.title}'),(SELECT Businesses.id FROM Businesses WHERE Businesses.name = '${req.body.company}'),(SELECT Cargos.id FROM Cargos WHERE Cargos.name = '${req.body.cargo}'),(SELECT users.id FROM users WHERE users.email = '${req.body.email}')); `)
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

