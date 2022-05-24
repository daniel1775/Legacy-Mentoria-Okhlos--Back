import express from "express";
import { createActualRole, deleteActualRole, getActualRole, getOneActualRole, updateActualRole } from "../controllers/ActualRoleController.js";
import { createAdmin, deleteAdmin, getAdmin, getOneAdmin, updateAdmin } from "../controllers/AdminController.js";
import { createBusiness, deleteBusiness, getBusiness, getOneBusiness, updateBusiness } from "../controllers/BusinessController.js";
import { createInterests, deleteInterests, getInterests, getOneInterests, updateInterests } from "../controllers/InterestsController.js";

import { createMentor, deleteMentor, getMentor, getOneMentor, updateMentor, getAllMentors } from "../controllers/MentorController.js";

import { createPrograms, deletePrograms, getOnePrograms, getPrograms, updatePrograms } from "../controllers/ProgramsController.js";
import { createSessions, deleteSessions, getOneSessions, getSessions, updateSessions, getAllSessions } from "../controllers/SessionsController.js";
import { createStudent, deleteStudent, getOneStudent, getStudent, updateStudent, getAllStudents, searchStudent, getMaxCohort, getStudentsAvailable,studentOff } from "../controllers/StudentController.js";
import { createStudies, deleteStudies, getOneStudies, getStudies, updateStudies } from "../controllers/StudiesController.js";
import { createUsers, deleteUsers, getOneUsers, getUsers, register, updateUsers } from "../controllers/UsersController.js";
import { authController, checkLogin } from "../controllers/LoginController.js";
// import { getMatch, getMatchCohort, updateMatch, calculateMatch, updateMatchAutomatic, createMatch } from "../controllers/MatchController.js";
import { createUserStudent, deleteAllUserStudent, getUserStudent } from "../controllers/userStudentsController.js";

//middelwares
import { isAuth } from "../middelwares/auth.js";
import { loginP } from "../controllers/PruebaLogin.js";


import {getUserMentor} from "../controllers/UserMentorsController.js"

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

//revisar 
router.get('/all-mentors', getAllMentors) //funciona
router.get('/mentors', getMentor) //funciona
router.get('/mentor/:id', getOneMentor) //funciona
router.post('/mentor', createMentor) //funciona
router.put('/mentor/:id', updateMentor) //funciona
router.delete('/mentor/:id', deleteMentor) //funciona
// router.get('/mentors/available', getMentorsAvailable)

router.get('/all-sessions', getAllSessions) //funciona
router.get('/sessions', getSessions) //funciona
router.get('/sessions/:id', getOneSessions) //funciona
router.post('/sessions', createSessions) //funciona
router.put('/sessions/:id', updateSessions) //funciona
router.delete('/sessions/:id', deleteSessions) //funciona

//revisar
router.get('/all-students', getAllStudents) //funciona
router.get('/students', getStudent)
router.get('/search-students/:name', searchStudent)
router.get('/student/:id', getOneStudent) //funciona
router.get('/students/max-cohort', getMaxCohort)
router.post('/student', createStudent)
router.put('/student/:id', updateStudent)
router.put('/studentOff/:id', studentOff )
router.delete('/student/:id', deleteStudent)
router.get('/students/available', getStudentsAvailable)//funciona

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
router.put('/users/:id', updateUsers) //funciona
router.delete('/users/:id', deleteUsers) //funciona

router.get('/user/student', getUserStudent) //funcionaa
router.post('/create/userStudent', createUserStudent) //funciona
router.delete('/delete/userStudent', deleteAllUserStudent) //funciona

router.get('user/mentor',getUserMentor)

export default router
