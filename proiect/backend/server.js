import express from 'express';
import { Professor } from './entity/Professor.js';
import { Student } from './entity/Student.js';
import { Team } from './entity/Team.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Project } from './entity/Project.js';
import { Task } from './entity/Task.js';



const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
    cors({ origin: ['http://localhost:3000'] })
);



app.get(`/data/professors`, async (req, res) => {
    const professors = [
        {
            lastName: "Tarba",
            firstName: "Sabin",
            email: "sabintarba01@gmail.com",
            password: "parola mea"
        },
        {
            lastName: "Stoica",
            firstName: "Oana",
            email: "stoicaoan@gmail.com",
            password: "parola oana"
        },
        {
            lastName: "Ionescu",
            firstName: "Vlad",
            email: "vladionescu@gmail.com",
            password: "321dsaasda"
        }
    ];

    try {
        for (let professor of professors)
            await Professor.create(professor);

        res.send({ message: "SUCCESS" });

    }
    catch (ex) {
        res.send({ message: "SOMETHING WENT WRONG" });
    }





})

app.get(`/data/students`, async (req, res) => {
    const students = [
        {
            lastName: "Toma",
            firstName: "Laurentiu",
            email: "tomalaurentiustud@gmail.com",
            password: "oparolafoartebunajij1",
            class: "1091",
            series: "E",
            professorId: 1
        },
        {
            lastName: "Mihalache",
            firstName: "Andrei",
            email: "mihalacheandreitud@gmail.com",
            password: "parolastudMiha",
            class: "1088",
            series: "D",
            professorId: 1
        },
        {
            lastName: "Popescu",
            firstName: "Alina",
            email: "popescualinastud@gmail.com",
            password: "oslkc#@!a",
            class: "1085",
            series: "C",
            professorId: 1
        },
        {
            lastName: "Davidescu",
            firstName: "Maria",
            email: "davidescumariastud@gmail.com",
            password: "studemyjde",
            class: "1078",
            series: "C",
            professorId: 1
        },
        {
            lastName: "Gheorghe",
            firstName: "Gigel",
            email: "gheorgegigelstud@gmail.com",
            password: "ghgigel",
            class: "1092",
            series: "E",
            professorId: 1
        },
        {
            lastName: "Marin",
            firstName: "Andreea",
            email: "marinandreeastud@gmail.com",
            password: "mandreea12",
            class: "1093",
            series: "F",
            professorId: 1
        }
    ];


    try {
        for (let student of students)
            await Student.create(student);

        res.send({ message: "SUCCESS" });

    }
    catch (ex) {
        res.send({ message: "SOMETHING WENT WRONG" });
    }
})

/*
   API -> Entity: Professor
*/




const PROFESSOR_API_BASE_PATH = 'professors';

app.get(`/${PROFESSOR_API_BASE_PATH}`, (req, res) => {

    Professor.findAll().then((professors) => res.send(professors));

})

app.get(`/${PROFESSOR_API_BASE_PATH}/students`, (req, res) => {
    Professor.findAll({ include: { model: Student } }).then((professorsStudents) => {
        res.send(professorsStudents);
    })
})



app.get(`/${PROFESSOR_API_BASE_PATH}/:id`, (req, res) => {
    const id = req.params.id;

    Professor.findByPk(id).then((professor) => professor != null ? res.send(professor) : res.send({ status: "No data found!" }));
})

app.delete(`/${PROFESSOR_API_BASE_PATH}/:id`, (req, res) => {
    const id = req.params.id;

    Professor.destroy({
        where: {
            id: id
        }
    })
        .then((rowsAffected) => res.send({ rowsAffected: rowsAffected }));
})


app.post(`/${PROFESSOR_API_BASE_PATH}`, (req, res) => {
    Professor.create(req.body).then(() => res.send({ status: "SUCCESS" })).catch(() => res.send({ status: "FAILURE" }));
})


app.put(`/${PROFESSOR_API_BASE_PATH}/:id`, (req, res) => {
    const id = req.params.id;

    if (id instanceof Number) {
        Professor.update(req.body, {
            where: {
                id: id
            }
        }).then(() => res.send({ status: "SUCCESS" })).catch(() => res.send({ status: "FAILURE" }));
    }
    else {
        res.send({ status: "ID is not a number" })
    }
})


app.get(`/${PROFESSOR_API_BASE_PATH}/:id/students`, (req, res) => {

    const id = req.params.id;

    Professor.findByPk(id, { include: [{ model: Student }] }).then((professorStudents) => {
        res.send(professorStudents);
    });
})

app.get(`/${PROFESSOR_API_BASE_PATH}/:id/teams`, (req, res) => {
    const id = req.params.id;

    Professor.findByPk(id, { include: [{ model: Team }] }).then((professorTeams) => {
        res.send(professorTeams);
    });
})

app.post(`/${PROFESSOR_API_BASE_PATH}/auth`, async (req, res) => {
    const { email, password } = req.body;


    const professor = await Professor.findOne({ where: { email: email, password: password } });

    if (professor) {
        res.send({ authResponse: "ACCEPTED", user: professor })
    }
    else res.send({ authResponse: "DENIED" })

})


