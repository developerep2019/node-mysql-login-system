const getIndex = (req, res, next) => {
    if (req.user) {
        res.render('index', { user: req.user })
    } else {
        res.render('index', { user: null });
    }
}

const getRegister = (req, res, next) => {
    if (req.user) {
        res.redirect('/')
    } else {
        res.render('register', { msg: '', user: null });
    }
}

const getLogin = (req, res, next) => {
    if (req.user) {
        res.redirect('/')
    } else {
        res.render('login', { msg: '', user: null });
    }
}

const getProfile = (req, res, next) => {
    if (req.user) {
        res.render('profile', { user: req.user });
    } else {
        res.redirect('/login');
    }
}

module.exports.getIndex = getIndex;
module.exports.getRegister = getRegister;
module.exports.getLogin = getLogin;
module.exports.getProfile = getProfile;