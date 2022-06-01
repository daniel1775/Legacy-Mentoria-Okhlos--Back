import db from '../db/db.js';
import { getStudentInterestsLow, getOneStudent, getStudentInterestsHigh, getAgeStudent } from "./StudentController.js"
import { getMentorsMatch, getOneMentor , getMentorsAvailable } from "./MentorController.js"


export const test = async (req, res) => {
  const mentors_interests = await getMentorsMatch();
  // const student_i_Low = await getStudentInterestsLow(req.params.id)
  // const student_i_High = await getStudentInterestsHigh(req.params.id)
  const student_i_age = await getAgeStudent(req.params.id)
  //console.log(interests_high(mentors_interests, student_i_High));
  // console.log(interests_high(mentors_interests, "cyberseguridad"));

  console.log(age(mentors_interests, student_i_age));
  res.end()
};


//################### interes edad #########################
function age(mentors, student) {
  const mentors_score = [];
  for (let i = 0; i < mentors.length; i++) {
    
    let age_score = 0;
    
      if (mentors[i].nivel == 1) {
        
        let year_mentor = mentors[i].age;
        let age_student = student[0].age;
        if (age_student == year_mentor) {
          age_score = 25;
        } else if (age_student >= year_mentor - 5 && age_student <= year_mentor + 5) {
          age_score = 15;
        } else if (age_student >= year_mentor - 10 && age_student <= year_mentor + 10) {
          age_score = 5;
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
        count += 10;
      }
      mentors_score.push({ id_mentor: mentors[i].id, interest_score: count });
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
        count += 10;
      }
      mentors_score.push({ id_mentor: mentors[i].id, interest_score: count });
    }

    count = 0;
  }
  return mentors_score;
}
//##########################################################
