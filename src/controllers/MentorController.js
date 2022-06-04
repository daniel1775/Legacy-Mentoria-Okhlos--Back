import MentorModel from "../models/MentorModel.js";
import db from "../db/db.js";
import UsersModel from '../models/UsersModel.js'

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
    return(mentor)
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

export const createMentor = async (req, res) => {

  let data = req.body

  try {
    const emailTest = await UsersModel.findOne({ where: { email: data[0][1]} });
    if (!emailTest) {
        await db.query(`INSERT INTO users (email,password,role) VALUES ('${data[0][1]}','mentor123','mentor');`)

        await db.query(`INSERT INTO mentors (name,email,age,sons,num_estudiantes,phone,status,gender,id_studies,id_bussiness, id_cargo,id_user) VALUES ('${data[0][0]}','${data[0][1]}',${data[0][2]},${data[0][3]},${data[0][4]},${data[0][5]},${data[0][6]},'${data[0][7]}',(SELECT studies.id FROM studies WHERE studies.title = '${data[0][8]}'),(SELECT Businesses.id FROM Businesses WHERE Businesses.name = '${data[0][9]}'),(SELECT Cargos.id FROM Cargos WHERE Cargos.name = '${data[0][10]}'),(SELECT users.id FROM users WHERE users.email = '${data[0][1]}'));`)

        const id_mentor = await db.query(`SELECT mentors.id FROM mentors WHERE mentors.email = '${data[0][1]}';`)

        //interes bajo
        await db.query(`INSERT INTO mentors_interests (mentors_interests.nivel, mentors_interests.id_mentor, mentors_interests.id_interest) VALUES (1,${id_mentor[0][0].id},(SELECT interests.id FROM interests WHERE interests.name = '${data[0][11]}'));`)

        //interes alto
        await db.query(`INSERT INTO mentors_interests (mentors_interests.nivel, mentors_interests.id_mentor, mentors_interests.id_interest) VALUES (2,${id_mentor[0][0].id},(SELECT interests.id FROM interests WHERE interests.name = '${data[0][12]}'));`)
    }
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

  let data = req.body

	try {
		const id_user = await db.query(`SELECT mentors.id_user FROM mentors WHERE mentors.id = ${req.params.id};`)

		await db.query(`UPDATE users SET users.email = '${data[0][1]}' WHERE users.id = ${id_user[0][0].id_user};`)

		await db.query(`UPDATE mentors SET mentors.name = '${data[0][0]}', mentors.email = '${data[0][1]}', mentors.age = ${data[0][2]}, mentors.sons = ${data[0][3]}, mentors.num_estudiantes = ${data[0][4]}, mentors.phone = ${data[0][5]}, mentors.status = ${data[0][6]}, mentors.gender = '${data[0][7]}', mentors.id_studies = (SELECT studies.id FROM studies WHERE studies.title = '${data[0][8]}'), mentors.id_bussiness = (SELECT businesses.id FROM businesses WHERE businesses.name = '${data[0][9]}'), mentors.id_cargo =  (SELECT cargos.id FROM cargos WHERE cargos.name = '${data[0][10]}'), mentors.id_user = ${id_user[0][0].id_user} WHERE mentors.id = ${req.params.id};`)

		//interes bajo
		await db.query(`UPDATE mentors_interests SET mentors_interests.nivel = 1, mentors_interests.id_mentor = ${req.params.id}, mentors_interests.id_interest = ${data[0][11]} WHERE mentors_interests.id_mentor = ${req.params.id} and mentors_interests.nivel = 1;`)

		//interes alto
		await db.query(`UPDATE mentors_interests SET mentors_interests.nivel = 2, mentors_interests.id_mentor = ${req.params.id}, mentors_interests.id_interest = ${data[0][12]} WHERE mentors_interests.id_mentor = ${req.params.id} and mentors_interests.nivel = 2;`)

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

    let mentorInMatch = await db.query(`SELECT matchs.id_mentor FROM matchs WHERE matchs.id_mentor = ${req.params.id};`)

    if (mentorInMatch[0].length != 0) {
      await db.query(`DELETE FROM matchs WHERE matchs.id_mentor = ${req.params.id};`);
    }

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
    const result = await db.query(`SELECT  id, name, age FROM mentors m WHERE m.num_estudiantes > SOME (SELECT COUNT(id_mentor) FROM matchs ma WHERE m.id = ma.id_mentor);`);
    res.json(result[0])
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

export const getMentorsMatch = async () => {

	try {
		const result = await db.query(`SELECT mentors.id ,mentors.name, mentors.age, interests.name as interests ,mentors_interests.nivel FROM mentors, mentors_interests, interests WHERE mentors.id = mentors_interests.id_mentor and  interests.id = mentors_interests.id_interest and mentors.num_estudiantes > SOME (SELECT COUNT(matchs.id_mentor) FROM matchs WHERE matchs.id_mentor = mentors.id) and mentors.status = 1 ORDER BY mentors.id;`)

		let mentors = [];
		for(let i=0 ; i<result[0].length ; i++){
			let ob = {
				id: result[0][i].id,
				name: result[0][i].name,
				age: result[0][i].age,
				interest: result[0][i].interests,
        nivel: result[0][i].nivel
			}
			mentors.push(ob)
		}
    // console.log(mentors)
		return(mentors);
	} catch (error) {
		console.log("message:" + error.message)
	}
};
