import express from "express";
import { createActualRole, deleteActualRole, getActualRole, getOneActualRole, updateActualRole } from "../controllers/ActualRoleController.js";
import { createAdmin, deleteAdmin, getAdmin, getOneAdmin, updateAdmin } from "../controllers/AdminController.js";
import { createBusiness, deleteBusiness, getBusiness, getOneBusiness, updateBusiness } from "../controllers/BusinessController.js";
import { createInterests, deleteInterests, getInterests, getOneInterests, updateInterests } from "../controllers/InterestsController.js";

import { createMentor, deleteMentor, getMentor, getOneMentor, updateMentor, getMentorsAvailable, getAllMentors } from "../controllers/MentorController.js";
import { createPrograms, deletePrograms, getOnePrograms, getPrograms, updatePrograms } from "../controllers/ProgramsController.js";
import { createSessions, deleteSessions, getOneSessions, getSessions, updateSessions, getAllSessions } from "../controllers/SessionsController.js";
import { createStudent, deleteStudent, getOneStudent, getStudent, updateStudent, getAllStudents, searchStudent, getMaxCohort } from "../controllers/StudentController.js";
import { createStudies, deleteStudies, getOneStudies, getStudies, updateStudies } from "../controllers/StudiesController.js";
import { createUsers, deleteUsers, getOneUsers, getUsers, updateUsers } from "../controllers/UsersController.js";
import { checkLogin } from "../controllers/LoginController.js";
import { getMatch, getMatchCohort, updateMatch, calculateMatch, updateMatchAutomatic } from "../controllers/MatchController.js";

const router = express.Router();

router.get('/login/:email/:password', checkLogin)

router.get('/match/calculate/:id_student', calculateMatch)
router.get('/match/:cohort/:program', getMatchCohort)
router.get('/matchs', getMatch)
router.put('/match/update/:id_student/:id_mentor', updateMatch)
router.put('/match/confirm', updateMatchAutomatic)

router.get('/admin', getAdmin)
router.get('/admin/:id', getOneAdmin)
router.post('/admin', createAdmin)
router.put('/admin/:id', updateAdmin)
router.delete('/admin/:id', deleteAdmin)

router.get('/all-mentors', getAllMentors)
router.get('/mentors', getMentor)
router.get('/mentor/:id', getOneMentor)
router.post('/mentor', createMentor)
router.put('/mentor/:id', updateMentor)
router.delete('/mentor/:id', deleteMentor)
router.delete('/admin/:id', deleteMentor)
router.get('/mentors-available', getMentorsAvailable)


router.get('/all-sessions', getAllSessions)
router.get('/sessions', getSessions)
router.get('/sessions/:id', getOneSessions)
router.post('/sessions', createSessions)
router.put('/sessions/:id', updateSessions)
router.delete('/sessions/:id', deleteSessions)

router.get('/all-students', getAllStudents)
router.get('/students', getStudent)
router.get('/search-students/:name', searchStudent)
router.get('/student/:id', getOneStudent)
router.get('/students/max-cohort', getMaxCohort)
router.post('/student', createStudent)
router.put('/student/:id', updateStudent)
router.delete('/student/:id', deleteStudent)

router.get('/actual-role', getActualRole)
router.get('/actual-role/:id', getOneActualRole)
router.post('/actual-role', createActualRole)
router.put('/actual-role/:id', updateActualRole)
router.delete('/actual-role/:id', deleteActualRole)

router.get('/business', getBusiness)
router.get('/business/:id', getOneBusiness)
router.post('/business', createBusiness)
router.put('/business/:id', updateBusiness)
router.delete('/business/:id', deleteBusiness)

router.get('/interests', getInterests)
router.get('/interests/:id', getOneInterests)
router.post('/interests', createInterests)
router.put('/interests/:id', updateInterests)
router.delete('/interests/:id', deleteInterests)

router.get('/programs', getPrograms)
router.get('/programs/:id', getOnePrograms)
router.post('/programs', createPrograms)
router.put('/programs/:id', updatePrograms)
router.delete('/programs/:id', deletePrograms)

router.get('/studies', getStudies)
router.get('/studies/:id', getOneStudies)
router.post('/studies', createStudies)
router.put('/studies/:id', updateStudies)
router.delete('/studies/:id', deleteStudies)

router.get('/users', getUsers)
router.get('/users/:id', getOneUsers)
router.post('/users', createUsers)
router.put('/users/:id', updateUsers)
router.delete('/users/:id', deleteUsers)


export default router
