import axios from 'axios';

const TEAM_API_BASE_PATH = 'http://localhost:8080/teams';


class TEAM_SERVICE {

    async getAllTeams() {
        return await axios.get(TEAM_API_BASE_PATH);
    }

    async deleteTeamById(id) {
        return await axios.delete(`${TEAM_API_BASE_PATH}/${id}`)
    }

    async deleteProfessorTeams(professorId) {
        return await axios.delete(`${TEAM_API_BASE_PATH}/professor/${professorId}`)
    }

    async getStudentsByTeam(teamId) {
        return await axios.get(`${TEAM_API_BASE_PATH}/${teamId}/students`);

    }

    async getTeamById(id) {
        return await axios.get(`${TEAM_API_BASE_PATH}/${id}`);
    }

    async setLeader(teamId, studentId) {
        return await axios.post(`${TEAM_API_BASE_PATH}/setLeader`, { teamId: teamId, studentId: studentId });
    }
}


export default new TEAM_SERVICE();





