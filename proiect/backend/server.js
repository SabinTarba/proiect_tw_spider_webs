import express from 'express';
import { Professor } from './entity/Professor.js';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


/*
   API -> Entity: Professor
*/

const PROFESSOR_API_BASE_PATH = 'professors';

app.get(`/${PROFESSOR_API_BASE_PATH}`, (req, res) => {

    Professor.findAll().then((data) => res.send(data));

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

    Professor.update(req.body, {
        where: {
            id: id
        }
    }).then(() => res.send({ status: "SUCCESS" })).catch(() => res.send({ status: "FAILURE" }));
})

















/*
   PORNIRE SERVER -> PORT: 8080
*/
app.listen(8080);



// GET ALL, GET BY ID, POST, PUT(BY ID), DELETE BY ID

