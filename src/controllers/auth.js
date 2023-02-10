const User = require('../models/user');

const bcrypt = require('bcryptjs');

exports.postSignup = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;

    User.findOne({ email: email })
        .then( async userCheck => {
            if (userCheck) {
                return res.status(303).json({
                    message: 'user:' + email + '. already exist'
                })
            } else {
                try {
                    const {name, email, password} = req.body;
                    const hash = await bcrypt.hash(password, 10);

                    const user = await User({
                        name: name,
                        email: email,
                        password: hash,
                    });
                    user.save()
                        .then(r => {
                            res.status(201).json({
                                message: 'user created'
                            });
                        })
                        .catch(err => {
                            console.log(err);
                        })
                } catch (e) {
                    console.log(e);
                    res.status(500).send('something my be broke')
                }
            }

        })
};

exports.postLogin = (req, res, next) => {
    
};