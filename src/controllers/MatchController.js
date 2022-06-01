import { getStudentInterestsLow,getStudentInterestsHigh, getAgeStudent } from "./StudentController.js"
import { getMentorsMatch, getMentorsAvailable } from "./MentorController.js"
import db from "../db/db.js";

export const testMatch = async (req, res) => {
  const id_student = req.params.id;
  const mentors_interests = await getMentorsMatch();
  const student_i_Low = await getStudentInterestsLow(id_student)
  const student_i_High = await getStudentInterestsHigh(id_student)
  const student_age = await getAgeStudent(id_student)

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

  let studenName = await db.query(`SELECT estudiantes.name FROM estudiantes WHERE estudiantes.id = ${id_student};`)

  let mentorsName = await db.query(`SELECT mentors.name FROM mentors WHERE mentors.id = ${max_mentor.id};`)

  let data = []

  data.push({
    mentorId: max_mentor.id,
    mentorScore: (max_mentor.total_score/60)*100,
    idStudent: id_student,
    nameStudent: studenName[0][0].name,
    nameMentor: mentorsName[0][0].name,
    porcentajeScoreIlow: porcentajeScoreIlow,
    porcentajeScoreIHigh: porcentajeScoreIHigh,
    porcentajeScoreAge: porcentajeScoreAge
  })
  res.json(data[0])
  res.end()
};

export const matchMassive = async (req,res)=>{
  const mentors_interests = await getMentorsMatch();
  const students = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40]
  let data = []
  for (let i = 0; i < students.length; i++) {
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
      mentorId: max_mentor.id,
      mentorScore: (max_mentor.total_score/60)*100,
      idStudent: students[i],
      nameStudent: studenName[0][0].name,
      nameMentor: mentorsName[0][0].name,
      porcentajeScoreIlow: porcentajeScoreIlow,
      porcentajeScoreIHigh: porcentajeScoreIHigh,
      porcentajeScoreAge: porcentajeScoreAge
    })    
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
