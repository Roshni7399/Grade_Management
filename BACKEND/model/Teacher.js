import mongoose from "mongoose";

const TeacherSchema= new mongoose.Schema({

    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }

})
const Teacher = mongoose.model("Teacher",TeacherSchema);
export default Teacher;