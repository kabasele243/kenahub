const fs = require('fs');
const express = require('express');

const app = express();
app.use(express.json());
// app.get('/', (req, res) => {
//     res.status(200).json({ message: 'Hello from the server!', app: 'natours' });
// });

const courses = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/courses.json`));

app.get('/api/v1/courses', (req, res) => {
    res.status(200).json({
        status: 'success',
        results: courses.length,
        data: {
            courses
        }
    })
})

app.post('/api/v1/courses', (req, res) => {

    const newId = courses[courses.length - 1].id + 1;
    const newCourse = Object.assign({ id: newId }, req.body);

    courses.push(newCourse);

    fs.writeFile(`${__dirname}/dev-data/data/courses.json`, JSON.stringify(courses), err => {
        res.status(201).json({
            status: 'success',
            data: {
                course: newCourse
            }
        })
    })


})

app.get('/api/v1/courses/:id', (req, res) => {


    /* To get number out of a string */
    const id = req.params.id * 1;
    const course = courses.find(el => el.id === id);

    // if (id > courses.length) {
    if (!course) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }

    /* Find us a callback function to loops through the object and find value equals to the req.params */


    res.status(200).json({
        status: 'success',
        data: {
            course
        }
    })
    console.log(course);
})

app.patch('/api/v1/courses/:id', (req, res) => {
    console.log(res.params.id)
    if (res.params.id * 1 > courses.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }
    res.status(200).json({
        status: 'success',
        data: {
            course: '<Update tour here ...'
        }
    })
})
app.delete('/api/v1/courses/:id', (req, res) => {


    if (res.params.id * 1 > courses.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }
    res.status(204).json({
        status: 'success',
        data: null
    })
})

const port = 3500;
app.listen(port, () => {
    console.log(`App running on port ${port}...`)
})