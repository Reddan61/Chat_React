const usersOnileMethods = require("./../models/usersOnline");



module.exports.checkName = async (req, res) => {
    let name = req.body.name;
    if (usersOnileMethods.getUsersByName(name).length === 0) {
        usersOnileMethods.addNewUserOnline(name);
        res.status(200).json({
           responseCode: 0
        });
    }
    else {
        res.status(200).json({
            responseCode: 1,
            error: "Такое имя уже занято"
        })
    }
};


module.exports.deleteName = async (req,res) => {
    let name = req.body.name;
    usersOnileMethods.deleteUserOnline(name);
    res.status(200).json({
        responseCode: 0
    });
};
