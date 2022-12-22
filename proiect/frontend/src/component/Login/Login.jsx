import { useState } from 'react';
import './login.css';
import PROFESSOR_SERVICE from '../../services/PROFESSOR_SERVICE.js';
import STUDENT_SERVICE from '../../services/STUDENT_SERVICE.js'
import Alert from './Alert';
import { getLoggedUser, saveLoggedUser } from '../../utils/auth.js';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


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

        <Container className="w-50 rounded d-flex p-2 my-1 justify-content-center">
            <Container className='m-5'>
                <Form className="p-3" >
                    <span className="shadow bg-white rounded" style={{
                        "display": "block",
                        "font-family": "Poppins-Bold",
                        "font-size": "40px",
                        "font-weight": "bold",
                        "color": "#00008B",
                        "line-height": "1.2",
                        "text-align": "center",
                        "padding-bottom": "10px"
                    }}>Login</span>
                    <Form.Group className="mt-4" hasvalidation="true">
                        <Form.Label className='fw-bold fs-5'>E-mail</Form.Label>
                        <Form.Control type="text" name="email" placeholder="Type your e-mail"
                            aria-describedby="basic-addon2" required onChange={(e) => setLoginRequest({ ...loginRequest, email: e.target.value })}
                            onFocus={() => { setDisplayErrorAlert(false); setDisplayInfoAlert(false) }} />
                    </Form.Group >

                    <Form.Group className="mb-2" hasvalidation="true">
                        <Form.Label className='fw-bold fs-5'>Password</Form.Label>
                        <Form.Control type="password" name="pass" placeholder="Type your password" required onChange={(e) => setLoginRequest({ ...loginRequest, password: e.target.value })}
                            onFocus={() => { setDisplayErrorAlert(false); setDisplayInfoAlert(false) }} />
                    </Form.Group >

                    <Form.Group>
                        <Form.Label className='mt-3 fw-bold fs-5'>User-type</Form.Label>
                        <Form.Group className="pd-5 text-center fs-5">
                            <Form.Check
                                inline
                                label="Professor"
                                name="group1"
                                type={'radio'}
                                id={`inline-'radio'-Professor`}
                                onChange={() => setAccount(PROFESSOR_ACCOUNT)}
                                required
                            />
                            <Form.Check
                                inline
                                label="Student"
                                name="group1"
                                type={'radio'}
                                id={`inline-'radio'-Student`}
                                onChange={() => setAccount(STUDENT_ACCOUNT)}
                                required
                            />
                        </Form.Group>
                    </Form.Group>

                    <Form.Group className="mt-5 text-center" >
                        <Button type="submit" className="shadow-lg bg-primary rounded text-white w-75" gap-2 variant="primary" size="lg" onClick={(e) => handleFormSubmit(e)}>
                            Login
                        </Button>
                    </Form.Group>
                    {
                        displayErrorAlert && <Alert message={"Invalid email or password!"} bgColor={"red"} />
                    }

                    {
                        displayInfoAlert && <Alert message={"Both fields should be completed!"} bgColor={"#22C6C8"} />

                    }
                </Form>
            </Container>
        </Container >

    )
}

export default Login
