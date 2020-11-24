const game = require('./game');
const player = require('./player-data');

function getWordList() {
     return game.wordList.map(word => {
        return `
        <ul>${word}</ul>`
      }).join("\n");
};

function wordListPanel() {
	return `
        <div class="wordListPanel">
            <h1>Word List</strong></h1>
        <div class="board">`
        +
        getWordList()
        +
        `</div>
        </div>`;
}

 function guessForm() {
    return `
      <div class="guessForm">
        <form action="/guess" method="POST">
          <input type="text" name="guessedWord" placeholder="Please enter a word"/>
          <button type="submit">Guess</button>
        </form>
      </div>`
};

function restartGameForm() {
	return `
		<form align="center" action="/restartGame" method="POST">
             <input align="center" type="submit" name="restartGame" value="restart this round"/>
    	</form>
	`
}

function guessedWordCorrect(uuid) {
	return `
    <h3><strong> Words that you got them correct:</strong></h3>
    <div class="board">`
    +
    player.playerInfo[uuid].wordsGuessedRight.map(word =>{
    return `<ul>${word}</ul>`
    }).join("\n")
    +
    `</div>
    `
};

function guessedWordIncorrect(uuid) {
	return `
    <h3><strong>Words that you tried:</strong></h3>
    <div class="board">`
    + 
    player.playerInfo[uuid].wordsGuessedWrong.map(wrongWord => {
    return `<ul>${wrongWord}</ul>`
    }).join("\n")
    +    
    `</div>
    `
};

function gamePage(uuid) {
    return `
      <!doctype html>
      <html>
        <head>
        <link rel="stylesheet" type="text/css" href="/game-web.css"/>
          <title>Game</title>
        </head>
        <body>
              ${wordListPanel()}
              ${guessedWordCorrect(uuid)}
              ${guessedWordIncorrect(uuid)}
              ${guessForm()}
              ${restartGameForm()}
        </body>
      </html>
  `;
  };

  module.exports = {gamePage};