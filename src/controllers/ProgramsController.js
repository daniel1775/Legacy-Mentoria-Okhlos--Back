import ProgramsModel from "../models/ProgramsModel.js"

export const getPrograms = async (req, res) => {
    try {
        const programs = await ProgramsModel.findAll()
        res.json(programs)
    } catch (error) {
        res.json( {message: error.message} )
    }
}

export const getOnePrograms = async (req, res) => {
    try {
        const program = await ProgramsModel.findAll({
            where:{ id:req.params.id }
        })
        res.json(program[0])
    } catch (error) {
        res.json( {message: error.message} )
    }
}

export const createPrograms = async (req, res) => {
    try {
        await ProgramsModel.create(req.body)
        res.json({
            "message":"¡Registro creado correctamente!"
        })
     } catch (error) {
         res.json( {message: error.message} )
     }
}

export const updatePrograms = async (req, res) => {
    try {
        await ProgramsModel.update(req.body, {
            where: { id: req.params.id}
        })
        res.json({
            "message":"¡Registro actualizado correctamente!"
        })
    } catch (error) {
        res.json( {message: error.message} )
    }
}

export const deletePrograms = async (req, res) => {
    try {
        await ProgramsModel.destroy({ 
            where: { id : req.params.id }
        })
        res.json({
            "message":"¡Registro eliminado correctamente!"
        })
    } catch (error) {
        res.json( {message: error.message} )
    }
}