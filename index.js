
//dependecies
const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
const app = express();
const cookieParser = require('cookie-parser');

//Routes
const pagesRoute = require('./routes/pages.route');
const authRoute = require('./routes/auth.route');

dotenv.config({ path: './.env' });
app.set('view engine', 'ejs');

//Middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

//Routes in middleware
app.use(pagesRoute);
app.use('/auth', authRoute)



app.listen(3000, () => console.log('server running on port 3000'))