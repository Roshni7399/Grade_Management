import axios from 'axios';

export const uploadFile = async(formData) => {
    return axios.post("http://localhost:8080/student/studentSignup",
    formData,
    {}
    )

}