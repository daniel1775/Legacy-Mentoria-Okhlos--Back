import InterestsModel from "../models/InterestsModel.js"

export const getInterests = async (req, res) => {
    try {
        const interests = await InterestsModel.findAll()
        res.json(interests)
    } catch (error) {
        res.json( {message: error.message} )
    }
}

export const getOneInterests = async (req, res) => {
    try {
        const interest = await InterestsModel.findAll({
            where:{ id:req.params.id }
        })
        res.json(interest[0])
    } catch (error) {
        res.json( {message: error.message} )
    }
}

export const createInterests = async (req, res) => {
    try {
        await InterestsModel.create(req.body)
        res.json({
            "message":"¡Registro creado correctamente!"
        })
     } catch (error) {
         res.json( {message: error.message} )
     }
}

export const updateInterests = async (req, res) => {
    try {
        await InterestsModel.update(req.body, {
            where: { id: req.params.id}
        })
        res.json({
            "message":"¡Registro actualizado correctamente!"
        })
    } catch (error) {
        res.json( {message: error.message} )
    }
}

export const deleteInterests = async (req, res) => {
    try {
        await InterestsModel.destroy({ 
            where: { id : req.params.id }
        })
        res.json({
            "message":"¡Registro eliminado correctamente!"
        })
    } catch (error) {
        res.json( {message: error.message} )
    }
}