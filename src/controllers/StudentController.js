import StudentModel from '../models/StudentModel.js';
import db from '../db/db.js';
import { json, Sequelize } from "sequelize";
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
		const student = await db.query('SELECT * FROM Estudiantes WHERE name LIKE "%' + req.params.name + '%"'
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
	try {
		await StudentModel.create(req.body);
		res.json({
			message: '¡Registro creado correctamente!',
		});
	} catch (error) {
		res.json({ message: error.message });
	}
};

//Este controlador sirve para actualizar estudiante
export const updateStudent = async (req, res) => {
	try {
		await StudentModel.update(req.body, {
			where: { id: req.params.id },
		});
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
		SELECT Estudiantes.id, Estudiantes.name, Interests.name as Interests, Estudiante_interest.nivel FROM Estudiantes, Interests, Estudiante_interest WHERE Estudiante_interest.id_estudiante = ${req.params.id} and Estudiantes.id = ${req.params.id} and Estudiante_interest.id_interest = Interests.id; 
		`)

		let interestsTest = []

		interestsTest.push({"id" : student[0][0].id})
		for (let i = 0; i < 2; i++) {
			interestsTest.push({"interest" : student[0][i].Interests , "level" : student[0][i].nivel});
		}
		return(interestsTest)
	} catch (error) {
		console.log("message:" + error.message)
	}
};

//Este controlador sirve para obtener las cohortes ordenadas
export const getCohorte = async (req,res) => {
	try {
		const cohort = await db.query(`SELECT DISTINCT(estudiantes.cohort)
		FROM estudiantes ORDER BY estudiantes.cohort `)
		
		res.json(cohort[0])
	}  catch (error) {
		console.log("message:" + error.message)
	}
};

export const getStudentsByCohort = async (req, res) => {
	try {
		const result = await db.query(`SELECT estudiantes.id, estudiantes.email, estudiantes.name, estudiantes.cohort, estudiantes.age, estudiantes.phone, estudiantes.status, estudiantes.gender, programs.name as programs FROM estudiantes,programs WHERE estudiantes.cohort = ${req.params.cohort};`)
		res.json(result[0])
		
	}  catch (error) {
		console.log("message:" + error.message)
}}

// Personas sin mentor
export const getStudentsAvailable = async (req, res) => {
	try {
		const result = await db.query(`SELECT estudiantes.id, estudiantes.name, estudiantes.age FROM 
		estudiantes,matchs WHERE estudiantes.id <> matchs.id_estudiante;`);
		res.json(result[0]);
	} catch (error) {
		res.json({ message: error.message });
	}
}

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
		SELECT e.name as nombreEstudiante, m.name NombreMentor  FROM estudiantes  e
			INNER JOIN matchs ma ON
				e.id = ma.id_estudiante
				INNER JOIN mentors m ON
				m.id = ma.id_mentor;
		`);
		res.json(result);
	} catch (error) {
		res.json({ message: error.message });
	}
}
