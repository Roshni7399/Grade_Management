import React from 'react'
import { useState , useEffect } from 'react';
import { useParams , useNavigate} from 'react-router-dom';
import {updateStudent , getStudentsById} from '../services/auth.service'

export default function EditForm() {
    let { id } = useParams();
    console.log(id);
    const navigate = useNavigate();

  const [input, setInput] = useState({
    studentName: "",
    email: "",
    class: "",
    frontEnd: "",
    backEnd: "",
    image: null
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInput((previousValue) => ({
        ...previousValue,
        [name]: value
    }));

};

useEffect(() => {
  const test = async (id) => {
      const response = await getStudentsById(id);
      setInput(response.data.result)
      console.log(response)
  }
  test(id.id);
},[]);

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Run update code here");
  const updateResponse = await updateStudent(input,id);
  if (updateResponse.data.status) {
      navigate("/dashboard");
  } else {
      alert("update failed");
  }
  console.log(updateResponse);

}

console.log(input)

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-12">
          <div className="form-control">
            <section>
              <h3 className="text-center">Update Student Marks</h3>

              <form action="" method="post" encType="multipart/form-data" >
                <label> Student Name </label>
                <input
                  className="form-control"
                  name="studentName"
                  defaultValue={input.studentName}
                  placeholder="Enter your name"
                  onChange={handleChange}/>

                <label> Email </label>
                <input
                  className="form-control"
                  name="email"
                  value={input.email}
                  placeholder="Enter your email"
                  onChange={handleChange}/>

                <label>Class</label>
                <input
                  className="form-control"
                  name="class"
                  type="text"
                  value={input.class}
                  placeholder="Enter your Class"
                  onChange={handleChange}></input>

                <label>FrontEnd Marks</label>
                <input
                  className="form-control"
                  name="frontEnd"
                  type="text"
                  value={input.frontEnd}
                  placeholder="Enter subject 1 marks"
                  onChange={handleChange}></input>
      
                <label>BackEnd Marks</label>
                <input
                  className="form-control"
                  name="backEnd"
                  type="text"
                  value={input.backEnd}
                  placeholder="Enter subject 2 marks"
                  onChange={handleChange}></input> <br />

                <label>Upload Image</label><br/>
                             &nbsp; &nbsp; &nbsp; &nbsp; 
                            <input type="file" name="image"  /><br/><br/>

                <center>
                <button
                  type="button"
                  class="btn btn-success btn-block mb-4" onSubmit={(e) => handleSubmit(e)}>
                  Update
                </button></center>
                <br />
              </form>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
