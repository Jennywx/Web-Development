const player = require('./player-data');

function invalidGuess(){
    return `<!DOCTYPE html>
    <html>
    <head>
        <link rel="stylesheet" type="text/css" href="game-web.css" />
        <title>Invalid Guess Page</title>
    </head>
    <body>
        <div id="invalid" align="center">
        <h2>Invalid Word! Please pick a word from the given word list!</h2>
        <form align="center" action="/game" method="GET">
            <button type="submit">Go back</button>
        </form>
    </body>
    </html>
    `;
};

module.exports = {invalidGuess};