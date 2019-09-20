const express = require('express');
const morgan = require('morgan');

const courseRouter = require('./routes/courseRoutes');
const studentRouter = require('./routes/studentRoutes');

const app = express();

// 1) MIDDLEWARES
app.use(morgan('dev'));

app.use(express.json());


app.use((req, res, next) => {
    console.log('Hello from the middleware');
    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})

// 3) ROUTES

app.use('/api/v1/courses', courseRouter);
app.use('/api/v1/students', studentRouter);

module.exports = app;