import db from '../db/db.js';

export const massiveDataStudent = async (req,res) => {

    let data = req.body
    try {
        for (let i = 0; i < data.length; i++) {
            console.log(data[i])
            await db.query(`INSERT INTO users (email,password,role) VALUES ('${data[i][1]}','student123','student');`)

            await db.query(`INSERT INTO Estudiantes (name,email,cohort,age,phone,status,gender, id_program,id_user) VALUES ('${data[i][0]}','${data[i][1]}',${data[i][2]},${data[i][3]},${data[i][4]},${data[i][5]},'${data[i][6]}',(SELECT programs.id FROM programs WHERE programs.name = '${data[i][7]}'),(SELECT users.id FROM users WHERE users.email = '${data[i][1]}'));`)
        }
        res.json({
            message: '¡Registro creado correctamente!',
        });
        res.end()
    }catch (error) {
        res.json({ message: error.message });
    }
}