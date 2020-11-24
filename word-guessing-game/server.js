const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(express.static('./public'));
const PORT = 3000;

const words = require('./words');
const game = require('./game');
const gameWeb = require('./game-web');
const player = require('./player-data');
const invalidWordPage = require('./game-invalid');

const uuidv4 = require('uuid').v4;

app.use(express.urlencoded({ extended: false}));


app.post('/getUserName', express.urlencoded({ extended: false }), (req, res)  => {
	const username = req.body;
	player.username = username;
});

const isValid = function (uuid) {
	if (player.playerInfo[uuid]) {
		return true;
	}
	return false;
}

app.get('/', (req, res) => {
	const uuid = req.cookies.uuid;

	if (!uuid || !isValid(uuid)) {
		res.send(`
		<form action="/login" method="POST">
	 		<input name="username">
	 		<button type="submit">Login</button>
	 	</form>
		`);
		return;
	}
	res.redirect('/game');
});


app.post('/login', (req, res) => {
 	const { username } = req.body;
 	player.setUUID(req.cookies, res, username);
 	uuid = req.cookies.uuid;
 });

app.get('/game',(req,res) => {
  res.send(gameWeb.gamePage(req.cookies.uuid));
});


app.post('/guess', express.urlencoded({ extended: false }), (req, res) => {
	let { guessedWord } = req.body;
	guessedWord = guessedWord.toUpperCase();
	if(guessedWord.length === game.wordList[0].length && game.wordList.includes(guessedWord) && guessedWord){
		result = game.gameResult(guessedWord, req.cookies.uuid);
	    if (result == true) {
	    	//console.log("win! Now play again");
	    	res.redirect('/wonPlayAgain');
	    } else {
	    	res.redirect('/game');
	    }
  	} else {
    	res.send(invalidWordPage.invalidGuess());
    }
});

app.post('/restartGame', express.urlencoded({ extended: false }), (req, res) => {
  const { restartGame } = req.body;
  if(restartGame) {
  	console.log("You restarted this round. A new word will be given.")
    game.newGame(req.cookies.uuid);
    res.redirect("/game");
  };
}); 

app.get('/wonPlayAgain', (req, res) => {
    game.newGame(req.cookies.uuid);
    res.redirect("/game");
});


app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));