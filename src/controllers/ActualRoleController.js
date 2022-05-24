import ActualRoleModel from "../models/CargoModel.js"

export const getActualRole = async (req, res) => {
    try {
        const actual_roles = await ActualRoleModel.findAll()
        res.json(actual_roles)
    } catch (error) {
        res.json( {message: error.message} )
    }
}

export const getOneActualRole = async (req, res) => {
    try {
        const actual_role = await ActualRoleModel.findAll({
            where:{ id:req.params.id }
        })
        res.json(actual_role[0])
    } catch (error) {
        res.json( {message: error.message} )
    }
}

export const createActualRole = async (req, res) => {
    try {
        await ActualRoleModel.create(req.body)
        res.json({
            "message":"¡Registro creado correctamente!"
        })
    } catch (error) {
        res.json( {message: error.message} )
    }
}

export const updateActualRole = async (req, res) => {
    try {
        await ActualRoleModel.update(req.body, {
            where: { id: req.params.id}
        })
        res.json({
            "message":"¡Registro actualizado correctamente!"
        })
    } catch (error) {
        res.json( {message: error.message} )
    }
}

export const deleteActualRole = async (req, res) => {
    try {
        await ActualRoleModel.destroy({ 
            where: { id : req.params.id }
        })
        res.json({
            "message":"¡Registro eliminado correctamente!"
        })
    } catch (error) {
        res.json( {message: error.message} )
    }
}