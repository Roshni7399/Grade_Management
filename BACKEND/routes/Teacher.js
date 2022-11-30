import express from "express";
import { teacherSignup, teacherLogin } from "../controller/Teacher";

const router = express.Router();

router.post("/teacherSignup", teacherSignup);
router.post("/teacherLogin", teacherLogin);

export default router;
