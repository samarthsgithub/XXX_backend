const express = require('express');
const router = express.Router();

const usersController = require('../controllers/user_controllers');



router.post('/create',usersController.sendOtp);
router.post('/verify',usersController.verify);
router.post('/create-session',usersController.createSession);


module.exports = router;