import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { logOutUSer, getLoggedUser } from '../utils/auth.js';
import PROFESSOR_SERVICE from '../services/PROFESSOR_SERVICE.js';



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
]


const NavBar = () => {
    const loggedUser = getLoggedUser();
    const alias = loggedUser?.type === STUDENT_ACCOUNT ? "[student]" : "[professor]";


    const generateTeams = (professorId) => {
        PROFESSOR_SERVICE.generateTeams(professorId).then(res => {
            if (res.status === 200) {
                alert("SUCCESS");
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

                    {loggedUser?.type === PROFESSOR_ACCOUNT && <Button className="text-white fw-bold" variant="success" onClick={() => generateTeams(loggedUser.id)}>Generate teams</Button>}
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