import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadFile } from '../services/upload.service'

export default function AddStudent() {
  const navigate = useNavigate();

  const [show, setShow] = useState("");
  const [img, setImg] = useState();
  const [flag, setFlag] = useState(false)

  const [input, setInput] = useState({
    studentName: "",
    email: "",
    class: 0,
    frontEnd: 0,
    backEnd: 0,
    image: null
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //   For Validations
  const [error, setError] = useState({
    frontEnd: false,
    backEnd: false,
    frontError: "",
    backError: "",
  });


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(input);
    const formdata = new FormData();
    formdata.append('image', input.image);
    formdata.append('studentName', input.studentName);
    formdata.append('email', input.email);
    formdata.append('class', input.class);
    formdata.append('frontEnd', input.frontEnd);
    formdata.append('backEnd', input.backEnd);

    try {
      const apiResponse = await uploadFile(formdata);
      navigate("/dashboard")
      console.log(apiResponse.data.data.path)
      setImg(apiResponse.data.data.path);

      console.log(img)
    }
    catch (e) {
      console.log(e, "error");
    }
  }

  const onFileChange = (e) => {
    console.log(e.target.files[0]);
    setInput((previous) => ({
      ...previous,
      image: e.target.files[0],
    }))
  }

  //   Validation for Frontend Marks
  const frontEndErrorHandler = (mark) => {
    if (mark > 100) {
      setError({
        frontEnd: true,
        frontError: "Enter marks less than 100",
      });
    } else {
      setError({
        frontEnd: false,
        frontError: "",
      });
    }
  };

  //   validation for backend marks
  const backEndErrorHandler = (mark) => {
    if (mark > 100) {
      setError({
        backEnd: true,
        backError: "Enter marks less than 100",
      });
    } else {
      setError({
        backEnd: false,
        backError: "",
      });
    }
  };
  console.log(input)

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-12">
          <div className="form-control">
            <section>
              <h3 className="text-center">Add Student Marks</h3>

              <form action="" method="post" encType="multipart/form-data">
                <label> Student Name </label>
                <input
                  className="form-control"
                  name="studentName"
                  placeholder="Enter your name"
                  onChange={handleChange}
                />

                <label> Email </label>
                <input
                  className="form-control"
                  name="email"
                  placeholder="Enter your email"
                  onChange={handleChange}
                />

                <label>Class</label>
                <input
                  className="form-control"
                  name="class"
                  type="text"
                  placeholder="Enter your Class"
                  onChange={handleChange}
                ></input>

                <label>FrontEnd Marks</label>
                <textarea
                  className="form-control"
                  name="frontEnd"
                  type="text"
                  placeholder="Enter subject 1 marks"
                  onChange={handleChange}
                  onBlur={(e) => frontEndErrorHandler(e.target.value)}
                ></textarea>
                {error.frontEnd && (
                  <span className="text-danger">{error.frontError}</span>
                )}

                <label>BackEnd Marks</label>
                <textarea
                  className="form-control"
                  name="backEnd"
                  type="text"
                  placeholder="Enter subject 2 marks"
                  onChange={handleChange}
                  onBlur={(e) => backEndErrorHandler(e.target.value)}
                ></textarea>
                {error.backEnd && (
                  <span className="text-danger">{error.backError}</span>
                )}
                <br />

                <label >Upload Image</label><br />
                &nbsp; &nbsp; &nbsp; &nbsp;
                <input type="file" name="image" onChange={(e) => onFileChange(e)} /><br /><br />

                <center>
                  <button
                    type="button"
                    class="btn btn-success btn-block mb-4"
                    onClick={handleSubmit}>
                    Submit{" "}
                  </button>
                </center>
                {flag && <span className="text-danger">{show}</span>}
                <br />
              </form>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
