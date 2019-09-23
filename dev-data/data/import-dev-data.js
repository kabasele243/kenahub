const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Course = require('./../../models/courseModel');

dotenv.config({ path: './config.env' })

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => console.log('DB connection successfully'));

const courses = JSON.parse(fs.readFileSync(`${__dirname}/courses.json`, 'utf-8'));

const importData = async () => {
    try {
        await Course.create(courses);
        console.log('Data successfully loaded!')
    } catch (err) {
        console.log(err)
    }
    process.exit();
}


const deleteData = async () => {
    try {
        await Course.deleteMany();
        console.log('Data successfully deleted');

    } catch (err) {
        console.log(err);
    }
    process.exit();
}

if (process.argv[2] === '--import') {
    importData();
} else if (process.argv[2] === '--delete') {
    deleteData();
}

