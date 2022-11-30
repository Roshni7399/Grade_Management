import express from "express";
import {
  studentSignup,
  getStudentsList,
  deleteStudent,
  getStudentsById,
  updateStudent,
} from "../controller/Student";
import { SendEmail } from "../middleware/Sendmail";
import { CheckMail } from "../middleware/CheckMail";
import { upload } from "../middleware/uploadFile";

const router = express.Router();

router.post("/studentSignup", SendEmail, upload.single("image"), studentSignup);
router.get("/getStudentsList", getStudentsList);
router.post("/deleteStudent", deleteStudent);
router.get("/getStudentsById", getStudentsById);
router.put("/updateStudent", upload.single("image"), updateStudent);

export default router;
