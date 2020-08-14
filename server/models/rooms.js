const fs = require('fs');

let rooms = [
   /* {
        id:0,
        nameRoom: 'Test',
        imageSrc: "string"
        users: ['Dima', 'Danil'],
        messages: [{
            user: 'Dima',
            text: 'Hi everyone'
        },
            {
                user: 'Danil',
                text: 'Hi, nice to meet you'
            }]
    }*/
];

module.exports.getRooms = function() {
    return rooms;
};

module.exports.setRoom = (room) => {
    rooms.push(room);
};

module.exports.addUserByRoomId = (id,user) => {
    rooms.forEach((item) => {
        if(item.id === Number(id)) {
            item.users.push(user);
        }
    })
};


module.exports.getRoomById = (id) => {
    let room = rooms.filter((item) => {
       return item.id === Number(id);
    });
    return room;
};

module.exports.addNewMessage = (id,message) => {
    rooms.forEach((item) => {
      if(item.id === id) {
          item.messages.push(message)
      }
  })
};


module.exports.deleteUserFromRoomByName = (userName,roomid) => {
    rooms.forEach((item,index) => {
        if(item.id === roomid) {
            let users = item.users.filter((el) => {
                return el !== userName;
            });
            if(users.length === 0) {
                if(rooms[index].imageSrc){
                    let number = rooms[index].imageSrc.lastIndexOf('/') + 1;
                    fs.unlinkSync(`uploads/${rooms[index].imageSrc.slice(number, rooms[index].imageSrc.length)}`, (e) => {
                        console.log(e);
                    });
                }
                rooms.splice(index,1);
            } else {
                item.users = users;
            }
        }
    });
};


module.exports.setImage = (id,imgSrc) => {
    rooms.forEach(item => {
        if(item.id === id) {
            item.imageSrc = imgSrc;
        }
    });
};


