import { useEffect, useState } from 'react';
import { getLoggedUser, saveLoggedUser } from '../utils/auth.js';
import { Routes, useNavigate, Route } from 'react-router-dom';
import NavBar from './NavBar.jsx';
import StudentsList from './StudentsList.jsx';
import AddStudent from './AddStudent.jsx';
import ListOfTeams from './ListOfTeams.jsx';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/esm/Form';
import Container from 'react-bootstrap/esm/Container.js';
import Alert from './Login/Alert.jsx';
import STUDENT_SERVICE from '../services/STUDENT_SERVICE.js';
import StudentInfo from './StudentInfo.jsx';
import CreateProject from './CreateProject.jsx';
import ProjectTasks from './ProjectTasks.jsx';
import GradeProjects from './GradeProjects.jsx';



const Dashboard = () => {


    const navigate = useNavigate();
    const loggedUser = getLoggedUser();
    const isStudentAndFirstLogin = loggedUser?.type === 2 && loggedUser?.firstLogin;
    const [handlerForChangingPassword, setHandlerForChangingPassword] = useState({
        newPass: null,
        newPassConfirmation: null
    });

    const [passwordsNotMatch, setPasswordNotMatch] = useState(false);

    const handleSubmitChangePassword = (e) => {
        e.preventDefault();



        if (handlerForChangingPassword.newPass !== handlerForChangingPassword.newPassConfirmation)
            setPasswordNotMatch(true);
        else {

            //save new password and redirect user
            loggedUser.password = handleSubmitChangePassword.newPass;
            STUDENT_SERVICE.changeFirstTimePassword({ id: loggedUser.id, newPassword: handlerForChangingPassword.newPass })
                .then(res => {
                    if (res.status === 200 && res.data.status === "SUCCESS") {

                        saveLoggedUser({ ...loggedUser, firstLogin: false });
                        window.location.reload();
                    }
                })


        }

    }


    useEffect(() => {
        if (!loggedUser)
            navigate("/")

    }, [loggedUser, navigate])

    return (

        <>
            {
                !isStudentAndFirstLogin &&
                <>
                    <NavBar />
                    <Routes>
                        <Route path='/students-list' element={<StudentsList />} />
                        <Route path='/add-student' element={<AddStudent />} />
                        <Route path='/teams-list' element={<ListOfTeams />} />
                        <Route path='/student-info' element={<StudentInfo />} />
                        <Route path='/add-project' element={<CreateProject />} />
                        <Route path='/project-tasks' element={<ProjectTasks />} />
                        <Route path='/grade-projects' element={<GradeProjects />} />
                    </Routes>
                </>
            }

            {
                isStudentAndFirstLogin &&

                <Container className="mt-5 w-50">
                    <Form className="p-5">
                        <h3 className="text-center mb-5 fw-bold text-danger">Reset your default password</h3>
                        <Form.Group className="mb-3">
                            <Form.Label>Enter your new password</Form.Label>
                            <Form.Control onFocus={() => setPasswordNotMatch(false)} type="password" placeholder="New password" required onChange={(e) => setHandlerForChangingPassword({ ...handlerForChangingPassword, newPass: e.target.value })} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Enter new password confirmation</Form.Label>
                            <Form.Control onFocus={() => setPasswordNotMatch(false)} type="password" placeholder="New password confirmation" required onChange={(e) => setHandlerForChangingPassword({ ...handlerForChangingPassword, newPassConfirmation: e.target.value })} />
                        </Form.Group>

                        <Container className="d-flex justify-content-center mt-5">
                            <Button className="w-50" variant="success" type="submit" onClick={(e) => handleSubmitChangePassword(e)}>
                                Submit
                            </Button>

                        </Container>

                        <Container className="d-flex justify-content-center mt-2 py-2">
                            {
                                passwordsNotMatch &&
                                <Alert message={"Passwords do not match!"} bgColor="red" />
                            }
                        </Container>

                    </Form>


                </Container>
            }

        </>


    );
}


export default Dashboard