/*
   API -> Entity: Student
*/

const STUDENT_API_BASE_PATH = 'students';

app.get(`/${STUDENT_API_BASE_PATH}`, (req, res) => {

    Student.findAll().then((students) => res.send(students));

})


app.get(`/${STUDENT_API_BASE_PATH}/:id`, (req, res) => {
    const id = req.params.id;

    Student.findByPk(id).then((student) => student != null ? res.send(student) : res.send({ status: "No data found!" }));
})


app.delete(`/${STUDENT_API_BASE_PATH}/:id`, (req, res) => {
    const id = req.params.id;

    Student.destroy({
        where: {
            id: id
        }
    })
        .then((rowsAffected) => res.send({ rowsAffected: rowsAffected }));
})


app.post(`/${STUDENT_API_BASE_PATH}`, (req, res) => {
    Student.create(req.body).then(() => res.send({ status: "SUCCESS" })).catch(() => res.send({ status: "FAILURE" }));
})


app.put(`/${STUDENT_API_BASE_PATH}/:id`, (req, res) => {
    const id = req.params.id;

    Student.update(req.body, {
        where: {
            id: id
        }
    }).then(() => res.send({ status: "SUCCESS" })).catch(() => res.send({ status: "FAILURE" }));
})

app.get(`/${STUDENT_API_BASE_PATH}/series/:series`, (req, res) => {
    const series = req.params.series;

    Student.findAll({ where: { series: series } }).then((studentsBySeries) => res.send(studentsBySeries));

})

app.get(`/${STUDENT_API_BASE_PATH}/class/:class`, async (req, res) => {
    const class_ = req.params.class;

    await Student.findAll({ where: { class: class_ } }).then((studentsByClass) => res.send(studentsByClass));

})

app.get(`/${STUDENT_API_BASE_PATH}/team/:class`, async (req, res) => {
    const class_ = req.params.class;

    await Student.findAll({ where: { class: class_ } }).then((studentsByClass) => res.send(studentsByClass));

})

app.post(`/${STUDENT_API_BASE_PATH}/auth`, async (req, res) => {
    const { email, password } = req.body;

    const student = await Student.findOne({ where: { email: email, password: password } });

    if (student) {
        res.send({ authResponse: "ACCEPTED", user: student })
    }
    else res.send({ authResponse: "DENIED" })

})


app.put(`/${STUDENT_API_BASE_PATH}/auth/changePassword`, (req, res) => {
    const { id, newPassword } = req.body;

    Student.update(
        {
            password: newPassword,
            firstLogin: false
        },
        { where: { id: id } }
    ).then(() => res.send({ status: "SUCCESS" })).catch(() => res.send({ status: "FAILURE" }));
})




/*
   API REQUEST FOR GENERATE TEAMS
*/

const teamNameList = ["Ain't Nothing But a Work Crew", "Weekend Warriors", "The Avengers", "Team Canada", "We Are The Champions", "Bright Reds", "We Will Smash You"];

app.get(`/${PROFESSOR_API_BASE_PATH}/generateTeams/:professorId/:option`, async (req, res) => {

    try {


        const profId = Number(req.params.professorId);
        const requiredNoStudentsPerTeam = Number(req.params.option);

        let students = await Student.findAll({ where: { professorId: profId }, raw: true });
        const noTotalStudents = students.length;

        const noTeamsResulted = Math.trunc(noTotalStudents / requiredNoStudentsPerTeam); // complete teams
        const lastTeamNoStudents = noTotalStudents % requiredNoStudentsPerTeam;

        // if "noTotalStudents/requiredNoStudentsPerTeam" is directly integer (perfect division)
        // then we won't have an inceomplete team and the number of teams is the result of division
        // otherwise we'll have number of COMPLETE teams = result of division + 1 INCOMPLETE team
        const add1ForIncompleteTeamIfCase = lastTeamNoStudents !== 0 ? 1 : 0;


        var teams = [];


        //get teams ready for inserting
        for (let i = 0; i < noTeamsResulted + add1ForIncompleteTeamIfCase; i++)
            if (i != noTeamsResulted || lastTeamNoStudents === 0) {
                teams.push({
                    name: teamNameList[(i + 5) * 120 % teamNameList.length],
                    noStudents: requiredNoStudentsPerTeam,
                    professorId: profId
                })
            }
            else {
                teams.push({
                    name: teamNameList[(i + 5) * 120 % teamNameList.length],
                    noStudents: lastTeamNoStudents,
                    professorId: profId
                })
            }


        //insert the team in database
        for (let i = 0; i < noTeamsResulted + add1ForIncompleteTeamIfCase; i++)
            await Team.create(teams[i])

        //get the last id of the team
        let lastTeamId = await Team.max('id');

        //variable to track how many students have been assigned to a team
        let assignedStudents = 0;


        //assign the students to the above created teams
        for (let i = teams.length - 1; i >= 0; i--) {
            for (let j = assignedStudents; j < assignedStudents + teams[i].noStudents; j++) {
                Student.update(
                    { teamId: lastTeamId },
                    { where: { id: students[j].id } }
                );
            }

            lastTeamId--;
            assignedStudents += teams[i].noStudents;
        }

        res.status(200).json({ successMessage: "GENERATED" });
    }
    catch (err) {
        console.log(err);
        res.status(501).json({ errorMessage: err });
    }
}

)



