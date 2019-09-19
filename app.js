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

const port = 3500;
app.listen(port, () => {
    console.log(`App running on port ${port}...`)
})