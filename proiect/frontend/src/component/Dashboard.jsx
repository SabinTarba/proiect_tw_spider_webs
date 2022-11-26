import { useState } from 'react'
import { useEffect } from 'react';
import { getLoggedUser, logOutUSer } from '../utils/auth.js';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button'
import PROFESSOR_SERVICE from '../services/PROFESSOR_SERVICE.js';

const PROFESSOR_ACCOUNT = 1;
const STUDENT_ACCOUNT = 2;



const Dashboard = () => {


    const [students, setStudents] = useState([]);

    const navigate = useNavigate();
    const loggedUser = getLoggedUser();



    useEffect(() => {
        if (!loggedUser)
            navigate("/")
        else {

            PROFESSOR_SERVICE.getAllStudents(loggedUser.id).then((res) => {
                if (res.status === 200) {
                    setStudents(res.data.students);
                }
            })

        }


    }, [loggedUser, navigate])

    return (

        <>
            <Navbar bg='dark' variant='dark'>
                <Container>
                    <Navbar.Brand>Navbar with text</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Signed in as: <span className="text-warning">{loggedUser?.lastName + " " + loggedUser?.firstName}</span>
                        </Navbar.Text>
                        <Button variant="dark" onClick={() => { logOutUSer(); window.location.reload(false); }}>Logout</Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {
                loggedUser?.type === PROFESSOR_ACCOUNT
                &&
                <Container className="mt-5">
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>#ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Series</th>
                                <th>Class</th>
                            </tr>
                        </thead>
                        <tbody>


                            {
                                students.map(student => {
                                    return <tr>
                                        <td>{student.id}</td>
                                        <td>{student.firstName}</td>
                                        <td>{student.lastName}</td>
                                        <td>{student.email}</td>
                                        <td>{student.series}</td>
                                        <td>{student.class}</td>
                                    </tr>
                                })
                            }

                        </tbody>
                    </Table>
                </Container>
            }

        </>
    );
}


export default Dashboard