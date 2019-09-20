const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'A course must have a title'],
        unique: true
    },
    professor: String,
    summary: {
        type: String,
        required: [true, 'A course must have a summary']
    }
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;