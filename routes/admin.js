const express = require('express');
const router = express.Router();
const passport = require('../middlewares/auth');
const AdminController = require('../controllers/AdminController');

router.get('/users', passport.authenticate('jwt', {session: false}), AdminController.users);

module.exports = router;