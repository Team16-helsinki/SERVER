const { User } = require('../models');

class UserController {
  static createUser (req, res, next) {
    console.log(`URL: ${req.originalUrl}`);

    User.create(req.body)
      .then(() => res.status(201).json({ data: { username: data.username }, message: `Success create ${req.body.username}` }))
  };
};

module.exports = UserController;