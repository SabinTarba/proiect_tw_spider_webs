import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { logOutUSer, getLoggedUser } from '../utils/auth.js';



const PROFESSOR_ACCOUNT = 1;
const STUDENT_ACCOUNT = 2;

const navLinks = [

    {
        path: "/dashboard/students-list",
        textColor: "text-white",
        text: "Student list",
        type: PROFESSOR_ACCOUNT
    },

    {
        path: "/dashboard/add-student",
        textColor: "text-white",
        text: "Add student",
        type: PROFESSOR_ACCOUNT
    },
]


const NavBar = () => {
    const loggedUser = getLoggedUser();
    const alias = loggedUser.type === STUDENT_ACCOUNT ? "[student]" : "[professor]";

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
                </Nav>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Brand>
                        Signed in as: <span className="text-warning fw-bold">{loggedUser?.lastName + " " + loggedUser?.firstName + " " + alias}</span>
                    </Navbar.Brand>
                    <Button variant='warning' className='text-muted' onClick={() => { logOutUSer(); window.location.reload(false); }}>Logout</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    )
}

export default NavBar