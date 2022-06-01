import db from '../db/db.js';
import { getStudentInterestsLow, getOneStudent } from "./StudentController.js"
import { getMentorsMatch, getOneMentor , getMentorsAvailable } from "./MentorController.js"


export const test = async (req, res) => {
  const mentors_interests = await getMentorsMatch();
  const student_i_Low = await getStudentInterestsLow(req.params.id)
  console.log(interests_low(mentors_interests, student_i_Low));
  // console.log(interests_high(mentors_interests, "cyberseguridad"));
  //console.log(age(mentors_interests, 25));
  res.end()
};


//################### interes bajo #########################
function age(mentors, student) {
  const mentors_score = [];
  for (let i = 0; i < mentors.length; i++) {
    
    let age_score = 0;
    
      if (mentors[i].nivel == 1) {
        
        let year_mentor = mentors[i].age;
        
        if (student == year_mentor) {
          age_score = 25;
        } else if (student >= year_mentor - 5 && student <= year_mentor + 5) {
          age_score = 15;
        } else if (student >= year_mentor - 10 && student <= year_mentor + 10) {
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
      if (mentors[i].interest == student_interest) {
        count += 10;
      }
      mentors_score.push({ id_mentor: mentors[i].id, interest_score: count });
    }

    count = 0;
  }
  return mentors_score;
}
//##########################################################
