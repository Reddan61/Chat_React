const express = require("express");
const router = express.Router();
const contorllers = require('../controllers/auth');


router.post("/checkUserName",contorllers.checkName);
router.post("/deleteUserName",contorllers.deleteName);

module.exports = router;