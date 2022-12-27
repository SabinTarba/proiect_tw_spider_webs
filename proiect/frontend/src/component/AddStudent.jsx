import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { getLoggedUser } from '../utils/auth.js'
import { useState } from 'react';
import Alert from './Login/Alert';
import STUDENT_SERVICE from '../services/STUDENT_SERVICE.js';


const seriesClasses = [
    {
        series: "A",
        classes: ["1071", "1072", "1073", "1074", "1075"]
    },
    {
        series: "B",
        classes: ["1076", "1077", "1078", "1079"]
    },
    {
        series: "C",
        classes: ["1080", "1081", "1082", "1083", "1084"]
    },
    {
        series: "D",
        classes: ["1085", "1086", "1087", "1088"]
    },
    {
        series: "E",
        classes: ["1089", "1090", "1091", "1092"]
    },
    {
        series: "F",
        classes: ["1093"]
    },
    {
        series: "G",
        classes: ["1094", "1095"]
    }

];

const AddStudent = () => {

    const loggedUser = getLoggedUser();

    const [selectedSeries, setSelectedSeries] = useState(null);
    const [validated, setValidated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [saveStudentRequest, setSaveStudentRequest] = useState({
        professorId: loggedUser?.id,
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        series: null,
        class: null
    });






    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();

        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        else {
            // facem request-ul aici
            STUDENT_SERVICE.saveStudent(saveStudentRequest).then(res => {
                if (res.status === 200) {
                    setShowAlert(true);
                }
            }
            )


        }

        setValidated(true);

    };



    return (

        <>


            <Container className="mt-5 d-flex justify-content-center">
                <h2>Add student</h2>
            </Container>

            <Container className="mt-3 d-flex justify-content-center">
                <Form className="w-50 row" noValidate validated={validated} onSubmit={handleSubmit}
                >
                    <div className="col-md-6">

                        <Form.Group className="mb-3" hasvalidation="true">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control type="text" placeholder="Last name" required onChange={(e) => setSaveStudentRequest({ ...saveStudentRequest, lastName: e.target.value })} />
                            <Form.Control.Feedback type="invalid">
                                Please choose a last name!
                            </Form.Control.Feedback>
                        </Form.Group >

                        <Form.Group className="mb-3" hasvalidation="true">
                            <Form.Label>First name</Form.Label>
                            <Form.Control type="text" placeholder="First name" required onChange={(e) => setSaveStudentRequest({ ...saveStudentRequest, firstName: e.target.value })} />
                            <Form.Control.Feedback type="invalid">
                                Please choose a first name!
                            </Form.Control.Feedback>
                        </Form.Group >
                        <Form.Group className="mb-3" hasvalidation="true">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" required onChange={(e) => setSaveStudentRequest({ ...saveStudentRequest, email: e.target.value })} />
                            <Form.Control.Feedback type="invalid">
                                Please choose an email!
                            </Form.Control.Feedback>
                        </Form.Group >

                        <Form.Group className="mb-3" hasvalidation="true">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" required onChange={(e) => setSaveStudentRequest({ ...saveStudentRequest, password: e.target.value })} />
                            <Form.Control.Feedback type="invalid">
                                Please choose a password!
                            </Form.Control.Feedback>
                        </Form.Group>

                    </div>
                    <div className="col-md-6">

                        <Form.Group className="mb-3" hasvalidation="true">

                            <Form.Label>Series</Form.Label>
                            <Form.Select onChange={(e) => { setSelectedSeries(e.target.value); setSaveStudentRequest({ ...saveStudentRequest, series: e.target.value }) }} required>
                                <option></option>
                                {
                                    seriesClasses.map(item => {
                                        return <option key={item.series}>{item.series}</option>
                                    })
                                }
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                Please choose a series!
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" hasvalidation="true">
                            <Form.Label>Classes</Form.Label>
                            <Form.Select required onChange={(e) => setSaveStudentRequest({ ...saveStudentRequest, class: e.target.value })}>
                                <option></option>
                                {

                                    seriesClasses
                                        .find(item => item.series === selectedSeries)?.classes
                                        .map(class_ => {
                                            return <option key={class_}>{class_}</option>
                                        })
                                }
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                Please choose a class!
                            </Form.Control.Feedback>
                        </Form.Group>

                    </div>

                    <Container className="d-flex justify-content-center mt-2">
                        <Button variant="primary" type="submit" className="w-50 ">
                            Save student
                        </Button>


                    </Container>
                    <Container className="w-50" >
                        {
                            showAlert && <Alert message="Student successfully saved!" bgColor={"green"} />
                        }
                    </Container>


                </Form >
            </Container >
        </>
    )
}

export default AddStudent