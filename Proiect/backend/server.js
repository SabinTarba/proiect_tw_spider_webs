import express from 'express';
import { Profesor } from './entity/Profesor.js';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


/*
   API -> Entity: PROFESOR
*/

const PROFESOR_API_PATH = 'profesori';

app.get(`/${PROFESOR_API_PATH}`, (req, res) => {

    Profesor.findAll().then((data) => res.send(data));

})

app.get(`/${PROFESOR_API_PATH}/:id`, (req, res) => {
    const id = req.params.id;

    Profesor.findByPk(id).then((data) => res.send(data));
})

app.delete(`/${PROFESOR_API_PATH}/:id`, (req, res) => {
    const id = req.params.id;

    Profesor.destroy({
        where: {
            id: id
        }
    })
        .then((data) => res.send({ rowsAffected: data }));
})


app.post(`/${PROFESOR_API_PATH}`, (req, res) => {
    Profesor.create(req.body).then(() => res.send({ status: "SUCCESS" })).catch(() => res.send({ status: "FAILURE" }));
})


app.put(`/${PROFESOR_API_PATH}/:id`, (req, res) => {
    const id = req.params.id;

    Profesor.update(req.body, {
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

