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
}

export default new PROFESSOR_SERVICE();





