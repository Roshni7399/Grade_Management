import { teacherLogin } from "../services/auth.service";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { userlogin } from "../slice/authSlice";
import { useNavigate } from "react-router";

export default function Login() {
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await teacherLogin(input);
            if (response.data.status) {
                // action dispatch
                dispatch(userlogin(response.data));
                navigate("/dashboard")

            }
        } catch (e) {
            console.warn(e);
        }


    }

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <form className="form-control"
                        onSubmit={(e) => handleSubmit(e)}>
                        
                        <h3>Login Form</h3>

                        <br />

                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-4">
                                    <label>Email</label>
                                </div>

                                <div className="col-md-8">
                                    <input type="email"
                                        className="form-control"
                                        onChange={handleChange}
                                        name="email"
                                     />
                                </div>
                            </div>

                            <br />

                            <div className="row">
                                <div className="col-md-4">
                                    <label>Password</label>
                                </div>

                                <div className="col-md-8">
                                    <input type="password"
                                        className="form-control"
                                        onChange={handleChange}
                                        name="password" />
                                </div>
                            </div>
                            <br />

                            <div className="row">
                                <div>
                                    <center>
                                        <button type="submit"
                                            class="btn btn-dark" >Login</button>
                                        </center>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}
