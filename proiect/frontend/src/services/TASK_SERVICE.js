import axios from 'axios';

const TASK_API_BASE_PATH = 'http://localhost:8080/tasks';


class TASK_SERVICE {

    async getTasksForProject(projectId) {
        return await axios.get(`${TASK_API_BASE_PATH}/project/${projectId}`);
    }

    async saveProgress(requestBody) {
        return await axios.put(`${TASK_API_BASE_PATH}/saveProgress`, requestBody);
    }

}


export default new TASK_SERVICE();





