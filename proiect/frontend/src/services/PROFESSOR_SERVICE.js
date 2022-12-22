import axios from 'axios';

const PROFESSOR_API_BASE_PATH = 'http://localhost:8080/professors';


class PROFESSOR_SERVICE {

    async getAllProfessors() {
        return await axios.get(PROFESSOR_API_BASE_PATH);
    }

    async getProfessorById(id) {
        return await axios.get(`${PROFESSOR_API_BASE_PATH}/${id}`);
    }

    async deleteProfessorById(id) {
        return await axios.delete(`${PROFESSOR_API_BASE_PATH}/${id}`)
    }

    async sendAuthRequest(body) {
        return await axios.post(`${PROFESSOR_API_BASE_PATH}/auth`, body);
    }

    async getAllStudents(id) {
        return await axios.get(`${PROFESSOR_API_BASE_PATH}/${id}/students`);
    }

    async getAllTeams(id) {
        return await axios.get(`${PROFESSOR_API_BASE_PATH}/${id}/teams`)
    }

    async generateTeams(professorId, option) {
        return await axios.get(`${PROFESSOR_API_BASE_PATH}/generateTeams/${professorId}/${option}`);
    }


}

export default new PROFESSOR_SERVICE();





