import { getStudentInterestsLow,getStudentInterestsHigh, getAgeStudent } from "./StudentController.js"
import { getMentorsMatch, getMentorsAvailable } from "./MentorController.js"

export const testMatch = async (req, res) => {
  const id_student = req.params.id;
  const mentorAvailable = await getMentorsAvailable();
  const mentors_interests = await getMentorsMatch();
  const student_i_Low = await getStudentInterestsLow(id_student)
  const student_i_High = await getStudentInterestsHigh(id_student)
  const student_age = await getAgeStudent(id_student)

  let mentors_total = [];
  let mentors_age = [];
  // saved the 2 mentor's interests without add
  let mentorsInterestUnprocessed = [];
  mentorsInterestUnprocessed.push(interests_low(mentors_interests,student_i_Low))
  mentorsInterestUnprocessed.push(interests_high(mentors_interests,student_i_High))

  let mentorsAgeUnprocessed = [];
  mentorsAgeUnprocessed.push(age(mentors_interests,student_age))

  mentorsAgeUnprocessed = mentorsAgeUnprocessed[0]

  for (let i = 0; i < mentorsInterestUnprocessed[0].length; i++) {
    mentors_total.push({
      id: mentorsInterestUnprocessed[0][i].id_mentor,
      total_score: mentorsInterestUnprocessed[0][i].interest_score_low + mentorsInterestUnprocessed[1][i].interest_score_high
    })
  }

  let max_mentor = mentors_total[0];
  for (let i = 1; i < mentors_total.length; i++) {
    if(max_mentor.total_score < mentors_total[i].total_score){
      max_mentor = mentors_total[i];
    }
  }



  console.log(mentorsInterestUnprocessed)
  console.log(mentors_total)
  console.log(max_mentor.id)

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
        count += 10;
      }
      mentors_score.push({ id_mentor: mentors[i].id, interest_score_high: count });
    }
    count = 0;
  }
  return mentors_score;
}
//##########################################################
