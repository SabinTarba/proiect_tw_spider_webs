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

    Professor.findAll().then((data) => res.send(data));

})

app.get(`/${PROFESSOR_API_BASE_PATH}/students`, (req, res) => {
    Professor.findAll({ include: { model: Student } }).then((professorsStudents) => {
        res.send(professorsStudents);
    })
})

app.get(`/${PROFESSOR_API_BASE_PATH}/:id`, (req, res) => {
    const id = req.params.id;


    Professor.findByPk(id).then((data) => data != null ? res.send(data) : res.send({ status: "No data found!" }));
})

app.delete(`/${PROFESSOR_API_BASE_PATH}/:id`, (req, res) => {
    const id = req.params.id;

    Professor.destroy({
        where: {
            id: id
        }
    })
        .then((data) => res.send({ rowsAffected: data }));
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

app.post(`/${PROFESSOR_API_BASE_PATH}/auth`, (req, res) => {
    const { email, password } = req.body;

    Professor.findOne({ where: { email: email, password: password } }).then((professor) => {

        professor != null ? res.send({ authResponse: "ACCEPTED" }) : res.send({ authResponse: "DENIED" })
    })
})


/*
   API -> Entity: Student
*/

const STUDENT_API_BASE_PATH = 'students';

app.get(`/${STUDENT_API_BASE_PATH}`, (req, res) => {

    Student.findAll().then((data) => res.send(data));

})


app.get(`/${STUDENT_API_BASE_PATH}/:id`, (req, res) => {
    const id = req.params.id;

    Student.findByPk(id).then((data) => data != null ? res.send(data) : res.send({ status: "No data found woth this id!" }));
})


app.delete(`/${STUDENT_API_BASE_PATH}/:id`, (req, res) => {
    const id = req.params.id;

    Student.destroy({
        where: {
            id: id
        }
    })
        .then((data) => res.send({ rowsAffected: data }));
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
    }).then(() => res.send({ status: "SUCCESS" })).catch(() => res.send({ status: "FAILURE ON update" }));
})

app.get(`/${STUDENT_API_BASE_PATH}/series/:series`, (req, res) => {
    const series = req.params.series;

    Student.findAll({ where: { series: series } }).then((students) => res.send(students));

})

app.get(`/${STUDENT_API_BASE_PATH}/class/:class`, (req, res) => {
    const class_ = req.params.class;

    Student.findAll({ where: { class: class_ } }).then((students) => res.send(students));

})













/*
   PORNIRE SERVER -> PORT: 8080
*/
app.listen(8080);



// GET ALL, GET BY ID, POST, PUT(BY ID), DELETE BY ID

