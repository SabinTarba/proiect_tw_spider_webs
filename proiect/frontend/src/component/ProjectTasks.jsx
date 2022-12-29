import { useEffect, useState } from 'react'
import PROJECT_SERVICE from '../services/PROJECT_SERVICE.js';
import { getLoggedUser } from '../utils/auth.js';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/esm/Col.js';
import dateFormat from 'dateformat';
import TASK_SERVICE from '../services/TASK_SERVICE.js';
import Alert from '../component/Login/Alert';
import PROFESSOR_SERVICE from '../services/PROFESSOR_SERVICE.js';

const ProjectTasks = () => {
    const loggedUser = getLoggedUser();
    const [project, setProject] = useState();
    const teamId = loggedUser?.teamId;
    const [showMessage, setShowMessage] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [professor, setProfessor] = useState();


    useEffect(() => {

        if (!isNaN(teamId) && teamId !== null) {
            PROJECT_SERVICE.getProjectByTeamId(teamId).then(res => {
                if (res.status === 200 && res.data.status !== "No data found!") {
                    setProject(res.data);
                    setTasks(res.data.tasks);
                }

                else setShowMessage(true);

            })


        }
        else setShowMessage(true);

        if (!isNaN(loggedUser?.professorId && loggedUser?.professorId !== null)) {
            PROFESSOR_SERVICE.getProfessorById(loggedUser?.professorId).then(res => {
                if (res.status === 200 && res.data.status !== "No data found!")
                    setProfessor(res.data);
            })

        }

    }, [teamId, loggedUser?.professorId]);


    const handleSubmit = (index) => {
        console.log(tasks[index]);

        TASK_SERVICE.saveProgress(tasks[index]).then(res => {
            if (res.status === 200 && res.data.affectedRows !== 0)
                window.location.reload();
        }
        )

    }

    return (
        <>
            {!showMessage &&
                <>
                    <Container className="mt-5 d-flex justify-content-center">
                        <h2>Project - {project?.description}</h2>
                    </Container>

                    <div className="mt-2 text-center" style={{ width: "95%" }}>
                        <Form className="w-100" >
                            {
                                tasks.map(task => {
                                    return (
                                        <div key={task.id}>
                                            <Row>
                                                <Col className="pt-3 d-flex align-items-center justify-content-end fw-bold col-md-1">
                                                    <span>Task #{task.taskNumber}</span>
                                                </Col>

                                                <Col className="col-md-5">
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Link</Form.Label>
                                                        <Form.Control readOnly={new Date() > new Date(task.dueDate)} type="text" placeholder="Link" defaultValue={task.link === null ? "" : task.link} required onChange={(e) => {

                                                            for (let task_ of tasks)
                                                                if (task.taskNumber === task_.taskNumber) {
                                                                    task_.link = e.target.value;
                                                                    setTasks(tasks);
                                                                    break;
                                                                }

                                                        }} />
                                                    </Form.Group >
                                                </Col>
                                                <Col className="col-md-2">
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Link type</Form.Label>
                                                        <Form.Select readOnly={new Date() > new Date(task.dueDate)} defaultValue={task.linkType === null ? "default" : task.linkType} onChange={(e) => {

                                                            for (let task_ of tasks)
                                                                if (task.taskNumber === task_.taskNumber) {
                                                                    task_.linkType = e.target.value;
                                                                    setTasks(tasks);
                                                                    break;
                                                                }

                                                        }}>
                                                            <option value="default">Choose link type</option>
                                                            <option value="video">Video</option>
                                                            <option value="repository">Repository link</option>
                                                        </Form.Select>
                                                    </Form.Group >
                                                </Col>
                                                <Col className="col-md-2">
                                                    <Form.Group className="mb-3">
                                                        <Form.Label className={task.dueDateAlreadyUpdated ? "text-danger" : ""}>{task.dueDateAlreadyUpdated ? "Already updated [READ ONLY]" : "Due date"}</Form.Label>
                                                        <Form.Control readOnly={task.dueDateAlreadyUpdated} min={dateFormat(new Date(), "yyyy-mm-dd")} max={dateFormat(professor?.generalDueDate, "yyyy-mm-dd")} type="date" defaultValue={dateFormat(task.dueDate, "yyyy-mm-dd")} onChange={(e) => {

                                                            for (let task_ of tasks)
                                                                if (task.taskNumber === task_.taskNumber) {
                                                                    task_.dueDate = e.target.value;
                                                                    setTasks(tasks);
                                                                    break;
                                                                }

                                                        }} />
                                                    </Form.Group >
                                                </Col>

                                                <Col className="col-md-2 mt-3 align-items-center d-flex justify-content-center">

                                                    {
                                                        new Date() <= new Date(task.dueDate)
                                                        &&
                                                        <Button variant="success" onClick={() => handleSubmit(task.taskNumber - 1)}>
                                                            Save progress for task {task.taskNumber}
                                                        </Button>

                                                    }

                                                    {
                                                        new Date() > new Date(task.dueDate)
                                                        &&
                                                        <Alert message={"The due date has passed!"} bgColor={"red"} />

                                                    }


                                                </Col>

                                            </Row>
                                            <Row className="mb-3">
                                                <Col className="col-md-1">
                                                </Col>
                                                <Col className="col-md-4">
                                                    <Form.Group className="mb-3">
                                                        <textarea readOnly={new Date() > new Date(task.dueDate)} className="form-control" type="text" placeholder="Additional comments" defaultValue={task.comment === null ? "" : task.comment} required onChange={(e) => {

                                                            for (let task_ of tasks)
                                                                if (task.taskNumber === task_.taskNumber) {
                                                                    task_.comment = e.target.value;
                                                                    setTasks(tasks);
                                                                    break;
                                                                }

                                                        }} />
                                                    </Form.Group >

                                                </Col>
                                            </Row>
                                        </div>

                                    )
                                })
                            }


                        </Form >
                    </div >
                </>
            }


            {
                showMessage && <Container className="mt-5 h3 d-flex justify-content-center">
                    You don't belong to a team or your team have not a project yet!
                </Container>
            }
        </>
    )
}

export default ProjectTasks