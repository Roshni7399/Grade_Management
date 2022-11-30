import axios from "axios";

let axiosConfig = {
    headers:{
        'Content-Type' : 'application/json',
    }
}
const API_URL = "http://localhost:8080/";

//Teacher Login Integration
export const teacherLogin = async ({email,password}) => {
    try{
        const response =  await axios.post (API_URL + "teacher/teacherLogin",{
            email,
            password
                },axiosConfig)
                if(response.data.status === true){
                    localStorage.setItem('users',JSON.stringify(response.data));
                    
                    return response   
                }else{
                    return response;
                }
    }catch(e){
            return null;
    }
}

//Delete Student 
export const deleteStudent = async (_id) => {
    return axios.post(
      API_URL + "student/deleteStudent",{
          _id
      },
      
      axiosConfig
    );
    // console.log(id);
  
  };

//Student List
export const getStudentsList = async () => {
    return axios.get(
      API_URL + "student/getStudentsList",
  
      axiosConfig
    );
  };

//Add Students
export const studentSignup = async (studentName, email,classs,frontEnd, backEnd) => {
    return await axios.post(API_URL + "student/studentSignup",{
        studentName,
        frontEnd,
        backEnd,
        email,
        class: classs,
      },
      axiosConfig
    );
    // console.log(studentName)
    // console.log(email)
    // console.log(classs)
    // console.log(frontEnd)
    // console.log(backEnd)
  };  
  
//Update Student
export const updateStudent = async (
        _id,
        studentName,
        classs,
        frontEnd,
        backEnd,
        email
  ) => {
    return axios.put(
      API_URL + "student/updateStudent",
      {
        _id,
        studentName,
        frontEnd,
        backEnd,
        email,
        class: classs,
      },
      axiosConfig
    );
    // console.log(studentName)
    // console.log(email)
    // console.log(classs)
    // console.log(frontEnd)
    // console.log(backEnd)
    // console.log(_id)
  };

//Get details by ID 
  export const getStudentsById = async (_id) => {
    return axios.post(
      API_URL + "student/getStudentsById",
      {
       _id
      },
      axiosConfig
    );
  
    // console.log(_id);
  
  };
