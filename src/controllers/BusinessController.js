import BusinessModel from "../models/BusinessModel.js"

export const getBusiness = async (req, res) => {
    try {
        const all_business = await BusinessModel.findAll()
        res.json(all_business)
    } catch (error) {
        res.json( {message: error.message} )
    }
}

export const getOneBusiness = async (req, res) => {
    try {
        const business = await BusinessModel.findAll({
            where:{ id:req.params.id }
        })
        res.json(business[0])
    } catch (error) {
        res.json( {message: error.message} )
    }
}

export const createBusiness = async (req, res) => {
    try {
        await BusinessModel.create(req.body)
        res.json({
            "message":"¡Registro creado correctamente!"
        })
     } catch (error) {
         res.json( {message: error.message} )
     }
}

export const updateBusiness = async (req, res) => {
    try {
        await BusinessModel.update(req.body, {
            where: { id: req.params.id}
        })
        res.json({
            "message":"¡Registro actualizado correctamente!"
        })
    } catch (error) {
        res.json( {message: error.message} )
    }
}

export const deleteBusiness = async (req, res) => {
    try {
        await BusinessModel.destroy({ 
            where: { id : req.params.id }
        })
        res.json({
            "message":"¡Registro eliminado correctamente!"
        })
    } catch (error) {
        res.json( {message: error.message} )
    }
}