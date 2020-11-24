const words = require('./words');
const player = require('./player-data');

const wordList = words.wordList.split(/\s+/).filter( exists => !!exists );

function pickAWord(wordList) {
  const randomNumber = Math.floor(Math.random() * wordList.length);
  return wordList[randomNumber];
}

function exactMatch(word, guess) {
  return word.toUpperCase() === guess.toUpperCase(); 
}

function compare( word, guess ) {
  let match = 0;
  myword = word.toUpperCase();
  myguess = guess.toUpperCase();
	for (let i = 0; i < myword.length; i++) {
		for (let j = 0; j < myguess.length; j++) {
			if (myword.charAt(i) === myguess.charAt(j)) {
				myguess = myguess.replace(myguess.charAt(j), '/');
				match++;
				break;
			}
		}
	}

  return match; 
  }

function gameResult(guess, uuid) {
	
  player.playerInfo[uuid].turns++;

  if(player.playerInfo[uuid].word == ""){
    player.playerInfo[uuid].word = pickAWord(wordList);
    console.log(`PSST!  The word is ${player.playerInfo[uuid].word}`);
  }
  if (exactMatch(player.playerInfo[uuid].word, guess)) {	
  	console.log("You won! Next round started.")
    player.playerInfo[uuid].wordsGuessedRight.push(`You guessed ${player.playerInfo[uuid].word} right in ${player.playerInfo[uuid].turns} turns!`);
    return true;
  } else {
  	const match = compare(player.playerInfo[uuid].word, guess);
  	player.playerInfo[uuid].wordsGuessedWrong.push(`${guess} matches ${match} letters with the secret word`);
	}
  return false;
}


function newGame(uuid) {
    player.playerInfo[uuid].wordsGuessedWrong = [];
    player.playerInfo[uuid].word = "";
    player.playerInfo[uuid].turns =  0;
  };

module.exports = {wordList, gameResult, newGame};