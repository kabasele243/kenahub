const fs = require('fs');

const courses = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/courses.json`));

exports.getAllCourses = (req, res) => {
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

exports.getCourse = (req, res) => {
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
exports.createCourse = (req, res) => {

    const newId = courses[courses.length - 1].id + 1;
    const newCourse = Object.assign({ id: newId }, req.body);

    courses.push(newCourse);

    fs.writeFile(`${__dirname}/../dev-data/data/courses.json`, JSON.stringify(courses), err => {
        res.status(201).json({
            status: 'success',
            data: {
                course: newCourse
            }
        })
    })


};

exports.updateCourse = (req, res) => {
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

exports.deleteCourse = (req, res) => {
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
