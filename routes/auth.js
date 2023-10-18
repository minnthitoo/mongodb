const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/AuthController');
const upload = require('../middlewares/upload');

router.post('/register', upload.single('avatar'), AuthController.register);
router.post('/login', AuthController.login);

module.exports = router;