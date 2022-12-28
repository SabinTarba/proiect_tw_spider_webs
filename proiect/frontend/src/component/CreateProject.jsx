import { useState } from 'react'
import { getLoggedUser } from '../utils/auth'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from './Login/Alert';
import PROJECT_SERVICE from '../services/PROJECT_SERVICE';
import TEAM_SERVICE from '../services/TEAM_SERVICE';
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



    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();

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
        TEAM_SERVICE.getTeamById(loggedUser?.teamId).then(res => {
            if (res.status === 200)
                setIsLeader(loggedUser?.id === res.data.leaderId);
        })
    })

    return (
        <>

            {isLeader &&
                <>
                    <Container className="mt-5 d-flex justify-content-center">
                        <h2>Create new project for team {loggedUser?.teamId}</h2>
                    </Container>

                    <Container className="mt-3 d-flex justify-content-center">
                        <Form className="w-50 row" noValidate validated={validated} onSubmit={handleSubmit}
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
                                <Button variant="primary" type="submit" className="w-50 ">
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


            {!isLeader && <Container className="mt-5 h3 d-flex justify-content-center">
                You are not the leader of your team, so you can't add projects! Contact your team leader!
            </Container>}

        </>
    )
}

export default CreateProject