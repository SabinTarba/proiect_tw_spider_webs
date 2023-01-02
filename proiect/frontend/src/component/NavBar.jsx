import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { logOutUSer, getLoggedUser, saveLoggedUser } from '../utils/auth.js';
import PROFESSOR_SERVICE from '../services/PROFESSOR_SERVICE.js';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router';
import dateFormat from 'dateformat';
import { useEffect } from 'react';



const PROFESSOR_ACCOUNT = 1;
const STUDENT_ACCOUNT = 2;

const navLinks = [

    {
        path: "/dashboard/students-list",
        textColor: "text-white fw-bold",
        text: "Student list",
        type: PROFESSOR_ACCOUNT
    },

    {
        path: "/dashboard/add-student",
        textColor: "text-white fw-bold",
        text: "Add student",
        type: PROFESSOR_ACCOUNT
    },
    {
        path: "/dashboard/teams-list",
        textColor: "text-white fw-bold",
        text: "List of generated teams",
        type: PROFESSOR_ACCOUNT
    },
    {
        path: "/dashboard/student-info",
        textColor: "text-white fw-bold",
        text: "Information",
        type: STUDENT_ACCOUNT
    },
    {
        path: "/dashboard/add-project",
        textColor: "text-white fw-bold",
        text: "Create new project",
        type: STUDENT_ACCOUNT
    },
    {
        path: "/dashboard/project-tasks",
        textColor: "text-white fw-bold",
        text: "Project tasks",
        type: STUDENT_ACCOUNT
    }
]


const NavBar = () => {
    const loggedUser = getLoggedUser();
    const alias = loggedUser?.type === STUDENT_ACCOUNT ? "[student]" : "[professor]";
    const [show, setShow] = useState(false);
    const [dueDateShow, setDueDateShow] = useState(false);
    const [option, setOption] = useState();
    const navigate = useNavigate();
    const [generalDueDate, setGeneralDueDate] = useState();
    const [professorDueDate, setProfessorDueDate] = useState();


    const generateTeams = (professorId, option) => {
        PROFESSOR_SERVICE.generateTeams(professorId, option).then(res => {
            if (res.status === 200) {
                navigate("/dashboard/teams-list");
            }
            else {
                alert("FAILURE");
            }
        })
    }

    const saveProfessorGeneralNewDate = (professorId, newGeneralDueDate) => {
        PROFESSOR_SERVICE.setGeneralDueDate({ id: professorId, newGeneralDueDate: newGeneralDueDate }).then(res => {
            console.log({ id: professorId, newGeneralDueDate: newGeneralDueDate })
            if (res.status === 200 && res.data.status === "SUCCESS") {
                saveLoggedUser({ ...loggedUser, generalDueDate: new Date(newGeneralDueDate) });
            }
        })
    }


    useEffect(() => {

        if (!isNaN(loggedUser?.professorId) && !isNaN(loggedUser?.type) && loggedUser?.type !== null && loggedUser?.professorId !== null)
            if (loggedUser?.type === STUDENT_ACCOUNT)
                PROFESSOR_SERVICE.getProfessorById(loggedUser?.professorId).then(res => {
                    if (res.status === 200 && res.data.status !== "No data found!") {
                        setProfessorDueDate(res.data.generalDueDate);
                    }
                })
    }, [loggedUser?.professorId, loggedUser?.type])

    return (
        <Navbar bg='primary' variant='dark' className='navbar navbar-expand-lg'>
            <Container>
    <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav ml-auto">
                <Nav className="me-auto navbar navbar-expand-lg">
                    
                    {
                        
                        navLinks.map(link => {
                            if (link.type === loggedUser?.type)
                                return <Nav.Link key={link.path} href={link.path} className={link.textColor}>{link.text}</Nav.Link>

                            return null;
                        })
                        

                    }
                    

                        <li className="nav-item">
                    {loggedUser?.type === STUDENT_ACCOUNT && new Date() >= new Date(professorDueDate) && new Date() <= new Date().setDate(new Date(professorDueDate).getDate() + 3) &&
                        < Nav.Link href={"/dashboard/grading-projects"} className={"text-white fw-bold"}>Grade projects</Nav.Link>
                    }
                        </li>
                    <li className="nav-item">
                    {loggedUser?.type === PROFESSOR_ACCOUNT &&
                        <Button className="text-white fw-bold" variant="success" onClick={() => setShow(true)}>Generate teams</Button>
                    }
                    </li>
                    <li className="nav-item">
                    <Modal show={show} onHide={() => setShow(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Generate teams</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Select aria-label="Default select example" onChange={(e) => setOption(e.target.value)}>
                                <option>Choose the number of students per team</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </Form.Select>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="danger" onClick={() => setShow(false)}>
                                Cancel
                            </Button>
                            <Button variant="success" onClick={() => { setShow(false); generateTeams(loggedUser.id, option) }}>
                                Submit
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    </li>
                    <li className="nav-item ml-5 px-2 py-1">
                    {loggedUser?.type === PROFESSOR_ACCOUNT &&
                        <Button className="text-white fw-bold" variant="info" onClick={() => setDueDateShow(true)}>Set general due date</Button>
                    }
                    </li>
                    <li className="nav-item">
                    <Modal show={dueDateShow} onHide={() => setDueDateShow(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Choose general due date</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Control type="date" defaultValue={dateFormat(loggedUser?.generalDueDate, "yyyy-mm-dd")} onChange={(e) => setGeneralDueDate(e.target.value)} />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="danger" onClick={() => setDueDateShow(false)}>
                                Cancel
                            </Button>
                            <Button variant="success" onClick={() => { setDueDateShow(false); saveProfessorGeneralNewDate(loggedUser?.id, generalDueDate); }}>
                                Submit
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    </li>
                    </Nav>

           
                <li className="nav-item">
                <Navbar.Collapse className="navbar-text ml-auto">
                    <Navbar.Brand className='navbar navbar-right'>
                        <span className="fw-bold">Signed in as: </span>
                        <span className="text-warning fw-bold">{loggedUser?.lastName + " " + loggedUser?.firstName + " " + alias}</span>
                    <Button variant='warning' className='text-white fw-bold' onClick={() => { logOutUSer(); window.location.reload(false); }}>Logout</Button>
                    </Navbar.Brand>
                </Navbar.Collapse>
                </li>
                </ul>
                </div>
               
            </Container>

        </Navbar >

    )
}

export default NavBar