/*
   API -> Entity: Team
*/

const TEAM_API_BASE_PATH = 'teams';

app.get(`/${TEAM_API_BASE_PATH}`, (req, res) => {
    Team.findAll().then((teams) => res.send(teams));
})

app.delete(`/${TEAM_API_BASE_PATH}/:id`, (req, res) => {
    const id = req.params.id;

    Team.destroy({
        where: {
            id: id
        }
    })
        .then((rowsAffected) => res.send({ rowsAffected: rowsAffected }));
})

app.delete(`/${TEAM_API_BASE_PATH}/professor/:professorId`, (req, res) => {
    const professorId = req.params.professorId;

    Team.destroy({
        where: {
            professorId: professorId
        }
    })
        .then((rowsAffected) => res.send({ rowsAffected: rowsAffected }));
})

app.get(`/${TEAM_API_BASE_PATH}/:id/students`, (req, res) => {
    const teamId = req.params.id;

    Team.findByPk(teamId,
        { include: { model: Student } }
    )
        .then((teamStudents) => res.send(teamStudents));
})

app.get(`/${TEAM_API_BASE_PATH}/:id`, (req, res) => {
    const id = req.params.id;

    Team.findByPk(id).then((team) => team != null ? res.send(team) : res.send({ status: "No data found!" }));
})


app.post(`/${TEAM_API_BASE_PATH}/setLeader`, (req, res) => {
    const { teamId, studentId } = req.body;

    Team.update(
        { leaderId: studentId },
        { where: { id: teamId } }
    ).then(() => res.send({ status: "SUCCESS" }))
        .catch(() => res.send({ status: "FAILURE" }))

})


/*
   API -> Entity: Project
*/
const PROJECT_API_BASE_PATH = 'projects';


app.get(`/${PROJECT_API_BASE_PATH}`, (req, res) => {

    Project.findAll().then((projects) => res.send(projects));

})


app.get(`/${PROJECT_API_BASE_PATH}/:id`, (req, res) => {
    const id = req.params.id;

    Project.findByPk(id).then((project) => project != null ? res.send(project) : res.send({ status: "No data found!" }));
})


app.delete(`/${PROJECT_API_BASE_PATH}/:id`, (req, res) => {
    const id = req.params.id;

    Project.destroy({
        where: {
            id: id
        }
    })
        .then((rowsAffected) => res.send({ rowsAffected: rowsAffected }));
})


app.post(`/${PROJECT_API_BASE_PATH}`, async (req, res) => {

    try {
        await Project.create(req.body).then(newProject => {
            for (let i = 0; i < newProject.noTasks; i++) {
                Task.create({
                    taskNumber: i + 1, dueDate: new Date("2024-01-01"), projectId: newProject.id
                });
            }
        })



        res.send({ status: "SUCCESS" });
    }
    catch (ex) {
        res.send({ error: ex, status: "FAILURE" });
    }



})


app.get(`/${PROJECT_API_BASE_PATH}/team/:teamId`, (req, res) => {

    try {
        let teamId = Number(req.params.teamId);

        Project.findOne({ where: { teamId: teamId }, include: [{ model: Task }] }).then((project) => project != null ? res.send(project) : res.send({ status: "No data found!" }));
    }
    catch (ex) {
        console.log(ex);
        res.send({ error: ex })
    }

})


/*
   API -> Entity: Task
*/

const TASK_API_BASE_PATH = 'tasks';

app.get(`/${TASK_API_BASE_PATH}/project/:projectId`, (req, res) => {
    try {
        const projectId = Number(req.params.projectId);

        Task.findAll({ where: { projectId: projectId } }).then(tasks => tasks !== null ? res.send(tasks) : res.send({ status: "No data found!" }));
    }
    catch (ex) {
        res.send({ error: ex });
    }
});

app.put(`/${TASK_API_BASE_PATH}/saveProgress`, (req, res) => {
    try {
        const { taskNumber, projectId, link, linkType, comment, dueDate } = req.body;

        Task.update(
            {
                link: link,
                linkType: linkType,
                comment: comment,
                dueDate: dueDate,
                dueDateAlreadyUpdated: true
            },
            {
                where: {
                    taskNumber: taskNumber,
                    projectId: projectId
                }
            }
        ).then(arrayResponse => res.send({ rowsAffected: arrayResponse[0] }));
    }
    catch (ex) {
        res.send({ error: ex });
    }
});


/*
   PORNIRE SERVER -> PORT: 8080
*/
app.listen(8080);