const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => console.log('DB successfull'));

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

const testCourse = new Course({
    title: 'Psychology',
    professor: 'Kabasele',
    summary: 'Nous parlons de psychology de'
});

testCourse
    .save()
    .then(doc => { console.log(doc) })
    .catch(err => { console.log('ERROR :', err) });

const port = process.env.PORT || 3500;
app.listen(port, () => {
    console.log(`App running on port ${port}...`)
})