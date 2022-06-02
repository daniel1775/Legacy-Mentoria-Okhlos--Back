import express from "express";
import { createActualRole, deleteActualRole, getActualRole, getOneActualRole, updateActualRole } from "../controllers/ActualRoleController.js";
import { createAdmin, deleteAdmin, getAdmin, getOneAdmin, updateAdmin } from "../controllers/AdminController.js";
import { createBusiness, deleteBusiness, getBusiness, getOneBusiness, updateBusiness } from "../controllers/BusinessController.js";
import { createInterests, deleteInterests, getInterests, getOneInterests, updateInterests } from "../controllers/InterestsController.js";

import { createMentor, deleteMentor, getMentor, getOneMentor, updateMentor, getAllMentors, mentorStatus, getMentorsAvailable, mentor_assigned, getMentorsMatch } from "../controllers/MentorController.js";

import { createPrograms, deletePrograms, getOnePrograms, getPrograms, updatePrograms } from "../controllers/ProgramsController.js";
import { createSessions, deleteSessions, getOneSessions, getSessions, updateSessions, getAllSessions } from "../controllers/SessionsController.js";
import { createStudent, deleteStudent, getOneStudent, getStudent, updateStudent, getAllStudents, searchStudent, getMaxCohort, getStudentsAvailable,toggleStatusStudent,student_assigned, getStudentInterestsLow, getCohorte, getStudentsByCohort, getStudentInterestsHigh } from "../controllers/StudentController.js";
import { createStudies, deleteStudies, getOneStudies, getStudies, updateStudies } from "../controllers/StudiesController.js";
import { createUsers, deleteUsers, getOneUsers, getUsers, register, updateUsers } from "../controllers/UsersController.js";
import { authController, checkLogin } from "../controllers/LoginController.js";
// import { getMatch, getMatchCohort, updateMatch, calculateMatch, updateMatchAutomatic, createMatch } from "../controllers/MatchController.js";

//middelwares
import { isAuth } from "../middelwares/auth.js";
import { loginP } from "../controllers/PruebaLogin.js";
import {matchMassive, testMatch} from "../controllers/MatchController.js";


import { getUserMentor, createUserMentor } from "../controllers/UserMentorsController.js"
import {massiveDataStudent ,getUserStudent} from '../controllers/testMassive.js'



const router = express.Router();

//########## Login sin JWT y datos por el headers ###########
router.get('/login/:email/:password', checkLogin)
//########## Login con JWT y datos por el body ###########
router.post('/login2', loginP)

// router.get('/match/calculate/:id_student', calculateMatch)
// router.get('/match/:cohort/:program', getMatchCohort)
// router.get('/matchs', getMatch)
// router.put('/match/update/:id_student/:id_mentor', updateMatch)
// router.put('/match/confirm', updateMatchAutomatic)
// router.post('/match/create', createMatch)

router.get('/admin', getAdmin) //funciona
router.get('/admin/:id', getOneAdmin) //funciona
router.post('/admin', createAdmin)  // funciona
router.put('/admin/:id', updateAdmin) //funciona
router.delete('/admin/:id', deleteAdmin) //funciona


router.get('/all-mentors', getAllMentors) //funciona
router.get('/mentors', getMentor) //funciona
router.get('/mentor/:id', getOneMentor) //funciona
router.post('/mentor', createMentor) //funciona
router.put('/mentor/:id', updateMentor) //funciona
router.delete('/mentor/:id', deleteMentor) //funciona
router.put('/mentorStatus/:id', mentorStatus )// funciona
router.get('/mentors/available', getMentorsAvailable) //funciona
router.get("/mentorAssigned",mentor_assigned)//funciona

router.get('/all-sessions', getAllSessions) //funciona
router.get('/sessions', getSessions) //funciona
router.get('/sessions/:id', getOneSessions) //funciona
router.post('/sessions', createSessions) //funciona
router.put('/sessions/:id', updateSessions) //funciona
router.delete('/sessions/:id', deleteSessions) //funciona


//################# StudentController ##################

router.get('/students', getStudent)//funciona
router.get('/all-students', getAllStudents) //funciona
router.get('/students/max-cohort', getMaxCohort)//funciona
router.get('/search-students/:name', searchStudent)//funciona
router.get('/student/:id', getOneStudent) //funciona
router.get('/cohorte', getCohorte) //funciona
router.get('/students/cohort/:cohort', getStudentsByCohort) //funciona

router.post('/student', createStudent)//funciona
router.put('/student/update/:id', updateStudent)//funciona
router.put('/studentOff/:id', toggleStatusStudent )//Funciona
router.delete('/student/:id', deleteStudent)//funciona
router.get('/students/available', getStudentsAvailable)//funciona
router.get('/students/assigned', student_assigned) //funciona


//######################################################


router.get('/cargo', getActualRole) //funciona
router.get('/cargo/:id', getOneActualRole) //funciona
router.post('/cargo', createActualRole) //funciona
router.put('/cargo/:id', updateActualRole) //funciona
router.delete('/cargo/:id', deleteActualRole) //funciona



router.get('/business', getBusiness) //funciona
router.get('/business/:id', getOneBusiness) //funciona
router.post('/business', createBusiness) // funciona
router.put('/business/:id', updateBusiness) // funciona
router.delete('/business/:id', deleteBusiness) //funciona

router.get('/interests', getInterests) //funciona
router.get('/interests/:id', getOneInterests) //funciona
router.post('/interests', createInterests) //funciona
router.put('/interests/:id', updateInterests) //funciona
router.delete('/interests/:id', deleteInterests) //funciona

router.get('/programs', getPrograms) //funciona
router.get('/programs/:id', getOnePrograms) //funciona
router.post('/programs', createPrograms) //funciona
router.put('/programs/:id', updatePrograms) //funciona
router.delete('/programs/:id', deletePrograms) //funciona

router.get('/studies', getStudies) //funciona
router.get('/studies/:id', getOneStudies) //funciona
router.post('/studies', createStudies) //funciona
router.put('/studies/:id', updateStudies) //funciona
router.delete('/studies/:id', deleteStudies) //funciona

router.get('/users', getUsers) //funciona
router.get('/users/:id', getOneUsers) //funciona
router.post('/users', createUsers) //funciona
//################## contraseña encr#######
router.post('/users/register', register)
//#########################################
router.put('/users/:id', updateUsers) //funciona
router.delete('/users/:id', deleteUsers) //funciona

router.get('/user/student', getUserStudent) //funcionaa
router.post('/StudentMasiva',massiveDataStudent) //funciona

router.get('/user/mentor',getUserMentor) //funciona
router.post('/MentorMasiva',createUserMentor)

//################## Pruebas macht #########################
router.get('/prueba/match/:id',testMatch) //funcionaa+
router.post('/MatchMassive',matchMassive) //funcionaa+
router.get('/studentInterestLow/:id',getStudentInterestsLow) //funciona
router.get('/studentInterestHigh/:id',getStudentInterestsHigh) //funciona
//#########################################



export default router
