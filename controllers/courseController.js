const Course = require('./../models/courseModel')
const APIFeatures = require('./../utils/apiFeatures')

exports.getAllCourses = async (req, res) => {
    try {

        const features = new APIFeatures(Course.find(), req.query).filter().sort().sort().limitFields().paginate();

        const courses = await features.query;

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
            status: 'failure',
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

exports.updateCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        res.status(200).json({
            status: 'success',
            data: {
                course
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
};

exports.deleteCourse = async (req, res) => {
    try {
        await Course.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'success',
            data: null
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}


exports.getCourseStats = async (req, res) => {
    try {
        const stats = await Course.aggregate([
            {
                $group: {
                    _id: null,
                    overview: {
                        student: { $gte: 30 }
                    }
                }
            }
        ]);

        res.status(200).json({
            status: 'success',
            data: {
                stats
            }
        });

    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}
