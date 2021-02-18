const { Song } = require('../models');

class SongController {
  static createSong (req, res, next) {
    console.log(`URL: ${req.originalUrl}`);

    Song.create(req.body)
      .then(() => res.status(201).json({ data: { title: req.body.title, url: req.body.url }, message: `Success create ${req.body.title} song` }))
      .catch(err => next(err))
  };

  static readSong (req, res, next) {
    console.log(`URL: ${req.originalUrl}`);

    Song.findAll()
      .then(data => res.status(200).json({ data: data, message: `Success read ${data.length} song` }))
      .catch(err => next(err))
  };

  
};

module.exports = SongController;