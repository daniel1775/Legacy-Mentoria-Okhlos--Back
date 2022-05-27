<<<<<<< HEAD
import db from '../db/db.js';
import UsersModel from '../models/UsersModel.js';

export const getUserMentor = async (req,res) => {
    try {
        const result = await db.query(`SELECT mentors.id, mentors.name, mentors.email, mentors.age, mentors.phone, studies.title, Businesses.name as company, Cargos.name as cargo FROM mentors, Businesses, studies, Cargos WHERE studies.id = mentors.id_studies and Businesses.id = mentors.id_bussiness and Cargos.id = mentors.id_cargo ORDER BY mentors.name;`)
        res.json(result[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const createUserMentor = async (req,res) => {
    let data = req.body
    try {
        for (let i = 0; i < data.length; i++) {
            const emailTest = await UsersModel.findOne({ where: { email: data[i][1]} });
            if (emailTest) {
                continue
            } else {
                await db.query(`INSERT INTO users (email,password,role) VALUES ('${data[i][1]}','mentor123','mentor');`)

                await db.query(`INSERT INTO mentors (name,email,age,sons,num_estudiantes,phone,status,gender,id_studies,id_bussiness, id_cargo,id_user) VALUES ('${data[i][0]}','${data[i][1]}',${data[i][2]},${data[i][3]},${data[i][4]},${data[i][5]},${data[i][6]},'${data[i][7]}',(SELECT studies.id FROM studies WHERE studies.title = '${data[i][8]}'),(SELECT Businesses.id FROM Businesses WHERE Businesses.name = '${data[i][9]}'),(SELECT Cargos.id FROM Cargos WHERE Cargos.name = '${data[i][10]}'),(SELECT users.id FROM users WHERE users.email = '${data[i][1]}'));`)
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

=======
import db from "../db/db.js";

export const getUserMentor = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT mentors.name as nombreMentor, mentors.email, mentors.age, mentors.phone, studies.title, 
      businesses.name, cargos.name 
      FROM
     mentors, businesses, studies, cargos 
    WHERE
     studies.id = mentors.id_studies and 
    businesses.id = mentors.id_bussiness and
     cargos.id = mentors.id_cargo;`
    );
    res.json(result);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const createUserStudent = async (req, res) => {
  try {
    await db.query(
      `INSERT INTO users (email,password,role) VALUES ('${req.body.email}','test123','test');`
    );

    await db.query(
      `INSERT INTO Estudiantes (name,email,cohort,age,phone,status,gender, id_program,id_user) VALUES ('${req.body.name}','${req.body.email}',${req.body.cohort},${req.body.age},${req.body.phone},${req.body.status},'${req.body.gender}',(SELECT programs.id FROM programs WHERE programs.name = '${req.body.programa}'),(SELECT users.id FROM users WHERE users.email = '${req.body.email}'));`
    );

    res.json({
      message: "¡Registro creado correctamente!",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const deleteAllUserStudent = async (req, res) => {
  try {
    await db.query(`DELETE FROM users WHERE users.role = 'student'; `);
    res.json({
      message: "¡Registro eliminado correctamente!",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
>>>>>>> 6e29ab7d87fcc9a27ab8d0856c497ab860236f8c
