import axios from 'axios';

const PROJECT_API_BASE_PATH = 'http://localhost:8080/projects';


class PROJECT_SERVICE {

    async getAllProjects() {
        return await axios.get(PROJECT_API_BASE_PATH);
    }

    async deleteProjectById(id) {
        return await axios.delete(`${PROJECT_API_BASE_PATH}/${id}`)
    }

    async getProjectById(id) {
        return await axios.get(`${PROJECT_API_BASE_PATH}/${id}`);
    }

    async saveProject(project) {
        return await axios.post(`${PROJECT_API_BASE_PATH}`, project);
    }

    async getProjectByTeamId(teamId) {
        return await axios.get(`${PROJECT_API_BASE_PATH}/team/${teamId}`);
    }

    async gradeProject(grade, projectId) {
        return await axios.post(`${PROJECT_API_BASE_PATH}/saveGradeForProject`, { grade: grade, id: projectId })
    }

}


export default new PROJECT_SERVICE();





