import express from "express";
import { getAdmin } from "../controllers/AdminController.js";
import { getMentor } from "../controllers/MentorController.js";
import { getSessions } from "../controllers/SessionsController.js";
import { getStudent } from "../controllers/StudentController.js";

const router = express.Router();

router.get('/admin', getAdmin)
router.get('/mentor', getMentor)
router.get('/sessions', getSessions)
router.get('/student', getStudent)

export default router

