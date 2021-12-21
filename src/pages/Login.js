import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import axios from "axios";
import {HOST_URL, LOGIN_MESSAGE} from "../common/constants";

const Login = ({message}) => {
    let history = useHistory();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);
    const [errMessage, setErrMessage] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            username: username,
            password: password
        }
        axios.post(`${HOST_URL}/authenticate`, data)
            .then(res => {
                if (res.status === 200) {
                    setRedirect(true);
                    localStorage.setItem('TOKEN', res.data.jwttoken);
                }
            })
            .catch(err => {
                setErrMessage(err.message)
            })
    }
    if (redirect) window.location.reload(history.push("/"));

    return (
        <section>
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form onSubmit={handleSubmit}>
                            <h1 className="h3 mb-3 fw-normal">{message ? message : LOGIN_MESSAGE.REQUIRED}</h1>
                            <div className="form-outline mb-4 form-floating">
                                <input type="text" id="form3Example3" className="form-control form-control-lg"
                                       placeholder="Enter your username" required
                                       onChange={u => setUsername(u.target.value)}
                                />
                                <label className="form-label" htmlFor="form3Example3">Username</label>
                            </div>
                            <div className="form-outline mb-3 form-floating">
                                <input type="password" id="form3Example4" className="form-control form-control-lg"
                                       placeholder="Enter password" required
                                       onChange={p => setPassword(p.target.value)}
                                />
                                <label className="form-label" htmlFor="form3Example4">Password</label>
                            </div>
                            {errMessage && <p style={{color:"#CF2338"}}>{LOGIN_MESSAGE.FAILED}</p>}
                            <div className="text-center text-lg-start mt-4 pt-2">
                                <button type="submit" disabled={!username || !password} className="btn btn-primary btn-lg"
                                        style={{paddingLeft: "2.5rem", paddingRight: "2.5rem"}}>Sign in
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                        <img src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-login-form/draw2.png"
                             className="img-fluid"
                             alt="Sample image"/>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;