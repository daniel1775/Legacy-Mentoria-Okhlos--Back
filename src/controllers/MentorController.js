import MentorModel from "../models/MentorModel.js";

export const getMentor = async (req, res) => {
    try {
        const mentors = await MentorModel.findAll()
        res.json(mentors)
    } catch (error) {
        res.json( {message: error.message} )
    }
}

export const getOneMentor = async (req, res) => {
    try {
        const mentor = await MentorModel.findAll({
            where:{ id:req.params.id }
        })
        res.json(mentor[0])
    } catch (error) {
        res.json( {message: error.message} )
    }
}

export const createMentor = async (req, res) => {
    try {
        await MentorModel.create(req.body)
        res.json({
            "message":"¡Registro creado correctamente!"
        })
     } catch (error) {
         res.json( {message: error.message} )
     }
}

export const updateMentor = async (req, res) => {
    try {
        await MentorModel.update(req.body, {
            where: { id: req.params.id}
        })
        res.json({
            "message":"¡Registro actualizado correctamente!"
        })
    } catch (error) {
        res.json( {message: error.message} )
    }
}

export const deleteMentor = async (req, res) => {
    try {
        await MentorModel.destroy({ 
            where: { id : req.params.id }
        })
        res.json({
            "message":"¡Registro eliminado correctamente!"
        })
    } catch (error) {
        res.json( {message: error.message} )
    }
}