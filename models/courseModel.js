const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'A course must have a title'],
        unique: true,
        trim: true,

    },
    slug: String,
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
    },
    passwordChangedAt: Date
});


//DOCUMENT MIDDLEWARE : runs before .save and .create()

courseSchema.pre('save', function (next) {
    this.slug = slugify(this.title, { lower: true });
    next();
});



const Course = mongoose.model('Course', courseSchema);

module.exports = Course;