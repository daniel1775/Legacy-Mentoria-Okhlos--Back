import '../models/MentorModel.js'
import db from '../db/db.js';

export const getAllMentors = async (req, res) => {
	try {
        const mentors = await MentorModel.findAll()
        res.json(mentors)
    } catch (error) {
        res.json( {message: error.message} )
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

//

export const getMentor = async (req, res) => {
    try {
        const result = await db.query(`SELECT mentors.id, mentors.name, Businesses.name, Cargos.name, studies.title, users.email, mentors.status, Interests.name, mentors_interests.nivel, programs.name FROM mentors_interests, mentors, Interests, users, programs, Mentor_program, Businesses, Cargos, studies WHERE mentors_interests.id_mentor = mentors.id and mentors_interests.id_interest = Interests.id and mentors.id_user = users.id and Mentor_program.id_mentor = mentors.id and Mentor_program.id_program = programs.id and Businesses.id = mentors.id_bussiness and Cargos.id = mentors.id_cargo and studies.id = mentors.id_studies; `)
        res.json(result);
    } catch (error) {
        res.json({ message: error.message });
    }
}




