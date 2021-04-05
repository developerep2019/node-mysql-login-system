const db = require('../database/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');
const { promisify } = require('util');
dotenv.config({ path: path.join(process.mainModule.path, '.env') });

const register = (req, res, next) => {
    console.log(req.body);
    const { name, email, password, passwordConfirm } = req.body;
    db.query('SELECT email FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) {
            console.log(err);
        }
        if (results.length > 0) {
            return res.render('register', { msg: `${email} already in use` });
        }
        else if (password !== passwordConfirm) {
            return res.render('register', { msg: "Password doesn't match" });
        }
        else {
            let hashedPassword = await bcrypt.hash(password, 8);
            console.log(hashedPassword);
            db.query('INSERT INTO users (name, email, password) VALUES (? , ?, ?)', [name, email, hashedPassword])
            res.redirect('/')
        }
    })
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).render('login', { msg: "email or password Can't be empty" })
        }

        db.query('SELECT * FROM users WHERE email = ?', [email], async (err, [user]) => {
            if (!user || !(await bcrypt.compare(password, user.password))) {
                res.status(401).render('login', { msg: "Email or password is incorrect" })
            } else {
                const id = user.id;
                const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                })
                console.log(`The token is ${token}`);
                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRE * 60 * 1000
                    ),
                    httpOnly: true
                }
                res.cookie('jwt', token, cookieOptions);
                res.status(200).redirect('/profile');
            }
        });


    }
    catch (error) {
        console.log(error);
    }
}

//isLoggedIn is a middleware
const isLoggedIn = async (req, res, next) => {
    if (req.cookies.jwt) {
        try {
            //verifying the token
            const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);

            //check if the user is still exists
            db.query('SELECT * FROM users WHERE id = ?', [decoded.id], (err, [user]) => {
                if (!user) {
                    return next();
                } else {
                    req.user = user;
                    return next();
                }
            });
        }
        catch (err) {
            console.log(err)
            next();
        }
    };

    if (!req.cookies.jwt) {
        next();
    }
};

const logout = (req, res, next) => {
    res.cookie('jwt', 'logout', {
        expires: new Date(Date.now + 1000),
        httpOnly: true
    });
    res.status(200).redirect('/')
}

module.exports.register = register;
module.exports.login = login;
module.exports.isLoggedIn = isLoggedIn;
module.exports.logout = logout