import AdminModel from "../models/AdminModel.js";

export const getAdmin = async (req, res) => {
    try {
        const admins = await AdminModel.findAll()
        res.json(admins)
    } catch (error) {
        res.json( {message: error.message} )
    }
}

export const getOneAdmin = async (req, res) => {
    try {
        const admin = await AdminModel.findAll({
            where:{ id:req.params.id }
        })
        res.json(admin[0])
    } catch (error) {
        res.json( {message: error.message} )
    }
}

export const createAdmin = async (req, res) => {
    try {
        await AdminModel.create(req.body)
        res.json({
            "message":"¡Registro creado correctamente!"
        })
     } catch (error) {
         res.json( {message: error.message} )
     }
}

export const updateAdmin = async (req, res) => {
    try {
        await AdminModel.update(req.body, {
            where: { id: req.params.id}
        })
        res.json({
            "message":"¡Registro actualizado correctamente!"
        })
    } catch (error) {
        res.json( {message: error.message} )
    }
}

export const deleteAdmin = async (req, res) => {
    try {
        await AdminModel.destroy({ 
            where: { id : req.params.id }
        })
        res.json({
            "message":"¡Registro eliminado correctamente!"
        })
    } catch (error) {
        res.json( {message: error.message} )
    }
}