let usersOnline = [];



module.exports.getUsersByName = (name) => {
  let user = usersOnline.filter(item => {
      if(item === name) {
          return true
      }
      else {
          return false
      }
  });
  return user
};

module.exports.addNewUserOnline = (name) => {
    usersOnline.push(name);
    console.log(usersOnline)
};

module.exports.deleteUserOnline = (name) => {
    usersOnline.forEach((item,index) => {
        if(item === name) {
            usersOnline.splice(index,1);
        }
    });
};