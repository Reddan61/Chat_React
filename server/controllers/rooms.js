const rooms = require("../models/rooms");

module.exports.getRooms = (req, res) => {
    try {

        res.status(200).json(rooms.getRooms());
    }
    catch (e) {
        console.log(`Rooms get ERROR! ${e}` );
    }
};

module.exports.getRoomByIdRoom = (req, res) => {
    try {
        let idRoom = req.body.id;
        let room = rooms.getRoomById(idRoom);

        res.status(200).json(room);
    } catch (e) {
        console.log(`Error getMessagesByIdRoom ${e}`)
    }
};
