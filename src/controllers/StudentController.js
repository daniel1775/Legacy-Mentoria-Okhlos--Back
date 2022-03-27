import StudentModel from '../models/StudentModel.js';
import db from '../db/db.js';

export const getStudent = async (req, res) => {
	try {
		const [ result, metadata ] = await db.query(`
			SELECT students.id, students.name, students.last_name, students.birth_date,
				students.gender, students.phone, users.email, interests.name as interest, programs.name as program,
				mentors.name as mentor, students.active
			FROM 
				students, 
				students_interests,
				interests, 
				programs, 
				users, 
				students_users,
				sessions,
				mentors
			WHERE
				students.id = students_interests.id_students_fk and
				students.id = students_users.id_students_fk and
				students.id_programs_fk = programs.id and
				interests.id = students_interests.id_interests_fk and
				users.id = students_users.id_users_fk and
				students.id = sessions.id_students_fk and
				mentors.id = sessions.id_mentors_fk
			GROUP BY
				students_interests.id_students_fk, sessions.id_students_fk
		`);
		res.json(result)
	} catch (error) {
		res.json({ message: error.message });
	}
};

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
