import MentorModel from '../models/MentorModel.js';
import db from '../db/db.js';

export const getMentor = async (req, res) => {
	try {
		const [result, metadata] = await db.query(`
      SELECT mentors.id, mentors.name, mentors.last_name, mentors.birth_date,
        mentors.gender, mentors.phone, users.email, interests.name as interest, programs.name as program,
        studies.title as studies, business.name as business, actual_roles.name as role, mentors.active
      FROM 
        mentors, 
        mentors_interests,
        interests, 
        programs, 
        users, 
        mentors_users,
        sessions, 
        business, 
        studies,
        actual_roles
      WHERE
        mentors.id_business_fk = business.id and
        mentors.id_studies_fk = studies.id and
        mentors.id_actual_roles_fk = actual_roles.id and
        mentors.id_programs_fk = programs.id and
        mentors.id = mentors_interests.id_mentors_fk and
        mentors.id = mentors_users.id_mentors_fk and
        mentors.id = sessions.id_mentors_fk and
        users.id = mentors_users.id_users_fk and
        interests.id = mentors_interests.id_interests_fk
      GROUP BY
        mentors_interests.id_mentors_fk, sessions.id_mentors_fk
		`);
		res.json(result);
	} catch (error) {
		res.json({ message: error.message });
	}
};

export const getOneMentor = async (req, res) => {
	try {
		const mentor = await MentorModel.findAll({
			where: { id: req.params.id },
		});
		res.json(mentor[0]);
	} catch (error) {
		res.json({ message: error.message });
	}
};

export const createMentor = async (req, res) => {
	try {
		await MentorModel.create(req.body);
		res.json({
			message: '¡Registro creado correctamente!',
		});
	} catch (error) {
		res.json({ message: error.message });
	}
};

export const updateMentor = async (req, res) => {
	try {
		await MentorModel.update(req.body, {
			where: { id: req.params.id },
		});
		res.json({
			message: '¡Registro actualizado correctamente!',
		});
	} catch (error) {
		res.json({ message: error.message });
	}
};

export const deleteMentor = async (req, res) => {
	try {
		await MentorModel.destroy({
			where: { id: req.params.id },
		});
		res.json({
			message: '¡Registro eliminado correctamente!',
		});
	} catch (error) {
		res.json({ message: error.message });
	}
};
