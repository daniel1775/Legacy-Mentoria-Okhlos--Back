import db from '../db/db.js';
import { getStudentInterests, getOneStudent } from "./StudentController.js"
import { getMentorsMatch, getOneMentor , getMentorsAvailable } from "./MentorController.js"

export const testinfo = async (req,res) => {
  let mentorInfo = await getMentorsMatch()
  console.log(age(mentorInfo, 25))
}

function age(mentors, student){
  let mentors_score = mentors.map(element => {
    let age_score = 0;
    let year_mentor = element.age;
    if(student == year_mentor){
      age_score = 25;
    }else if(student>=year_mentor-5 && student<=year_mentor+5){
      age_score = 15;
    }else if(student>=year_mentor-10 && student<=year_mentor+10){
      age_score = 5;
    }
    return({
      id_mentor: element.id,
      age_score: age_score
    })
  });
  return(mentors_score)
}




