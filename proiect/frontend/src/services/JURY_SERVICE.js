import axios from 'axios';

const JURY_API_BASE_PATH = 'http://localhost:8080/juries';


class JURY_SERVICE {

    async setGrade(studentId, teamId, grade) {
        return await axios.post(`${JURY_API_BASE_PATH}/grade`, { studentId: studentId, teamId: teamId, grade: grade });
    }

}


export default new JURY_SERVICE();





