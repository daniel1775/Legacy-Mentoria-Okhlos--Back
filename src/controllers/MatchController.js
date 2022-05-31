import {getAllMentors} from '../controllers/MentorController.js'

export const testinfo = async (req,res) => {
  let mentorInfo = await getAllMentors()
  console.log(mentorInfo);
}

// function interests(mentors, student_interest) {
//   let mentors_score = [];
//   let count = 0;
//   let k = 0;
//   let bonus = 0;
//   for(let i=0; i<mentors.length; i++){
//     for(let j=0 ; j<3 ; j++){
//       if(mentors[k].interest == student_interest){
//         count+=10;
//         bonus++; 
//       }
//       if(bonus===3){
//         count+=25;
//       }
//       k++;
//     }
//     mentors_score.push({
//       id_mentor: mentors[k-1].id_mentor, 
//       interest_score: count
//     });

//     i = k - 1;
    
//     count = 0;
//     bonus = 0;
//   }

//   return mentors_score;
// }

// function year(mentors, year_student){
//   let mentors_score = mentors.map(element => {
//     let age_score = 0;
//     let year_mentor = parseInt(element.year);
//     if(year_student == year_mentor){
//       age_score = 25;
//     }else if(year_student>=year_mentor-5 && year_student<=year_mentor+5){
//       age_score = 15;
//     }else if(year_student>=year_mentor-10 && year_student<=year_mentor+10){
//       age_score = 5;
//     }
//     return({
//       id_mentor: element.id_mentor,
//       age_score: age_score
//     })
//   });
  
//   return(mentors_score)
// }

