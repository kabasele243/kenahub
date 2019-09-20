const fs = require('fs');

const courses = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/courses.json`));


exports.checkID = (req, res, next, val) => {
    console.log(`Course id is: ${val}`);
    if (req.params.id * 1 > courses.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }
    next();
}


exports.checkBody = (req, res, next) => {
    if (!req.body.title || !req.body.professor) {
        return res.status(400).json({
            status: 'fail',
            message: 'Missing Title or Professor'
        })
    }
    next();
}

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
    const id = req.params.id * 1;
    const course = courses.find(el => el.id === id);

    res.status(200).json({
        status: 'success',
        data: {
            course
        }
    });

};

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
    res.status(200).json({
        status: 'success',
        data: {
            course: '<Update tour here ...'
        }
    })
};

exports.deleteCourse = (req, res) => {
    res.status(204).json({
        status: 'success',
        data: null
    })
}
