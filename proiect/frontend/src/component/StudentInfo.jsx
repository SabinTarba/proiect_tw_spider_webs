import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/esm/Container'
import PROFESSOR_SERVICE from '../services/PROFESSOR_SERVICE';
import TEAM_SERVICE from '../services/TEAM_SERVICE';
import { getLoggedUser } from '../utils/auth'

const StudentInfo = () => {
    const loggedUser = getLoggedUser();
    const [professor, setProfessor] = useState();
    const [team, setTeam] = useState({});
    const [teamStudents, setTeamStudents] = useState([]);

    useEffect(() => {
        PROFESSOR_SERVICE.getProfessorById(loggedUser?.professorId).then(res => {

            if (res.status === 200)
                setProfessor(res.data);

        }
        )


        TEAM_SERVICE.getTeamById(loggedUser?.teamId).then(res => {
            if (res.status === 200)
                setTeam(res.data);
        })

        TEAM_SERVICE.getStudentsByTeam(loggedUser?.teamId).then(res => {
            if (res.status === 200) {
                setTeamStudents(res.data.students);
            }

        })



    }, [loggedUser?.professorId, loggedUser?.teamId]);


    return (
        <Container className="mt-5 h4">
            <h1 className="mb-5 fw-bold">General Information</h1>
            <ul>
                <li>Last name: <span className="text-info">{loggedUser?.lastName}</span></li>
                <li>First name: <span className="text-info">{loggedUser?.firstName}</span></li>
                <li>Series: <span className="text-info">{loggedUser?.series}</span></li>
                <li>Class: <span className="text-info">{loggedUser?.class}</span></li>
                <li>Professor: <span className="text-info">{professor?.lastName + " " + professor?.firstName}</span></li>
                <li>Team leader: <span className="text-info">{loggedUser?.id === team.leaderId ? "Yes" : "No"}</span></li>
                <li>Team number: <span className="text-info">{loggedUser?.teamId === null ? "You don't belong to any team! Your professor will generate randomly the teams when all students are registered." : loggedUser?.teamId}</span></li>
                <li>Team name: <span className="text-info">{loggedUser?.teamId === null ? "You don't have a team!" : team.name}</span></li>
                <li>Team students: {" "}
                    <span className="text-info">
                        {
                            teamStudents?.map((student, index) => `${student.lastName} ${student.firstName} ${student.class}${student.series}${index !== teamStudents.length - 1 ? ", " : ""}`)
                        }
                        {
                            teamStudents === undefined ? "N/A" : null
                        }
                    </span>
                </li>
            </ul >


        </Container >
    )
}

export default StudentInfo