import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { logOutUSer, getLoggedUser } from '../utils/auth.js';
import PROFESSOR_SERVICE from '../services/PROFESSOR_SERVICE.js';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router';



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
    },
]


const NavBar = () => {
    const loggedUser = getLoggedUser();
    const alias = loggedUser?.type === STUDENT_ACCOUNT ? "[student]" : "[professor]";
    const [show, setShow] = useState(false);
    const [option, setOption] = useState();
    const navigate = useNavigate();


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

    return (
        <Navbar bg='primary' variant='dark'>
            <Container>
                <Nav className="me-auto">
                    {
                        navLinks.map(link => {
                            if (link.type === loggedUser?.type)
                                return <Nav.Link key={link.path} href={link.path} className={link.textColor}>{link.text}</Nav.Link>

                            return null;
                        })

                    }

                    {loggedUser?.type === PROFESSOR_ACCOUNT &&
                        <Button className="text-white fw-bold" variant="success" onClick={() => setShow(true)}>Generate teams</Button>
                    }
                    {show &&
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
                    }


                </Nav>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Brand>
                        <span className="fw-bold">Signed in as: </span><span className="text-warning fw-bold">{loggedUser?.lastName + " " + loggedUser?.firstName + " " + alias}</span>
                    </Navbar.Brand>
                    <Button variant='warning' className='text-white fw-bold' onClick={() => { logOutUSer(); window.location.reload(false); }}>Logout</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    )
}

export default NavBar