import express from 'express';
import { Professor } from './entity/Professor.js';
import { Student } from './entity/Student.js';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
    cors({ origin: ['http://localhost:3000'] })
);

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

    Student.findByPk(id).then((student) => student != null ? res.send(student) : res.send({ status: "No data id!" }));
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

app.get(`/${STUDENT_API_BASE_PATH}/class/:class`, (req, res) => {
    const class_ = req.params.class;

    Student.findAll({ where: { class: class_ } }).then((studentsByClass) => res.send(studentsByClass));

})

app.post(`/${STUDENT_API_BASE_PATH}/auth`, async (req, res) => {
    const { email, password } = req.body;

    const student = await Student.findOne({ where: { email: email, password: password } });

    if (student) {
        res.send({ authResponse: "ACCEPTED", user: student })
    }
    else res.send({ authResponse: "DENIED" })

})








/*
   PORNIRE SERVER -> PORT: 8080
*/
app.listen(8080);