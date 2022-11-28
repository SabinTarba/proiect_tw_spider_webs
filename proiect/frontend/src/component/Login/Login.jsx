import { useState } from 'react';
import './login.css';
import PROFESSOR_SERVICE from '../../services/PROFESSOR_SERVICE.js';
import STUDENT_SERVICE from '../../services/STUDENT_SERVICE.js'
import Alert from './Alert';
import { getLoggedUser, saveLoggedUser } from '../../utils/auth.js';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


const PROFESSOR_ACCOUNT = 1;
const STUDENT_ACCOUNT = 2;


const DENIED_RESPONSE = "DENIED";
const ACCEPTED_RESPONSE = "ACCEPTED";


const Login = () => {

    const [loginRequest, setLoginRequest] = useState({
        email: null,
        password: null
    });
    const [account, setAccount] = useState(null);
    const [displayErrorAlert, setDisplayErrorAlert] = useState(false);
    const [displayInfoAlert, setDisplayInfoAlert] = useState(false);

    const navigate = useNavigate();


    useEffect(() => {
        const loggedUser = getLoggedUser();
        if (loggedUser) navigate('/dashboard');
    }, [navigate])

    const handleFormSubmit = (e) => {

        e.preventDefault();

        if (loginRequest.email !== null && loginRequest.password !== null) {
            if (account === PROFESSOR_ACCOUNT) {

                PROFESSOR_SERVICE.sendAuthRequest(loginRequest).then((res) => {
                    if (res.status === 200) {
                        if (res.data.authResponse === DENIED_RESPONSE)
                            setDisplayErrorAlert(true);
                        else if (res.data.authResponse === ACCEPTED_RESPONSE) {
                            // PROFESSOR autentificat cu succes


                            const user = res.data.user;
                            user.type = PROFESSOR_ACCOUNT;

                            saveLoggedUser(user);
                            navigate('/dashboard');
                        }
                    }
                })
            }
            else {
                STUDENT_SERVICE.sendAuthRequest(loginRequest).then((res) => {
                    if (res.status === 200) {
                        if (res.data.authResponse === DENIED_RESPONSE)
                            setDisplayErrorAlert(true);
                        else if (res.data.authResponse === ACCEPTED_RESPONSE) {
                            // STUDENT autentificat cu succes

                            const user = res.data.user;
                            user.type = STUDENT_ACCOUNT;

                            saveLoggedUser(user);
                            navigate('/dashboard');
                        }
                    }
                })
            }

        }
        else {
            setDisplayInfoAlert(true);
        }

    }


    return (

        <div className="limiter">
            <div className="container-login">
                <div className="wrap-login">
                    <form className="login-form">
                        <span className="login-form-title">Login here</span>

                        <div className="wrap-input">
                            <span className="label-input">E-mail</span>
                            <input
                                className="input100"
                                type="text"
                                name="email"
                                placeholder="Type your e-mail"
                                onChange={(e) => setLoginRequest({ ...loginRequest, email: e.target.value })}
                                onFocus={() => { setDisplayErrorAlert(false); setDisplayInfoAlert(false) }} />

                        </div>

                        <div className="wrap-input">
                            <span className="label-input">Password</span>
                            <input
                                className="input100"
                                type="password"
                                name="pass"
                                placeholder="Type your password"
                                onChange={(e) => setLoginRequest({ ...loginRequest, password: e.target.value })}
                                onFocus={() => { setDisplayErrorAlert(false); setDisplayInfoAlert(false) }}
                            />

                        </div>

                        <div className="wrap-input">
                            <span className="label-input">User type</span><br />
                            <div className="radio-group">
                                <input
                                    className="radio-input"
                                    id="RB_1"
                                    type="radio"
                                    name="options"
                                    onChange={() => setAccount(PROFESSOR_ACCOUNT)} />
                                <label className="radio-label" htmlFor="RB_1"> Professor </label>

                                <input className="radio-input"
                                    id="RB_2"
                                    type="radio"
                                    name="options"
                                    onChange={() => setAccount(STUDENT_ACCOUNT)} />
                                <label className="radio-label" htmlFor="RB_2"> Student </label>
                            </div>
                        </div>

                        <div className="container-login-form-btn">
                            <div className="wrap-login-form-btn">
                                <div className="login-form-bgbtn"></div>
                                <button type='submit' className="login-form-btn" onClick={(e) => handleFormSubmit(e)}>Login</button>
                            </div>
                            <div>

                            </div>
                        </div>

                        {
                            displayErrorAlert && <Alert message={"Invalid email or password!"} bgColor={"red"} />
                        }

                        {
                            displayInfoAlert && <Alert message={"Both fields should be completed!"} bgColor={"#22C6C8"} />

                        }


                    </form>
                </div>
            </div >

        </div >
    )
}

export default Login