module.exports = {
    validateRegister: (req, res, next) => {
        // username min length 3
        if (!req.body.username || req.body.username.length < 2) {
            return res.status(400).send({
                msg: 'Please enter a username with min. 2 chars'
            });
        }
        // password min 8 chars
        if (!req.body.password || req.body.password.length < 2) {
            return res.status(400).send({
                msg: 'Please enter a password with min. 2 chars'
            });
        }
        // password (repeat) does not match
        if (!req.body.password_repeat ||
            req.body.password != req.body.password_repeat
        ) {
            return res.status(400).send({
                msg: 'Both passwords must match'
            });
        }
        next();
    }
};