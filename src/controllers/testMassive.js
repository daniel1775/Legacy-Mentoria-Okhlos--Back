import db from '../db/db.js';
import UsersModel from '../models/UsersModel.js';

export const getUserStudent = async (req,res) => {
    try {
        const result = await db.query(`SELECT Estudiantes.id,Estudiantes.name, users.email, Estudiantes.cohort, Estudiantes.age, Estudiantes.phone, Estudiantes.status, Estudiantes.gender, programs.name as programa FROM Estudiantes, users, programs WHERE Estudiantes.id_user = users.id and Estudiantes.id_program = programs.id ORDER BY Estudiantes.name;`)
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

                await db.query(`INSERT INTO Estudiantes (name,email,cohort,age,phone,status,gender, id_program,id_user) VALUES ('${data[i][0]}','${data[i][1]}',${data[i][2]},${data[i][3]},${data[i][4]},${data[i][5]},'${data[i][6]}',(SELECT programs.id FROM programs WHERE programs.name = '${data[i][7]}'),(SELECT users.id FROM users WHERE users.email = '${data[i][1]}'));`)
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