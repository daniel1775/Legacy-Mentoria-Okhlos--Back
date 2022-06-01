import db from "../db/db.js";
import UsersModel from "../models/UsersModel.js";

export const getUserMentor = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT mentors.id, mentors.name as nombre, mentors.email, mentors.age, mentors.phone,mentors.gender ,mentors.status,cargos.name as cargo, businesses.name as company, studies.title as estudios, mentors.sons, mentors.num_estudiantes FROM mentors, businesses, studies, cargos WHERE studies.id = mentors.id_studies and businesses.id = mentors.id_bussiness and cargos.id = mentors.id_cargo;`);
    res.json(result);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const createUserMentor = async (req,res) => {
    let data = req.body
    try {
        for (let i = 0; i < data.length; i++) {
            const emailTest = await UsersModel.findOne({ where: { email: data[i][1]} });
            if (emailTest) {
                continue
            } else {
            await db.query(`INSERT INTO users (email,password,role) VALUES ('${data[i][1]}','mentor123','mentor');`)

            let id_bussiness = await db.query(`SELECT businesses.id FROM businesses WHERE businesses.name = '${data[i][9]}';`)

            let id_cargos = await db.query(`SELECT cargos.id FROM cargos WHERE cargos.name = '${data[i][10]}';`)

            let id_studies = await db.query(`SELECT studies.id FROM studies WHERE studies.title = '${data[i][8]}';`)

            let id_user = await db.query(`SELECT users.id FROM users WHERE users.email = '${data[i][1]}';`)

            await db.query(`INSERT INTO mentors (name,email,age,sons,num_estudiantes,phone,status,gender,id_studies,id_bussiness, id_cargo,id_user) VALUES ('${data[i][0]}','${data[i][1]}',${data[i][2]},${data[i][3]},${data[i][4]},${data[i][5]},${data[i][6]},'${data[i][7]}',${id_studies[0][0].id},${id_bussiness[0][0].id},${id_cargos[0][0].id},${id_user[0][0].id});`)

            const id_mentor = await db.query(`SELECT mentors.id FROM mentors WHERE mentors.email = '${data[i][1]}';`)

            //experiencia baja
            await db.query(`INSERT INTO mentors_interests (mentors_interests.nivel, mentors_interests.id_mentor, mentors_interests.id_interest) VALUES (1,${id_mentor[0][0].id},(SELECT interests.id FROM interests WHERE interests.name = '${data[i][11]}'));`)

            //experiencia alta
            await db.query(`INSERT INTO mentors_interests (mentors_interests.nivel, mentors_interests.id_mentor, mentors_interests.id_interest) VALUES (2,${id_mentor[0][0].id},(SELECT interests.id FROM interests WHERE interests.name = '${data[i][12]}'));`)
            } 
        }
        res.json({
            message: '¡Registro creado correctamente!',
        });
        res.end()
    }catch (error) {
        res.json({ message: error.message });
    }
    }

