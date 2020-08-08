const express = require("express");
const router = express.Router();
const contorllers = require('../controllers/auth');


router.post("/register",contorllers.register);
router.get('/test',contorllers.test);

module.exports = router;