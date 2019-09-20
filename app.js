const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

// 1) MIDDLEWARES
app.use(morgan('dev'));

app.use(express.json());


app.use((req, res, next) => {
    console.log('Hello from the middleware');
    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})

const courses = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/courses.json`));


// 2) ROUTES HANDLERS
const getAllCourses = (req, res) => {
    console.log(req.requestTime);

    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
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

const getAllStudents = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    })
}

const getStudent = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    })
}

const createStudent = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    })
}

const updateStudent = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    })
}

const deleteStudent = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    })

}


// 3) ROUTES



const courseRouter = express.Router();
const studentRouter = express.Router();


courseRouter
    .route('/')
    .get(getAllCourses)
    .post(createCourse);

courseRouter
    .route('/:id')
    .get(getCourse)
    .patch(updateCourse)
    .delete(deleteCourse);

studentRouter
    .route('/')
    .get(getAllStudents)
    .post(createStudent);

studentRouter
    .route('/:id')
    .get(getStudent)
    .patch(updateStudent)
    .delete(deleteStudent);

app.use('/api/v1/courses', courseRouter);
app.use('/api/v1/students', studentRouter);

// 4) SERVER
const port = 3500;
app.listen(port, () => {
    console.log(`App running on port ${port}...`)
})