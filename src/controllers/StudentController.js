import StudentModel from '../models/StudentModel.js';
import db from '../db/db.js';
import { Sequelize } from "sequelize";
import UsersModel from '../models/UsersModel.js';
const op = Sequelize.Op;



//Este controlador obtiene los estudiantes e intereses 
export const getStudent = async (req, res) => {
	try {
		const result = await db.query(`
		SELECT 
			users.email, estudiantes.name, estudiantes.cohort, estudiantes.age, estudiantes.phone, estudiantes.status,estudiantes.gender, programs.name as programa,
			interests.name as interests, estudiante_interest.nivel
		
		FROM 
			estudiantes, users, programs, interests, estudiante_interest
		
		WHERE 
			estudiantes.id_user = users.id 
				and 
					estudiantes.id_program = programs.id 
				and 
					estudiante_interest.id_estudiante = estudiantes.id 
				and 
					estudiante_interest.id_interest = interests.id;
		`);
		res.json(result[0])
	} catch (error) {
		res.json({ message: error.message });
	}
};

//Este controlador obtiene TODOS los estudiantes
export const getAllStudents = async (req, res) => {
	try {
		const students = await StudentModel.findAll()
		res.json(students)
	} catch (error) {
		res.json({ message: error.message })
	}
}

//Este controlador obtiene la mayor cohorte
export const getMaxCohort = async (req, res) => {
	try {
		const [ result, metadata ] = await db.query(`
		SELECT max(cohort)
		FROM estudiantes
    `);
		res.json(result)
	} catch (error) {
		res.json({ message: error.message });
	}
};

//Este controlador permite buscar un usuario por el nombre
export const searchStudent = async (req, res) => {

	try {
		const student = await db.query('SELECT * FROM estudiantes WHERE name LIKE "%' + req.params.name + '%"'
		)
		res.json(student[0]);
	}  catch (error) {
		res.json({ message: error.message })
	}
};

//funciona
export const getOneStudent = async (req, res) => {
	try {
		const student = await StudentModel.findAll({
			where: { id: req.params.id },
		});
		res.json(student[0]);
	} catch (error) {
		res.json({ message: error.message });
	}
};

//Este controlador siver para crear estudiantes
export const createStudent = async (req, res) => {

	let data = req.body

	try {
		const emailTest = await UsersModel.findOne({ where: { email: data[0][1]} });
            if (!emailTest) {
                await db.query(`INSERT INTO users (email,password,role) VALUES ('${data[0][1]}','student123','student');`)

                await db.query(`INSERT INTO estudiantes (name,email,cohort,age,phone,status,gender, id_program,id_user) VALUES ('${data[0][0]}','${data[0][1]}',${data[0][2]},${data[0][3]},${data[0][4]},${data[0][5]},'${data[0][6]}',(SELECT programs.id FROM programs WHERE programs.name = '${data[0][7]}'),(SELECT users.id FROM users WHERE users.email = '${data[0][1]}'));`)

                const id_student = await db.query(`SELECT estudiantes.id FROM estudiantes WHERE estudiantes.email = '${data[0][1]}';`)

                //interes bajo
                await db.query(`INSERT INTO estudiante_interest (estudiante_interest.nivel, estudiante_interest.id_estudiante, estudiante_interest.id_interest) VALUES (1,${id_student[0][0].id},(SELECT interests.id FROM interests WHERE interests.name = '${data[0][8]}'));`)

                //interes alto
                await db.query(`INSERT INTO estudiante_interest (estudiante_interest.nivel, estudiante_interest.id_estudiante, estudiante_interest.id_interest) VALUES (2,${id_student[0][0].id},(SELECT interests.id FROM interests WHERE interests.name = '${data[0][9]}'));`)
            }
		res.json({
			message: '¡Registro creado correctamente!',
		}); 
	} catch (error) {
		res.json({ message: error.message });
	}
};

