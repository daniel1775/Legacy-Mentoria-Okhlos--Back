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
