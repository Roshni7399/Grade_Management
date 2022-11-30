import mongoose from "mongoose";

const studentSchema= new mongoose.Schema({

    studentName:{
        type:String,
        require:true
    },
    image:{
        type:Array,
        require:true
    },
    class:{
        type:Number,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    frontEnd:{
        type:Number,
        require:true
    },
    backEnd:{
        type:Number,
        require:true
    },
    avgPercentage:{
        type:String,
        require:false
    },
    grade:{
        type:String,
        require:false
    }

})
const Student = mongoose.model("Student",studentSchema);
export default Student;