import UsersModel from "../models/UsersModel.js"
 import bcryptjs from "bcryptjs"
// import db from "../db/db.js"




export const getUsers = async (req, res) => {
    try {
        const users = await UsersModel.findAll()
        res.json(users)
    } catch (error) {
        res.json({ message: error.message })
    }
}

export const getOneUsers = async (req, res) => {
    try {
        const user = await UsersModel.findAll({
            where: { id: req.params.id }
        })
        res.json(user[0])
    } catch (error) {
        res.json({ message: error.message })
    }
}

export const createUsers = async (req, res) => {
    try {
        await UsersModel.create(req.body)
        res.json({
            "message": "¡Registro creado correctamente!"
        })
    } catch (error) {
        res.json({ message: error.message })
    }
}


export const register = async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password
        const role = req.body.role
        let passHash = await bcryptjs.hash(password, 8)
        const data = {
            'email': email,
            'password': passHash,
            'role': role
        }

        await UsersModel.create(data)
        res.json({
            "message": "¡Registro creado correctamente!"
        })
    } catch (error) {
        res.json({ message: error.message })
    }
}


export const updateUsers = async (req, res) => {
    try {
        await UsersModel.update(req.body, {
            where: { id: req.params.id }
        })
        res.json({
            "message": "¡Registro actualizado correctamente!"
        })
    } catch (error) {
        res.json({ message: error.message })
    }
}

export const deleteUsers = async (req, res) => {
    try {
        await UsersModel.destroy({
            where: { id: req.params.id }
        })
        res.json({
            "message": "¡Registro eliminado correctamente!"
        })
    } catch (error) {
        res.json({ message: error.message })
    }
}