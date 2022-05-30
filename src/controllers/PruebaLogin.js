import db from "../db/db.js";
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";



export const loginP = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
      console.log("usted no ingreso alguno de los dos campos");
    } else {
      const results = await db.query(
        `SELECT * FROM users WHERE email ='${email}'`
      );
      let consulta;
      let id_user = await db.query(`SELECT id from users where users.email = '${email}';`)
        switch (results[0][0].role) {
          case 'admin':
            consulta = await db.query(
              `SELECT admins.name FROM admins WHERE admins.id_user = ${id_user[0][0].id}`
            );
            break;
          case 'student':
            consulta = await db.query(
              `SELECT estudiantes.name FROM estudiantes WHERE estudiantes.email = '${email}'`
            );
            break;
          case 'mentor':
            consulta = await db.query(
              `SELECT mentors.name FROM mentors WHERE mentors.email = '${email}'`
            );
            break;
          default:
            break;
        }
      console.log(consulta)
      console.log(results);

      console.log(results[0][0].password + " SOY LA PASSWORD");
      bcryptjs.compare(
        req.body.password,
        results[0][0].password,
        function (err, respuesta) {
          if (respuesta) {
            console.log(respuesta)
            const data ={
                id : results[0][0].id,
                role : results[0][0].role,
                // name : consulta[0][0].name
            }
            console.log(data)
            const token = jsonwebtoken.sign(data, process.env.JWT_SECRET, {
              expiresIn: process.env.JWT_TIME_EXPIRE,
              
            });
            console.log(token+" TOKENNNNNNNNNNNNN")
            const resToken = {
                accesToken:token
            }
            
            //generamos el token SIN fecha de expiracion
            res.json(resToken)
            console.log("TOKEN: " + token + " para el USUARIO : " + email);
          }
          else{
            res.json({ message: err.message })
          }
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
};

// conexion.query(`SELECT * FROM users WHERE email ='${email}'`,[email],async (error, results)=>{

//     if (!(await bcryptjs.compare(password, results[0].password))) {
//        console.log("Entre al if")
//      }else{
//         console.log("No entre al if")
//         const token = jsonwebtoken.sign(results[0], process.env.JWT_SECRET, { expiresIn: process.env.JWT_TIME_EXPIRE })
//         console.log(results[0])
//         const data = {'acces':token}
//         res.json(data);
//         return next()
//      }
// })
