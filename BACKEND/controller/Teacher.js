import Teacher from "../model/Teacher";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

//Teacher Signup API  -post method
export const teacherSignup = async (req, res) => {
  try {
    const addTeacher = new Teacher({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    const result = await addTeacher.save();
    res.send({
      status: true,
      message: " Teacher Registered Successfully",
      result: result,
    });
  } catch (err) {
    console.log(err);
  }
};

// Teacher Login API  -post method
export const teacherLogin = async (req, res) => {
  const { email, password } = req.body;

  const result = await Teacher.findOne({ email });
  if (!result) {
    res.send({
      status: false,
      message: "Invalid Credentials-Email is Incorrect !!!",
    });
  }

  const isValid = bcrypt.compareSync(password, result.password);

  if (isValid) {
    let payload = {};
    payload._id = result._id;
    console.log(result);
    jwt.sign(payload, "SECRET_KEY", { expiresIn: "24h" }, (err, token) => {
      res.send({
        status: true,
        message: "Successfully Login",
        result: token,
      });
    });
  } else {
    res.send({
      status: false,
      message: "Password is incorrect- Please enter correct password",
    });
  }
};
