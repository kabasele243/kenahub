const Course = require('./../models/courseModel')


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
        // results: courses.length,
        // data: {
        //     courses
        // }
    })
};

exports.getCourse = (req, res) => {
    const id = req.params.id * 1;
    // const course = courses.find(el => el.id === id);

    // res.status(200).json({
    //     status: 'success',
    //     data: {
    //         course
    //     }
    // });

};

exports.createCourse = (req, res) => {
    res.status(201).json({
        status: 'success',
        // data: {
        //     course: newCourse
        // }
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
