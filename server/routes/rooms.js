const express = require("express");
const router = express.Router();
const contorllers = require("../controllers/rooms");


router.get('/getRooms', contorllers.getRooms);
router.post('/getRoomById',contorllers.getRoomByIdRoom);

module.exports = router;

