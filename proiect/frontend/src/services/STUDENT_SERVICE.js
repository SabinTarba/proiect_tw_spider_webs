import axios from 'axios';

const STUDENT_API_BASE_PATH = 'http://localhost:8080/students';


class STUDENT_SERVICE {

    async getAllStudents() {
        return await axios.get(STUDENT_API_BASE_PATH);
    }

    async getStudentById(id) {
        return await axios.get(`${STUDENT_API_BASE_PATH}/${id}`);
    }

    async deleteStudentById(id) {
        return await axios.delete(`${STUDENT_API_BASE_PATH}/${id}`)
    }

    async sendAuthRequest(body) {
        return await axios.post(`${STUDENT_API_BASE_PATH}/auth`, body);
    }

    async saveStudent(student) {
        return await axios.post(`${STUDENT_API_BASE_PATH}`, student);
    }

}

export default new STUDENT_SERVICE();





