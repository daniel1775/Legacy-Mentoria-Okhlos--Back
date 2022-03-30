import SessionsModel from '../models/SessionsModel.js';
import db from '../db/db.js';

export const getSessions = async (req, res) => {
	try {
		const [result, metadata] = await db.query(`
    SELECT title, start_date, end_date, description, state
    FROM sessions
		`);
		res.json(result);
	} catch (error) {
		res.json({ message: error.message });
	}
};

export const getAllSessions = async (req, res) => {
	try {
        const sessions = await SessionsModel.findAll()
        res.json(sessions)
    } catch (error) {
        res.json( {message: error.message} )
    }
};

export const getOneSessions = async (req, res) => {
	try {
		const session = await SessionsModel.findAll({
			where: { id: req.params.id },
		});
		res.json(session[0]);
	} catch (error) {
		res.json({ message: error.message });
	}
};

export const createSessions = async (req, res) => {
	try {
		await SessionsModel.create(req.body);
		res.json({
			message: '¡Registro creado correctamente!',
		});
	} catch (error) {
		res.json({ message: error.message });
	}
};

export const updateSessions = async (req, res) => {
	try {
		await SessionsModel.update(req.body, {
			where: { id: req.params.id },
		});
		res.json({
			message: '¡Registro actualizado correctamente!',
		});
	} catch (error) {
		res.json({ message: error.message });
	}
};

export const deleteSessions = async (req, res) => {
	try {
		await SessionsModel.destroy({
			where: { id: req.params.id },
		});
		res.json({
			message: '¡Registro eliminado correctamente!',
		});
	} catch (error) {
		res.json({ message: error.message });
	}
};
