const uuidv4 = require('uuid').v4;

const playerInfo = {

};

//after user login, an uuid will be created and username will be stored to the player dataset
function setUUID(cookies, res, username) {
  let uuid = uuidv4();
  res.cookie('uuid', uuid); 
  playerInfo[uuid] = {
    username: username,
    word: "",
    wordsGuessedRight: [],
    wordsGuessedWrong: [],
    turns: 0,
    uuid: uuid
  };
  console.log(playerInfo);
  res.redirect('/game');
};

module.exports = {setUUID, playerInfo};