import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import { MdDelete } from 'react-icons/md';
import STUDENT_SERVICE from '../services/STUDENT_SERVICE';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const StudentsList = ({ students }) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const deleteStudent = (studentID) => {

        STUDENT_SERVICE.deleteStudentById(studentID).then(res => {
            if (res.status !== 200) {
                alert("Something went wrong!");
            }
        })
    }


    return (

        <Container className="mt-5">
            <Table striped bordered hover responsive>
                <thead>
                    <tr className="text-center">
                        <th>#ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Series</th>
                        <th>Class</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>


                    {
                        students.map(student => {
                            return <tr className="text-center" key={student.id}>
                                <td>{student.id}</td>
                                <td>{student.firstName}</td>
                                <td>{student.lastName}</td>
                                <td>{student.email}</td>
                                <td>{student.series}</td>
                                <td>{student.class}</td>
                                <td className="d-flex justify-content-center">

                                    <MdDelete color="red" size={25} onClick={() => setShow(true)} cursor="pointer"></MdDelete>


                                    {show &&
                                        <Modal show={show} onHide={handleClose}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Confirmation dialog</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>Are you sure you want to delete this student?</Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={() => { handleClose(); }}>
                                                    No
                                                </Button>
                                                <Button variant="danger" onClick={() => { handleClose(); deleteStudent(student.id) }}>
                                                    Yes
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
                                    }




                                </td>
                            </tr>
                        })
                    }

                </tbody>
            </Table>

        </Container >
    )
}

export default StudentsList