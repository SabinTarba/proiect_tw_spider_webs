import { useEffect, useState } from 'react'
import PROJECT_SERVICE from '../services/PROJECT_SERVICE.js';
import { getLoggedUser } from '../utils/auth.js';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const ProjectTasks = () => {
    const loggedUser = getLoggedUser();
    const [project, setProject] = useState();
    const teamId = loggedUser?.teamId;


    useEffect(() => {
        PROJECT_SERVICE.getProjectByTeamId(teamId).then(res => {
            if (res.status === 200)
                setProject(res.data);
        })
    }, [teamId])


    const handleSubmit = () => {

    }

    return (
        <>
            <Container className="mt-5 d-flex justify-content-center">
                <h2>Project - {project?.description}</h2>
            </Container>

            <Container className="mt-3 d-flex justify-content-center">
                <Form className="w-50 row" onSubmit={handleSubmit}
                >
                    <Form.Group className="mb-3" hasvalidation="true">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Title" required onChange={(e) => null} />
                        <Form.Control.Feedback type="invalid">
                            Please choose a title for your project!
                        </Form.Control.Feedback>
                    </Form.Group >

                    <Form.Group className="mb-3" hasvalidation="true">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" placeholder="Description" required onChange={(e) => null} />
                        <Form.Control.Feedback type="invalid">
                            Please choose a description for your project!
                        </Form.Control.Feedback>
                    </Form.Group >
                    <Form.Group className="mb-3" hasvalidation="true">
                        <Form.Label>Number of tasks</Form.Label>
                        <Form.Control min={0} type="number" placeholder="Enter number of tasks" required onChange={(e) => null} />
                        <Form.Control.Feedback type="invalid">
                            Please choose a number of tasks!
                        </Form.Control.Feedback>
                    </Form.Group >


                    <Container className="d-flex justify-content-center mt-2">
                        <Button variant="primary" type="submit" className="w-50 ">
                            Create project
                        </Button>
                    </Container>

                </Form >
            </Container >
        </>
    )
}

export default ProjectTasks