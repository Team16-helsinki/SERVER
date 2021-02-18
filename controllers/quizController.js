const { Song } = require('../models');

class QuizController {
  static createQuiz (req, res, next) {
    console.log(`URL: ${req.originalUrl}`);

    Song.findAll()
      .then(data => {
        let quizzes = [];

        while (quizzes.length < 3) {
          let rand = Math.floor(Math.random() * data.length);
          let quiz = [];

          while (quiz.length < 4) {
            quiz.push(data[rand]);
          
            quiz.forEach(el => {
              while (el.id == rand + 1) rand = Math.floor(Math.random() * data.length);
            });
          };

          quizzes.push(quiz);
        };

        res.status(200).json({ data: quizzes, message: `Success create quiz` });
      })
      .catch(err => next(err))
  };
};

module.exports = QuizController;