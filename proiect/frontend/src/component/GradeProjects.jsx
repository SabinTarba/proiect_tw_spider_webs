import { useState } from 'react'
import { useEffect } from 'react';
import TASK_SERVICE from '../services/TASK_SERVICE';
import { getLoggedUser } from '../utils/auth'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/esm/Col.js';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/esm/Button';
import JURY_SERVICE from '../services/JURY_SERVICE';



const GradeProjects = () => {

    const loggedUser = getLoggedUser();
    const [projectsTasks, setProjectsTasks] = useState([]);
    const [grade, setGrade] = useState();



    useEffect(() => {
        if (!isNaN(loggedUser?.id) && loggedUser?.id !== null)
            TASK_SERVICE.getProjectsAndTasksForGrading(loggedUser?.id).then(res => {
                if (res.status === 200)
                    setProjectsTasks(res.data);
            })
    }, [loggedUser?.id])


    const saveGradeForProject = (grade, teamId) => {

        if (grade < 1 || grade > 10)
            alert("Grade should be between 1 and 10!")
        else {
            // save grade

            JURY_SERVICE.setGrade(loggedUser?.id, teamId, grade).then(res => {
                if (res.status === 200 && res.data.rowsAffected !== 0)
                    alert(`Your grade (${grade}) has been submited!`)
            }
            )
        }
    }

    return (
        <div className="mt-2 " style={{ width: "95%" }}>

            {projectsTasks.length !== 0 &&
                <Form className="w-100" >
                    {
                        projectsTasks.map(project =>
                            project?.tasks.sort((a, b) => a.taskNumber - b.taskNumber)
                                .map
                                ((task, idx) => {
                                    return (
                                        <div key={task.id * 10}>
                                            {idx === 0 &&

                                                <Container>
                                                    <p className="h4 text-info">Grade project {project.title}</p>
                                                </Container>

                                            }
                                            <div key={task.id}>
                                                <Row>
                                                    <Col className="pt-3 d-flex align-items-center justify-content-end fw-bold col-md-1">
                                                        <span>Task #{task.taskNumber}</span>
                                                    </Col>

                                                    <Col className="col-md-5">
                                                        <Form.Group className="mb-3">
                                                            <Form.Label>Link</Form.Label>
                                                            <Form.Control type="text" placeholder="Link" readOnly defaultValue={task.link} />
                                                        </Form.Group >
                                                    </Col>
                                                    <Col className="col-md-2">
                                                        <Form.Group className="mb-3">
                                                            <Form.Label>Link type</Form.Label>
                                                            <Form.Control type="text" placeholder="Link" readOnly defaultValue={task.linkType} />
                                                        </Form.Group >
                                                    </Col>
                                                    <Col className="col-md-2">

                                                    </Col>


                                                </Row>
                                                <Row className="mb-3">
                                                    <Col className="col-md-1">
                                                    </Col>
                                                    <Col className="col-md-4">
                                                        <Form.Group className="mb-3">
                                                            <textarea className="form-control" type="text" placeholder="Additional comments" readOnly defaultValue={task.comment} />
                                                        </Form.Group >

                                                    </Col>
                                                </Row>
                                            </div>

                                            {idx === project.tasks.length - 1 &&

                                                <Container className="mb-3">
                                                    <Row>
                                                        <Col className="col-md-2">
                                                            <Form.Group className="mb-3">
                                                                <Form.Label className="fw-bold text-success h4" >Enter grade</Form.Label>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col className="col-md-2">
                                                            <Form.Control type='number' min={1} max={10} defaultValue={project.grade} onChange={(e) => setGrade(e.target.value)} />

                                                        </Col>
                                                        <Col className="col-md-2">
                                                            <Button variant='success' onClick={() => saveGradeForProject(grade, project.teamId)}>Save</Button>
                                                        </Col>

                                                    </Row>
                                                </Container>
                                            }
                                        </div>

                                    )
                                })

                        )
                    }
                </Form >
            }

            {
                projectsTasks.length === 0 &&
                <Container className="mt-5 h3 d-flex justify-content-center">
                    You don't have projects to grade yet!
                </Container>
            }
        </div >
    )
}

export default GradeProjects