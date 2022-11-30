import mongoose from "mongoose";
import Student from "../model/Student";
import { SendEmail } from "../middleware/Sendmail";

// Student Signup -post [send Email , calculate % and also give conditions for Grade]
export const studentSignup = async (req, res) => {
  try {
    // Percentage(%) calculation
    const total = parseInt(req.body.frontEnd) + parseInt(req.body.backEnd);
    const percentage = (total / 200) * 100;

    // Conditions to assign Grades
    let grade;

    if (percentage >= 90) {
      grade = "A+";
    } else if ((percentage <= 89) & (percentage >= 80)) {
      grade = "A";
    } else if ((percentage <= 79) & (percentage >= 70)) {
      grade = "B+";
    } else if ((percentage <= 69) & (percentage >= 50)) {
      grade = "B";
    } else if ((percentage <= 49) & (percentage >= 49)) {
      grade = "C";
    } else if (percentage < 35) {
      grade = "FAIL :( ";
    }

    const addStudent = new Student({
      studentName: req.body.studentName,
      class: req.body.classs,
      frontEnd: req.body.frontEnd,
      image: req.file.filename,
      backEnd: req.body.backEnd,
      email: req.body.email,
      avgPercentage: percentage + "%",
      grade: grade,
    });

    const result = await addStudent.save();
    if (result) {
      res.send({
        status: true,
        message: "Student Registered Successfully",
        result: result,
      });

      // Send Email after succefully registration
      SendEmail(
        "roshnimanmode07@gmail.com",
        req.body.email,
        `Hello ${result.studentName}`,
        `Welcome to the Grade Management Portal !!!
            Class : ${result.classs}
            Frontend Marks : ${result.frontEnd}
            BackEnd Marks : ${result.backEnd}
            Average Percentage : ${result.avgPercentage}
            Grade : ${result.grade}`
      );
    }
  } catch (err) {
    console.log(err);
  }
};

// Get Students List -get
export const getStudentsList = async (req, res) => {
  const result = await Student.find();

  // to take path of image to display on frontend (image upload frontend)
  for (let key in result) {
    result[key].image = `http://localhost:8080/uploads/${result[key].image}`;
  }
  console.log(result);

  if (result) {
    res.send({
      status: true,
      message: "Successfully getting list of all students",
      result: result,
    });
  }
};

// Delete API -post
export const deleteStudent = async (req, res) => {
  const deleteStude = await Student.deleteOne({
    _id: mongoose.Types.ObjectId(req.body._id),
  });

  res.send({
    status: true,
    message: "Deleted Successfully",
  });
};

// Get student data by ID
export const getStudentsById = async (req, res) => {
  const result = await Student.findOne({
    _id: mongoose.Types.ObjectId(req.body._id),
  });
  console.log(result);

  if (result) {
    res.send({
      status: true,
      message: "Getting data successfully by ID",
      result: result,
    });
  }
};

// Update Student Data
export const updateStudent = async (req, res) => {
  try {
    let total = parseInt(req.body.frontEnd) + parseInt(req.body.backEnd);
    let percentage = (total / 200) * 100;

    let grade;

    if (percentage >= 90) {
      grade = "A++";
    } else if ((percentage <= 89) & (percentage >= 80)) {
      grade = "A+";
    } else if ((percentage <= 79) & (percentage >= 70)) {
      grade = "B+";
    } else if ((percentage <= 69) & (percentage >= 50)) {
      grade = "B";
    } else if ((percentage <= 49) & (percentage >= 49)) {
      grade = "C";
    } else if (percentage < 35) {
      grade = "FAIL";
    }

    let data = {};

    if (req.body.studentName) {
      data.studentName = req.body.studentName;
    }
    if (req.file.filename) {
      data.image = req.file.filename;
    }
    if (req.body.classs) {
      data.classs = req.body.classs;
    }
    if (req.body.frontEnd) {
      data.frontEnd = req.body.frontEnd;
    }
    if (req.body.backEnd) {
      data.backEnd = req.body.backEnd;
    }
    if (req.body.email) {
      data.email = req.body.email;
    }
    if (percentage) {
      data.avgPercentage = percentage + "%";
    }
    if (grade) {
      data.grade = grade;
    }

    const result = await Student.updateOne(
      { _id: mongoose.Types.ObjectId(req.body._id) },
      { $set: data },
      { new: true }
    );

    const updated = await Student.findOne({
      _id: mongoose.Types.ObjectId(req.body._id),
    });

    if (!result) {
      res.send({
        status: false,
        statusCode: 400,
        message: "Updation Failed",
      });
    } else {
      res.send({
        status: true,
        statusCode: 200,
        message: "Successfully Updated",
        result: result,
      });
      SendEmail(
        "roshnimanmode07@gmail.com",
        req.body.email,
        // `Heyyy ${updated.studentName}`,
        // `Marks are updated!!
        //     Class : ${updated.class}
        //     Frontend Marks : ${updated.frontEnd}
        //     BackEnd Marks : ${updated.backEnd}
        //     Average Percentage : ${updated.avgPercentage}
        //     Grade : ${updated.grade}`
        "Heyy",
        "Congrats you are successfully updated the details"
      );
    }
  } catch (e) {
    console.log(e);
  }
};
