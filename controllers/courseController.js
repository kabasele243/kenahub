const Course = require('./../models/courseModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');


exports.getAllCourses = catchAsync(async (req, res) => {

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


});


exports.getCourse = catchAsync(async (req, res) => {
    const course = await Course.findById(req.params.id);

    res.status(200).json({
        status: 'success',
        data: {
            course
        }
    })
});



exports.createCourse = catchAsync(async (req, res, next) => {

    const newCourse = await Course.create(req.body)

    res.status(201).json({
        status: 'success',
        data: {
            course: newCourse
        }
    });
});

exports.updateCourse = catchAsync(async (req, res) => {

    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    res.status(200).json({
        status: 'success',
        data: {
            course
        }
    })
});

exports.deleteCourse = catchAsync(async (req, res) => {

    await Course.findByIdAndDelete(req.params.id);
    res.status(204).json({
        status: 'success',
        data: null
    })

})


exports.getCourseStats = catchAsync(async (req, res) => {

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


})
