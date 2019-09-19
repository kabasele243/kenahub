const fs = require('fs');
const express = require('express');

const app = express();
app.use(express.json());


const courses = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/courses.json`));

const getAllCourses = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: courses.length,
        data: {
            courses
        }
    })
};

const getCourse = (req, res) => {
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
}
const createCourse = (req, res) => {

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


};

const updateCourse = (req, res) => {
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
};

const deleteCourse = (req, res) => {


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
}

// app.get('/api/v1/courses', getAllCourses);
// app.post('/api/v1/courses', createCourse);
// app.get('/api/v1/courses/:id', getCourse);
// app.patch('/api/v1/courses/:id', updateCourse);
// app.delete('/api/v1/courses/:id', deleteCourse);

app
    .route('/api/v1/courses')
    .get(getAllCourses)
    .post(createCourse);


app
    .route('/api/v1/courses/:id')
    .get(getCourse)
    .patch(updateCourse)
    .delete(deleteCourse);

const port = 3500;
app.listen(port, () => {
    console.log(`App running on port ${port}...`)
})