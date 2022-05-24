import db from "../db/db.js"
import jsonwebtoken from "jsonwebtoken";
// import bcrypt from "bcryptjs/dist/bcrypt";


export const checkLogin = async (req, res) => {
	try {
    const email = req.params.email;
    const password = req.params.password;
    const [ result, metadata ] = await db.query(`SELECT id,role FROM users
      WHERE email='${email}' and password='${password}'`);
	
	const token = jsonwebtoken.sign(result[0],process.env.JWT_SECRET,{expiresIn:process.env.JWT_TIME_EXPIRE})
	  console.log(result[0])
	  console.log(token)

		res.json(result);
	} catch (error) {
		res.json({ message: error.message });
	}

};


 
	export const authController = async (req, res, next)=>{
		console.log(req.headers)
        try {
            const decodificada = await jsonwebtoken.verify(req.data,process.env.JWT_SECRET)
            conexion.query('SELECT * FROM users WHERE id = ?', [decodificada.id], (error, results)=>{
                if(!results){return next()}
                req.user = results[0]
                return next()
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    
        // res.redirect('/login')        
    
}
