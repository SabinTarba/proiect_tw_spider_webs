import { useState } from 'react'
import { getLoggedUser } from '../utils/auth'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from './Login/Alert';
import PROJECT_SERVICE from '../services/PROJECT_SERVICE';
import TEAM_SERVICE from '../services/TEAM_SERVICE';
import PROFESSOR_SERVICE from '../services/PROFESSOR_SERVICE';
import { useEffect } from 'react';

const CreateProject = () => {
    const loggedUser = getLoggedUser();
    const [validated, setValidated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [project, setProject] = useState({
        title: null,
        description: null,
        noTasks: null,
        teamId: loggedUser?.teamId
    })

    const [isLeader, setIsLeader] = useState();
    const [teamHasAlreadyAProject, setTeamHasAlreadyAProject] = useState(false);
    const [professor, setProfessor] = useState();



    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        else {
            // facem request-ul aici

            PROJECT_SERVICE.saveProject(project).then(res => {
                if (res.status === 200)
                    setShowAlert(true);

            })

        }

        setValidated(true);

    };


    useEffect(() => {

        if (!isNaN(loggedUser?.teamId) && loggedUser?.teamId !== null && !isNaN(loggedUser?.professorId) && loggedUser?.professorId !== null && !isNaN(loggedUser?.id) && loggedUser?.id !== null) {
            TEAM_SERVICE.getTeamById(loggedUser?.teamId).then(res => {
                if (res.status === 200)
                    setIsLeader(loggedUser?.id === res.data.leaderId);
            })

            PROJECT_SERVICE.getProjectByTeamId(loggedUser?.teamId).then(res => {
                if (res.status === 200 && res.data.status !== "No data found!")
                    setTeamHasAlreadyAProject(true);
            })

            PROFESSOR_SERVICE.getProfessorById(loggedUser?.professorId).then(res => {
                if (res.status === 200)
                    setProfessor(res.data);
            })
        }

    }, [loggedUser?.teamId, loggedUser?.professorId, loggedUser?.id])

    return (
        <>

            {isLeader && !teamHasAlreadyAProject && new Date() <= new Date().setDate(new Date(professor?.generalDueDate).getDate() + 3) &&
                <>
                    <Container className="mt-5 d-flex justify-content-center">
                        <h2>Create new project for team {loggedUser?.teamId}</h2>
                    </Container>

                    <Container className="mt-3 d-flex justify-content-center">
                        <Form className="w-50 row" noValidate validated={validated}
                        >
                            <Form.Group className="mb-3" hasvalidation="true">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" placeholder="Title" required onChange={(e) => setProject({ ...project, title: e.target.value })} />
                                <Form.Control.Feedback type="invalid">
                                    Please choose a title for your project!
                                </Form.Control.Feedback>
                            </Form.Group >

                            <Form.Group className="mb-3" hasvalidation="true">
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text" placeholder="Description" required onChange={(e) => setProject({ ...project, description: e.target.value })} />
                                <Form.Control.Feedback type="invalid">
                                    Please choose a description for your project!
                                </Form.Control.Feedback>
                            </Form.Group >
                            <Form.Group className="mb-3" hasvalidation="true">
                                <Form.Label>Number of tasks</Form.Label>
                                <Form.Control min={0} type="number" placeholder="Enter number of tasks" required onChange={(e) => setProject({ ...project, noTasks: Number(e.target.value) })} />
                                <Form.Control.Feedback type="invalid">
                                    Please choose a number of tasks!
                                </Form.Control.Feedback>
                            </Form.Group >


                            <Container className="d-flex justify-content-center mt-2">
                                <Button variant="primary" className="w-50" onClick={(e) => handleSubmit(e)}>
                                    Create project
                                </Button>
                            </Container>
                            <Container className="w-50" >
                                {
                                    showAlert && <Alert message="Project & its tasks have been successfully created!" bgColor={"green"} />
                                }
                            </Container>


                        </Form >
                    </Container >
                </>}


            {
                !isLeader &&
                <Container className="mt-5 h3 d-flex justify-content-center">
                    You are not the leader of your team, so you can't add projects! Contact your team leader!
                </Container>
            }

            {
                teamHasAlreadyAProject &&
                <Container className="mt-5 h3 d-flex justify-content-center">
                    Your team has already a project! You cannot add more until your professor will generate the final results and delete the teams.
                </Container>
            }

            {
                new Date() > new Date().setDate(new Date(professor?.generalDueDate).getDate() + 3) &&
                <Container className="mt-5 h3 d-flex justify-content-center">
                    General due date has passed! You cannot create a project anymore!
                </Container>
            }

        </>
    )
}

export default CreateProject