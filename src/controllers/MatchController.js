import db from '../db/db.js';

export const getMatchCohort = async (req, res) => {
	try {
    const cohort = req.params.cohort;
    const program = req.params.program;
		const [ result, metadata ] = await db.query(`
      SELECT students.name as name_student, students.last_name as last_name_student, 
        mentors.name as name_mentor, mentors.last_name as last_name_mentor, _matchs.score
      FROM 
        _matchs,
        students,
        mentors
      WHERE
        _matchs.id_students_fk = students.id and
        _matchs.id_mentors_fk = mentors.id and 
        _matchs.cohort = ${cohort} and
        _matchs.id_programs_fk = ${program}
    `);
		res.json(result)
	} catch (error) {
		res.json({ message: error.message });
	}
};

export const getMatch = async (req, res) => {
	try {
		const [ result, metadata ] = await db.query(`
      SELECT * FROM _matchs
    `);
		res.json(result)
	} catch (error) {
		res.json({ message: error.message });
	}
};
