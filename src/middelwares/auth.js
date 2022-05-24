import jsonwebtoken from "jsonwebtoken";
import moment from "moment";


export function isAuth(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({ message: 'Ingreso no permitido, logeate primero' })
    }
    const token = req.headers.authorization.split(' ')[1]
    const payload = jsonwebtoken.decode(token, process.env.JWT_SECRET)
    if (payload.exp <= moment().unix()){
        return res.status(401).send({message:'token expiró :D'})

    } 
    req.user=payload.sub
    next()
}

