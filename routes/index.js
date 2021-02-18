const router = require('express').Router();
const SongController = require('../controllers/songController');
const QuizController = require('../controllers/quizController');
const RoomController = require('../controllers/roomController');

router.get('/', RoomController.readRoom);
router.post('/', SongController.createSong);
router.get('/song', SongController.readSong);
router.get('/quiz', QuizController.createQuiz);
router.post('/room/create', RoomController.createRoom);
router.get('/api/song', SongController.getSongAPI)

module.exports = router;