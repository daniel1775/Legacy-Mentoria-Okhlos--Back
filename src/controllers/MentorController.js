import MentorModel from "../models/MentorModel.js";
import db from "../db/db.js";

export const getAllMentors = async (req, res) => {
  try {
    const mentors = await MentorModel.findAll();
    res.json(mentors);
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

export const getOneMentor = async (req, res) => {
  try {
    const mentor = await MentorModel.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.json(mentor[0]);
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

export const createMentor = async (req, res) => {
  try {
    await MentorModel.create(req.body);
    res.json({
      message: "¡Registro creado correctamente!",
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

export const updateMentor = async (req, res) => {
  try {
    await MentorModel.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "¡Registro actualizado correctamente!",
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

export const deleteMentor = async (req, res) => {
  try {
    await MentorModel.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "¡Registro eliminado correctamente!",
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

//
export const getMentor = async (req, res) => {
  try {
    const result = await db.query(`SELECT mentors.name as nombreMentor, mentors.age, mentors.phone, studies.title as Estudios, Businesses.name as Empresa , Cargos.name as Cargo, Interests.name as Intereses, mentors_interests.nivel FROM mentors, Businesses,studies,Cargos, Interests, mentors_interests WHERE studies.id = mentors.id_studies and Businesses.id = mentors.id_bussiness and Cargos.id = mentors.id_cargo and mentors_interests.id_interest = Interests.id and mentors_interests.id_mentor = mentors.id;`);

    res.json(result[0]);
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

// togle mentor status
export const mentorStatus = async (req, res) => {
  try {
    await db.query(`UPDATE mentors SET mentors.status =NOT(mentors.status) WHERE mentors.id = ${req.params.id};`);

    res.json({
      message: "¡status actualizado correctamente!",
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

//Trae todos los mentores que aun tengan cupo para ser mentores de mas estudiantes
export const getMentorsAvailable = async (req, res) => {
  try {
    const result = await db.query(`
			SELECT  id,name FROM mentors m WHERE m.num_estudiantes > (SELECT COUNT(*) FROM matchs ma WHERE m.id = ma.id_mentor)`);
    res.json(result);
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

// nombre y id de los mentores  con sus respectivos estudiantes asignados
export const mentor_assigned = async (req, res) => {
  try {
    const [result, metadata] = await db.query(`
		SELECT  m.id, m.name as nombreMentor, e.name as Estudiante
		FROM 
		mentors  m
			INNER JOIN matchs ma ON
				m.id = ma.id_mentor
				INNER JOIN estudiantes e ON
				e.id = ma.id_estudiante;
		`);
    res.json(result);
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};
