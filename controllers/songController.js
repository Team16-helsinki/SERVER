const { Song } = require('../models');
var randomWords = require('random-words');
var axios = require("axios").default;

class SongController {
  static createSong(req, res, next) {
    console.log(`URL: ${req.originalUrl}`);

    Song.create(req.body)
      .then(() => res.status(201).json({ data: { title: req.body.title, url: req.body.url }, message: `Success create ${req.body.title} song` }))
      .catch(err => next(err))
  };

  static readSong(req, res, next) {
    console.log(`URL: ${req.originalUrl}`);

    Song.findAll()
      .then(data => res.status(200).json({ data: data, message: `Success read ${data.length} song` }))
      .catch(err => next(err))
  };

  static getSongAPI(req, res, next){
    let arrSong = []
    var options = {
        method: 'GET',
        url: 'https://genius.p.rapidapi.com/search',
        params: { q: `${randomWords()}` },
        headers: {
            'x-rapidapi-key': 'db7eb81bc9msh91d6e1977a4c744p1cf8b9jsne547d593c306',
            'x-rapidapi-host': 'genius.p.rapidapi.com'
        }
    };

    axios.request(options).then(function (response) {
        let arrResult = response.data.response.hits
        arrResult.forEach(element => {
            let song = {
                path: element.result.api_path,
                title: element.result.title,
                url: '',
            }
            arrSong.push(song)
        });
        // return arrSong
        res.status(200).json(arrSong)
      })
    .catch(error => {
      console.log(error)
    })
      
  }
  
  
};

module.exports = SongController;