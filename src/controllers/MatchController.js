import { getStudentInterestsLow,getStudentInterestsHigh, getAgeStudent } from "./StudentController.js"
import { getMentorsMatch } from "./MentorController.js"
import db from "../db/db.js";

export const matchIndividual = async (req, res) => {
  const id_student = req.params.id;
  const mentors_interests = await getMentorsMatch();
  const student_i_Low = await getStudentInterestsLow(id_student)
  const student_i_High = await getStudentInterestsHigh(id_student)
  const student_age = await getAgeStudent(id_student)

  let mentors_total = [];
  let data = []
  // saved the 2 mentor's interests without add
  let mentorsInterestUnprocessed = [];
  if (mentors_interests.length != 0) {
    mentorsInterestUnprocessed.push(interests_low(mentors_interests,student_i_Low))
    mentorsInterestUnprocessed.push(interests_high(mentors_interests,student_i_High))
    mentorsInterestUnprocessed.push(age(mentors_interests,student_age))
    
    for (let i = 0; i < mentorsInterestUnprocessed[0].length; i++) {
      mentors_total.push({
        id: mentorsInterestUnprocessed[0][i].id_mentor,
        total_score: mentorsInterestUnprocessed[0][i].interest_score_low + mentorsInterestUnprocessed[1][i].interest_score_high + mentorsInterestUnprocessed[2][i].age_score
      })
    }

    let max_mentor = mentors_total[0];
    for (let i = 1; i < mentors_total.length; i++) {
      if(max_mentor.total_score < mentors_total[i].total_score){
        max_mentor = mentors_total[i];
      }
    }

    let porcentajeScoreIlow = 0
    let porcentajeScoreIHigh = 0
    let porcentajeScoreAge = 0

    for (let i = 0; i < mentorsInterestUnprocessed[0].length; i++) {
      if (mentorsInterestUnprocessed[0][i].id_mentor == max_mentor.id) {
        porcentajeScoreIlow = (mentorsInterestUnprocessed[0][i].interest_score_low/25)*100
        porcentajeScoreIHigh = (mentorsInterestUnprocessed[1][i].interest_score_high/25)*100
        porcentajeScoreAge = (mentorsInterestUnprocessed[2][i].age_score/10)*100   
        break 
      }
    }

    let studenName = await db.query(`SELECT estudiantes.name FROM estudiantes WHERE estudiantes.id = ${id_student};`)

    let mentorsName = await db.query(`SELECT mentors.name FROM mentors WHERE mentors.id = ${max_mentor.id};`)

    data.push({
      idStudent: id_student,
      nameStudent: studenName[0][0].name,
      mentorId: max_mentor.id,
      nameMentor: mentorsName[0][0].name,
      mentorScore: (max_mentor.total_score/60)*100,
      porcentajeScoreIlow: porcentajeScoreIlow,
      porcentajeScoreIHigh: porcentajeScoreIHigh,
      porcentajeScoreAge: porcentajeScoreAge
    })
  }else{
    data.push({message: "No hay mentor disponible!"})
  }
  res.json(data[0])
  res.end()
};

export const matchMassive = async (req,res)=>{
  const students = req.body
  let data = []
  for (let i = 0; i < students.length; i++) {
    const mentors_interests = await getMentorsMatch();
    if (mentors_interests.length != 0) {
      const student_i_Low = await getStudentInterestsLow(students[i])
      const student_i_High = await getStudentInterestsHigh(students[i])
      const student_age = await getAgeStudent(students[i])
      let mentors_total = [];
      // saved the 2 mentor's interests without add
      let mentorsInterestUnprocessed = [];
      mentorsInterestUnprocessed.push(interests_low(mentors_interests,student_i_Low))
      mentorsInterestUnprocessed.push(interests_high(mentors_interests,student_i_High))
      mentorsInterestUnprocessed.push(age(mentors_interests,student_age))
      
      for (let i = 0; i < mentorsInterestUnprocessed[0].length; i++) {
        mentors_total.push({
          id: mentorsInterestUnprocessed[0][i].id_mentor,
          total_score: mentorsInterestUnprocessed[0][i].interest_score_low + mentorsInterestUnprocessed[1][i].interest_score_high + mentorsInterestUnprocessed[2][i].age_score
        })
      }

      let max_mentor = mentors_total[0];
      for (let i = 1; i < mentors_total.length; i++) {
        if(max_mentor.total_score < mentors_total[i].total_score){
          max_mentor = mentors_total[i];
        }
      }

      let porcentajeScoreIlow = 0
      let porcentajeScoreIHigh = 0
      let porcentajeScoreAge = 0

      for (let i = 0; i < mentorsInterestUnprocessed[0].length; i++) {
        if (mentorsInterestUnprocessed[0][i].id_mentor == max_mentor.id) {
          porcentajeScoreIlow = (mentorsInterestUnprocessed[0][i].interest_score_low/25)*100
          porcentajeScoreIHigh = (mentorsInterestUnprocessed[1][i].interest_score_high/25)*100
          porcentajeScoreAge = (mentorsInterestUnprocessed[2][i].age_score/10)*100   
          break 
        }
      }

      let studenName = await db.query(`SELECT estudiantes.name FROM estudiantes WHERE estudiantes.id = ${students[i]};`)

      let mentorsName = await db.query(`SELECT mentors.name FROM mentors WHERE mentors.id = ${max_mentor.id};`)

      data.push({
        idStudent: students[i],
        nameStudent: studenName[0][0].name,
        mentorId: max_mentor.id,
        nameMentor: mentorsName[0][0].name,
        mentorScore: (max_mentor.total_score/60)*100,
        porcentajeScoreIlow: porcentajeScoreIlow,
        porcentajeScoreIHigh: porcentajeScoreIHigh,
        porcentajeScoreAge: porcentajeScoreAge
      })    

      await db.query(`INSERT INTO matchs (score,cohort,id_mentor,id_estudiante, id_program) VALUES (${max_mentor.total_score},(SELECT estudiantes.cohort FROM estudiantes WHERE estudiantes.id = ${students[i]}),${max_mentor.id},${students[i]},(SELECT estudiantes.id_program FROM estudiantes where estudiantes.id = ${students[i]}));`)
    }else{
      data.push({message: "No hay mentor disponible!"})
    }
  }
  res.json(data) 
  res.end()
}

