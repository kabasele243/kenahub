const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'A course must have a title'],
        unique: true,
        trim: true
    },
    instructor: String,
    overview: {
        description: { type: String, required: [true, 'A course must have a description'], trim: true },
        students: { type: Number, trim: true }

    },
    imageCover: {
        type: String,
        required: [true, 'A course must have a cover image']
    },
    keyword: [String],
    QA: [String],
    Announcements: [String],
    Content: [String],
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    }
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;