//Este controlador sirve para actualizar estudiante
export const updateStudent = async (req, res) => {

	let data = req.body

	try {

		const id_user = await db.query(`SELECT estudiantes.id_user FROM estudiantes WHERE estudiantes.id = ${req.params.id};`)

		await db.query(`UPDATE users SET users.email = '${data[0][1]}' WHERE users.id = ${id_user[0][0].id_user};`)

		await db.query(`UPDATE estudiantes SET estudiantes.name = '${data[0][0]}', estudiantes.email = '${data[0][1]}', estudiantes.cohort = ${data[0][2]}, estudiantes.age = ${data[0][3]}, estudiantes.phone = ${data[0][4]}, estudiantes.status = ${data[0][5]}, estudiantes.gender = '${data[0][6]}', estudiantes.id_program = ${data[0][7]}, estudiantes.id_user = ${id_user[0][0].id_user} WHERE estudiantes.id = ${req.params.id};`)

		//interes bajo
		await db.query(`UPDATE estudiante_interest SET estudiante_interest.nivel = 1, estudiante_interest.id_estudiante = ${req.params.id}, estudiante_interest.id_interest = ${data[0][8]} WHERE estudiante_interest.id_estudiante = ${req.params.id} and estudiante_interest.nivel = 1;`)

		//interes alto
		await db.query(`UPDATE estudiante_interest SET estudiante_interest.nivel = 2, estudiante_interest.id_estudiante = ${req.params.id}, estudiante_interest.id_interest = ${data[0][9]} WHERE estudiante_interest.id_estudiante = ${req.params.id} and estudiante_interest.nivel = 2;`)
            

		res.json({
			message: '¡Registro actualizado correctamente!',
		});
	} catch (error) {
		res.json({ message: error.message });
	}
};

export const deleteStudent = async (req, res) => {
	try {
		await StudentModel.destroy({
			where: { id: req.params.id },
		});
		res.json({
			message: '¡Registro eliminado correctamente!',
		});
	} catch (error) {
		res.json({ message: error.message });
	}
};

export const getStudentInterests = async (req,res) => {
	try {
		const student = await db.query(`
		SELECT estudiantes.id, estudiantes.name, interests.name as interests, estudiante_interest.nivel FROM estudiantes, interests, estudiante_interest WHERE estudiante_interest.id_estudiante = ${req.params.id} and estudiantes.id = ${req.params.id} and estudiante_interest.id_interest = interests.id; 
		`)

		let interestsTest = []

		interestsTest.push({"id" : student[0][0].id})
		for (let i = 0; i < 2; i++) {
			interestsTest.push({"interest" : student[0][i].interests , "level" : student[0][i].nivel});
		}
		console.log(interestsTest)
		res.end()
		return(interestsTest)
				
	} catch (error) {
		console.log("message:" + error.message)
	}
};

// Personas sin mentor
export const getStudentsAvailable = async (req, res) => {
	try {
		const result = await db.query(`SELECT estudiantes.id, estudiantes.name, estudiantes.age FROM 
		estudiantes,matchs WHERE estudiantes.id <> matchs.id_estudiante;`);
		res.json(result[0]);
	} catch (error) {
		res.json({ message: error.message });
	}
};

// togglear status estudiante
export const toggleStatusStudent = async (req, res) => {
	try {
		await db.query(`
		UPDATE
			estudiantes 
		SET 
			estudiantes.status =NOT(estudiantes.status) 
		WHERE estudiantes.id = ${req.params.id};
		`)
		
		res.json({
			message: '¡status actualizado correctamente!',
		});
	} catch (error) {
		res.json({ message: error.message });
	}
};

// nombre y id de los mentores  con sus respectivos estudiantes asignados
export const student_assigned = async (req, res) => {
	try {
		const [result, metadata] = await db.query(`
		SELECT E.name as nombreEstudiante, m.name NombreMentor  FROM estudiantes  E
			INNER JOIN Matchs ma ON
				E.id = ma.id_estudiante
				INNER JOIN mentors m ON
				m.id = ma.id_mentor;
		`);
		res.json(result);
	} catch (error) {
		res.json({ message: error.message });
	}
}
