import { getLoggedUser } from '../../utils/auth.js';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';


const StudentsList = ({ students }) => {

    const loggedUser = getLoggedUser();

    return (

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
    )
}

export default StudentsList