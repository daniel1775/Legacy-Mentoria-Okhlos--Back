import db from '../db/db.js';
import UsersModel from '../models/UsersModel.js';

export const getUserStudent = async (req,res) => {
    try {
        const result = await db.query(`SELECT estudiantes.id,estudiantes.name,users.email, estudiantes.cohort, estudiantes.age, estudiantes.phone, estudiantes.status, estudiantes.gender, programs.name as programa, (SELECT interests.name as InteresMenor FROM interests, estudiante_interest, estudiantes as student WHERE interests.id = estudiante_interest.id_interest and estudiante_interest.id_estudiante = student.id and estudiante_interest.nivel = 1 and student.id = estudiantes.id) as InteresMenor, (SELECT interests.name as InteresMayor FROM interests, estudiante_interest, estudiantes as student WHERE interests.id = estudiante_interest.id_interest and estudiante_interest.id_estudiante = estudiantes.id and estudiante_interest.nivel = 2 and student.id = estudiantes.id) as InteresMayor FROM estudiantes, users, programs WHERE estudiantes.id_user = users.id and estudiantes.id_program = programs.id ORDER BY estudiantes.name;`)
        res.json(result[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const massiveDataStudent = async (req,res) => {

    let data = req.body

    try {
        for (let i = 0; i < data.length; i++) {
            const emailTest = await UsersModel.findOne({ where: { email: data[i][1]} });
            if (emailTest) {
                continue
            } else {
                await db.query(`INSERT INTO users (email,password,role) VALUES ('${data[i][1]}','student123','student');`)

                await db.query(`INSERT INTO estudiantes (name,email,cohort,age,phone,status,gender, id_program,id_user) VALUES ('${data[i][0]}','${data[i][1]}',${data[i][2]},${data[i][3]},${data[i][4]},${data[i][5]},'${data[i][6]}',(SELECT programs.id FROM programs WHERE programs.name = '${data[i][7]}'),(SELECT users.id FROM users WHERE users.email = '${data[i][1]}'));`)

                const id_student = await db.query(`SELECT estudiantes.id FROM estudiantes WHERE estudiantes.email = '${data[i][1]}';`)

                //interes bajo
                await db.query(`INSERT INTO estudiante_interest (estudiante_interest.nivel, estudiante_interest.id_estudiante, estudiante_interest.id_interest) VALUES (1,${id_student[0][0].id},(SELECT interests.id FROM interests WHERE interests.name = '${data[i][8]}'));`)

                //interes alto
                await db.query(`INSERT INTO estudiante_interest (estudiante_interest.nivel, estudiante_interest.id_estudiante, estudiante_interest.id_interest) VALUES (2,${id_student[0][0].id},(SELECT interests.id FROM interests WHERE interests.name = '${data[i][9]}'));`)

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




