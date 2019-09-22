const Course = require('./../models/courseModel')


exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();

        res.status(200).json({
            status: 'success',
            requestedAt: req.requestTime,
            results: courses.length,
            data: {
                courses
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
};

exports.getCourse = async (req, res) => {

    try {
        const course = await Course.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                course
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })

    }


};

exports.createCourse = async (req, res) => {
    try {

        const newCourse = await Course.create(req.body)

        res.status(201).json({
            status: 'success',
            data: {
                course: newCourse
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'Invalid data sent'
        })

    }
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
