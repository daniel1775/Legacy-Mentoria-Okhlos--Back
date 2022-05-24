import StudiesModel from "../models/StudiesModel.js"

export const getStudies = async (req, res) => {
    try {
        const studies = await StudiesModel.findAll()
        res.json(studies)
    } catch (error) {
        res.json( {message: error.message} )
    }
}

export const getOneStudies = async (req, res) => {
    try {
        const studie = await StudiesModel.findAll({
            where:{ id:req.params.id }
        })
        res.json(studie[0])
    } catch (error) {
        res.json( {message: error.message} )
    }
}

export const createStudies = async (req, res) => {
    try {
        await StudiesModel.create(req.body)
        res.json({
            "message":"¡Registro creado correctamente!"
        })
     } catch (error) {
         res.json( {message: error.message} )
     }
}

export const updateStudies = async (req, res) => {
    try {
        await StudiesModel.update(req.body, {
            where: { id: req.params.id}
        })
        res.json({
            "message":"¡Registro actualizado correctamente!"
        })
    } catch (error) {
        res.json( {message: error.message} )
    }
}

export const deleteStudies = async (req, res) => {
    try {
        await StudiesModel.destroy({ 
            where: { id : req.params.id }
        })
        res.json({
            "message":"¡Registro eliminado correctamente!"
        })
    } catch (error) {
        res.json( {message: error.message} )
    }
}