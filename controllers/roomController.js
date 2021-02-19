const { Room } = require('../models');

class RoomController {
  static createRoom (req, res, next) {
    console.log(`URL: ${req.originalUrl}`);

    Room.create(req.body)
      .then(() => res.status(201).json({ data: { name: req.body.name }, message: `Success create ${req.body.name} room` }))
      .catch(err => next(err))
  };

  static readRoom (req, res, next) {
    console.log(`URL: ${req.originalUrl}`);

    Room.findAll()
      .then(data => res.json({ data: data, message: `Success read ${data.length} rooms` }))
      .catch(err => next(err))
  };
};

module.exports = RoomController;