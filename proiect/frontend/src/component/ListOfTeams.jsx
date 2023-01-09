import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import { getLoggedUser } from '../utils/auth';
import { useEffect } from 'react';
import PROFESSOR_SERVICE from '../services/PROFESSOR_SERVICE.js';
import TEAM_SERVICE from '../services/TEAM_SERVICE.js';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MdDelete } from 'react-icons/md';
import { SlPeople } from 'react-icons/sl';
import { BsFlag } from 'react-icons/bs';
import Form from 'react-bootstrap/Form';



const ListOfTeams = () => {

    const loggedUser = getLoggedUser();
    const [professorTeams, setProfessorTeams] = useState({});

    const [showDialogDeleteOneTeam, setShowDialogDeleteOneTeam] = useState(false);
    const [showDialogDeleteAllTeams, setShowDialogDeleteAllTeams] = useState(false);
    const [showDialogTeammates, setShowDialogTeammates] = useState(false);
    const [showDialogSetLeader, setShowDialogSetLeader] = useState(false);

    const [hasTeams, setHasTeams] = useState();
    const [teamStudents, setTeamStudents] = useState([]);
    const [leaderId, setLeaderId] = useState();
    const [currentTeamId, setCurrenTeamId] = useState();



    const setLeaderForTeam = (teamId, studentId) => {
        TEAM_SERVICE.setLeader(teamId, studentId).then(res => {
            if (res.status === 200)
                window.location.reload();
        })
    }

    const deleteTeam = (id) => {
        TEAM_SERVICE.deleteTeamById(id).then(res => {
            if (res.status !== 200) {
                alert("Something went wrong!");
            }
            else {
                window.location.reload();
            }
        })
    }

    const deleteAllTeams = (professorId) => {
        TEAM_SERVICE.deleteProfessorTeams(professorId).then(res => {
            if (res.status === 200) {
                if (!res.data.rowsAffected) {
                    alert("Something went wrong in delete process!");
                }
                else {
                    window.location.reload();
                }
            }
        })
    }

    const getStudentsByTeam = (id) => {
        TEAM_SERVICE.getStudentsByTeam(id).then(res => {

            if (res.status === 200)
                setTeamStudents(res.data);
        })
    }

    useEffect(() => {
        PROFESSOR_SERVICE.getAllTeams(loggedUser?.id).then(res => {
            setProfessorTeams(res.data);
            if (res.data.teams.length !== 0)
                setHasTeams(true);
            else setHasTeams(false);
        })
    }, [loggedUser?.id])


    const generateFinalGrades = () => {
        PROFESSOR_SERVICE.generateFinalGrade(loggedUser?.id).then(res => {
            if (res.status === 200 && res.data.status === "SUCCESS")
                alert("Final grades have been generated!");
        })
    }


    return (
        <Container className="mt-5">

            <Container className="mb-4 d-flex justify-content-between">
                <Button className={`${hasTeams ? "" : "d-none"}`} variant="danger" size={25} onClick={() => setShowDialogDeleteAllTeams(true)} cursor="pointer">Delete all teams</Button>

                {
                    showDialogDeleteAllTeams &&
                    <Modal show={showDialogDeleteAllTeams} onHide={() => setShowDialogDeleteAllTeams(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Confirmation dialog</Modal.Title>
                        </Modal.Header>
                        <Modal.Body><p>Are you sure you want to delete all teams?</p>
                            <p>A new team generation will be required after that!</p></Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowDialogDeleteAllTeams(false)}>
                                No
                            </Button>
                            <Button variant="danger" onClick={() => { setShowDialogDeleteAllTeams(false); deleteAllTeams(loggedUser?.id) }}>
                                Yes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                }

                {
                    new Date() > new Date().setDate(new Date(loggedUser?.generalDueDate).getDate() + 3) && hasTeams
                    &&
                    <Button className="text-white" variant="warning" onClick={() => generateFinalGrades()}>Generate final grades</Button>

                }

            </Container>

            {
                hasTeams &&
                <Table striped bordered hover responsive>
                    <thead>
                        <tr className="text-center">
                            <th>#ID</th>
                            <th>Team name</th>
                            <th>Number of students</th>
                            <th>Team leader (student id)</th>
                            <th>Professor full name</th>
                        </tr>
                    </thead>
                    <tbody>


                        {
                            professorTeams?.teams?.map(team => {
                                return <tr className="text-center" key={team.id}>
                                    <td>{team.id}</td>
                                    <td>{team.name}</td>
                                    <td>{team.noStudents}</td>
                                    <td>{team.leaderId}</td>
                                    <td>{professorTeams.lastName + " " + professorTeams.firstName}</td>
                                    <td className="d-flex justify-content-around">

                                        <MdDelete color="red" size={25} onClick={() => { setShowDialogDeleteOneTeam(true); setCurrenTeamId(team.id) }} cursor="pointer"></MdDelete>

                                        <Modal show={showDialogDeleteOneTeam} onHide={() => setShowDialogDeleteOneTeam(false)}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Confirmation dialog</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body><p>Are you sure you want to delete this team?</p></Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={() => setShowDialogDeleteOneTeam(false)}>
                                                    No
                                                </Button>
                                                <Button variant="danger" onClick={() => { setShowDialogDeleteOneTeam(false); deleteTeam(currentTeamId) }}>
                                                    Yes
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>


                                        <SlPeople color="green" size={20} onClick={() => { setShowDialogTeammates(true); getStudentsByTeam(team.id); setCurrenTeamId(team.id) }} cursor="pointer"></SlPeople>

                                        <Modal show={showDialogTeammates} onHide={() => { setShowDialogTeammates(false) }} size="lg"
                                            aria-labelledby="contained-modal-title-vcenter"
                                            centered>
                                            <Modal.Header closeButton>
                                                <Modal.Title id="contained-modal-title-vcenter">
                                                    Team no. {teamStudents?.id} - {teamStudents?.name} - STUDENTS ({teamStudents?.students?.length})

                                                </Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <ul>
                                                    {teamStudents?.students?.map(student =>
                                                        <li>{`${student.lastName} ${student.firstName}, ${student.email},${student.class}${student.series}`}</li>
                                                    )}
                                                </ul>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={() => { setShowDialogTeammates(false) }}>
                                                    Close
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>



                                        <BsFlag color='orange' size={20} cursor="pointer" onClick={() => { setShowDialogSetLeader(true); getStudentsByTeam(team.id); setCurrenTeamId(team.id) }}></BsFlag>

                                        <Modal show={showDialogSetLeader} onHide={() => { setShowDialogSetLeader(false) }} size="lg"
                                            aria-labelledby="contained-modal-title-vcenter"
                                            centered>
                                            <Modal.Header closeButton>
                                                <Modal.Title id="contained-modal-title-vcenter">
                                                    Choose leader for team {teamStudents?.name} (no. {teamStudents?.id})

                                                </Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <Form.Select onChange={(e) => setLeaderId(Number(e.target.value))}>
                                                    <option>Choose student</option>
                                                    {teamStudents?.students?.map(student => {
                                                        return <option key={student.id} value={student.id}>{student.firstName + " " + student.lastName}</option>
                                                    })}

                                                </Form.Select>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="success" onClick={() => { setShowDialogSetLeader(false); setLeaderForTeam(currentTeamId, leaderId) }}>
                                                    Submit
                                                </Button>
                                                <Button variant="danger" onClick={() => { setShowDialogSetLeader(false) }}>
                                                    Cancel
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>


                                    </td>
                                </tr>
                            })
                        }

                    </tbody>
                </Table>
            }


            {
                !hasTeams &&
                <h3 className="text-red">You haven't generated teams yet! Press on "Generate teams" button in order to do that!</h3>
            }


        </Container >
    )
}

export default ListOfTeams