//################### interes edad #########################
function age(mentors, student) {
  const mentors_score = [];
  for (let i = 0; i < mentors.length; i++) {
    let age_score = 0;
      if (mentors[i].nivel == 1) {
        let year_mentor = mentors[i].age;
        let age_student = student[0].age;
        if (age_student == year_mentor) {
          age_score = 10;
        } else if (age_student >= year_mentor - 5 && age_student <= year_mentor + 5) {
          age_score = 5;
        } else if (age_student >= year_mentor - 10 && age_student <= year_mentor + 10) {
          age_score = 3;
        }
        mentors_score.push({
          id_mentor: mentors[i].id,
          age_score,
        });
      }
  }
  return mentors_score;
}
//##########################################################

//################### interes bajo #########################
function interests_low(mentors, student_interest) {
  let mentors_score = [];
  let count = 0;
  for (let i = 0; i < mentors.length; i++) {
    if (mentors[i].nivel == 1) {
      if (mentors[i].interest == student_interest[0].interest) {
        count += 25;
      }
      mentors_score.push({ id_mentor: mentors[i].id, interest_score_low: count });
    }
    count = 0;
  }
  return mentors_score;
}
//##########################################################

//################### interes alto #########################
function interests_high(mentors, student_interest) {
  let mentors_score = [];
  let count = 0;
  for (let i = 0; i < mentors.length; i++) {
    if (mentors[i].nivel == 2) {
      if (mentors[i].interest == student_interest[0].interest) {
        count += 25;
      }
      mentors_score.push({ id_mentor: mentors[i].id, interest_score_high: count });
    }
    count = 0;
  }
  return mentors_score;
}
//##########################################################


export const getAllMatchByCohort = async (req,res)=>{

  try {
    const match = await db.query(`SELECT matchs.id, (SELECT mentors.name FROM mentors WHERE mentors.id = matchs.id_mentor) as nombre_mentor, (SELECT estudiantes.name FROM estudiantes WHERE estudiantes.id = matchs.id_estudiante) as nombre_estudiante, matchs.cohort, matchs.id_program, ((matchs.score/60)*100) as match_score FROM matchs WHERE cohort = ${req.param.cohort}`);
    res.json(match[0]);
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
}

export const getMatchById = async (req,res)=>{
  try {
    let studentInMatch = await db.query(`SELECT matchs.id_estudiante FROM matchs WHERE matchs.id_estudiante = ${req.params.id};`)

    if (studentInMatch[0].length != 0) {
      let matchStudent = await db.query(`SELECT matchs.id, (SELECT mentors.name FROM mentors WHERE mentors.id = matchs.id_mentor) as nombre_mentor, (SELECT estudiantes.name FROM estudiantes WHERE estudiantes.id = matchs.id_estudiante) as nombre_estudiante, matchs.cohort, matchs.id_program, ((matchs.score/60)*100) as match_score FROM matchs WHERE matchs.id_estudiante = ${req.params.id};`)
      res.json(matchStudent[0]);
    } else {
      res.json({
        message: `¡El estudiante con el id: ${req.params.id} no tiene mentor asignado!`,
      });
    }
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
}

export const createMatch = async (req, res)=>{
  try{
    await db.query(`INSERT INTO matchs (score, cohort, id_mentor, id_estudiante, id_program) VALUES(${req.body.score}, ${req.body.cohort}, ${req.body.id_mentor}, ${req.body.id_estudiante}, ${req.body.program});`);
    res.json({
      message: "¡Match creado correctamente!",
    });
  }catch(error){
    res.json({ message: error.message });
  }
}