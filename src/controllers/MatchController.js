import db from '../db/db.js';
import { getStudentInterests, getStudentAge } from "./StudentController.js"
import { getMentorsMatch, getMentorbyId, getMentorsAvailableLocal } from "./MentorController.js"

export const getMatchCohort = async (req, res) => {
	try {
    const cohort = req.params.cohort;
    const program = req.params.program;
		const [ result, metadata ] = await db.query(`
      SELECT id_students_fk as id_student,
        students.name as name_student, students.last_name as last_name_student, 
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

export const updateMatch = async (req, res) => {
	try {
    const id_student = req.params.id_student;
    const id_mentor = req.params.id_mentor;
		const [ result, metadata ] = await db.query(`
      UPDATE _matchs 
      SET id_mentors_fk = ${id_mentor}
      WHERE id_students_fk = ${id_student}
    `);
		res.json(result)
	} catch (error) {
		res.json({ message: error.message });
	}
};

export const updateMatchAutomatic = async (req, res) => {
  try{
    const id_student = req.body.id_student;
    const id_mentor = req.body.id_mentor;
    const score = req.body.score;

    const [ result, metadata ] = await db.query(`
      UPDATE _matchs
      SET 
        id_mentors_fk = ${id_mentor},
        score = ${score}
      WHERE id_students_fk = ${id_student}
    `);

    res.json(result)
  }catch(error){
    res.json({ message: error.message });
  }
};

export const calculateMatch = async (req, res) => {
	try {
    const id_student = req.params.id_student;
    let interests_student = await getStudentInterests(id_student);
    let year_student = await getStudentAge(id_student);
    // mentors with their 3 interests
    let mentors_reapeat = await getMentorsMatch();
    // mentors only
    let mentors_norepeat = await getMentorsAvailableLocal();

    let mentors_total = [];
    let mentors_age = [];
    // saved the 3 mentor's interests without add
    let mentorsInterestUnprocessed = [];
    mentorsInterestUnprocessed.push(interests(mentors_reapeat, interests_student[0]));
    mentorsInterestUnprocessed.push(interests(mentors_reapeat, interests_student[1]));
    mentorsInterestUnprocessed.push(interests(mentors_reapeat, interests_student[2]));

    let mentorsAgeUnprocessed = [];
    mentorsAgeUnprocessed.push(year(mentors_norepeat, year_student));
    // result save inside of another array
    mentorsAgeUnprocessed = mentorsAgeUnprocessed[0];

    // Save mentor's score and id from 3 interests in one json
    for(let i=0 ; i<mentorsInterestUnprocessed[0].length ; i++){
      mentors_total.push({
        id: mentorsInterestUnprocessed[0][i].id_mentor,
        total_score: mentorsInterestUnprocessed[0][i].interest_score + mentorsInterestUnprocessed[1][i].interest_score + mentorsInterestUnprocessed[2][i].interest_score + mentorsAgeUnprocessed[i].age_score
      });
    }

    // Calculate max score
    let max_mentor = mentors_total[0];
    for(let i=1 ; i<mentors_total.length ; i++){
      if(max_mentor.total_score < mentors_total[i].total_score){
        max_mentor = mentors_total[i];
      }
    }

    /* console.log("mentors_total: "+JSON.stringify(mentors_total));
    console.log("max_mentor: "+JSON.stringify(max_mentor)); */
    let max_mentor_data = await getMentorbyId(max_mentor.id);
    max_mentor_data = max_mentor_data[0][0];
    console.log("max_mentor_data: "+JSON.stringify(max_mentor_data));
		res.json({
      id_mentor: max_mentor_data.id,
      name: max_mentor_data.name,
      last_name: max_mentor_data.last_name,
      score: max_mentor.total_score
    })
	} catch (error) {
		res.json({ message: error.message });
	}
};

function year(mentors, year_student){
  let mentors_score = mentors.map(element => {
    let age_score = 0;
    let year_mentor = parseInt(element.year);
    if(year_student == year_mentor){
      age_score = 25;
    }else if(year_student>=year_mentor-5 && year_student<=year_mentor+5){
      age_score = 15;
    }else if(year_student>=year_mentor-10 && year_student<=year_mentor+10){
      age_score = 5;
    }
    return({
      id_mentor: element.id_mentor,
      age_score: age_score
    })
  });
  
  return(mentors_score)
}

function interests(mentors, student_interest) {
  let mentors_score = [];
  let count = 0;
  let k = 0;
  let bonus = 0;
  for(let i=0; i<mentors.length; i++){
    for(let j=0 ; j<3 ; j++){
      if(mentors[k].interest == student_interest){
        count+=10;
        bonus++; 
      }
      if(bonus===3){
        count+=25;
      }
      k++;
    }
    mentors_score.push({
      id_mentor: mentors[k-1].id_mentor, 
      interest_score: count
    });

    i = k - 1;
    
    count = 0;
    bonus = 0;
  }

  return mentors_score;
}