const express = require('express');
const cookieParser = require('cookie-parser');
const uuid = require('uuid').v4;
const users = require('./users');
const recipes = require('./recipes-inventory');
const PORT = 3000;
const app = express();

app.use(cookieParser());
app.use(express.static('./public'));

app.get('/home', (req, res) => {
    const uid = req.cookies.uid;
    if( !uid || !users.users[uid] ) {
        res.status(200).json( {'recipeList': recipes.recipes} );
        return;
    }
    res.status(200).json({'recipeList': recipes.recipes, 'uid': uid, 'username': users.users[uid].username});
});


app.get('/session', (req, res) => {
    res.status(200).json(recipes.recipes);
 });


app.post('/session', express.json(), (req, res) => {
    const username = req.body.username;
    if(!username || username.trim() === "") {
      res.status(401).json( { 
      	code: 'missing-username'
      } );
      return;
    }
    if (username === 'dog' || username === 'DOG') {
    	 res.status(403).json( { 
      	code: 'invalid-username'
      } );
      return;
    }
    const uid = uuid();
    users.users[uid] = { username, uid };
    res.cookie('uid', uid);
    res.json(recipes.recipes);
  });

app.get('/recipe', (req, res) => {
   const uid = req.cookies.uid;
   if(!uid || !users.users[uid] ){
       res.status(401).json( {code : 'unauthorized-user'} );
       return;
   }
   res.json(uid);
});
  
app.delete('/session', (req,res) =>{
    const uid = req.cookies.uid;
    if(!uid || !users.users[uid] ) {
       res.status(401).json( {code : 'unauthorized-user'} );
       return;
    }
    delete users.users[uid];
    res.clearCookie('uid');
    res.json(recipes.recipes);
});
 
app.get('/recipe/:id', (req, res) => {
   const id = req.params.id;
   const recipeId = recipes.recipes[id];
   res.json(recipeId);
});
 
app.post('/recipe', express.json(), (req, res) => {
    const uid = req.cookies.uid;
    if(!uid || !users.users[uid] ){
       res.status(401).json( {code : 'unauthorized-user'} );
       return;
    }
    const {title, author, ingredients, instructions} = req.body;

    if(!title || !ingredients || !instructions || title.trim()=== "" || instructions.trim()=== "" || ingredients.trim()===""){
       res.status(404).json( {code : 'missing-field'} );
       return;
    }
    const id = recipes.nextId();
    recipes.recipes[id] = { title, author, ingredients, instructions };
    res.json(id);
 });
 

 
 app.listen(PORT, () => console.log(`running on http://localhost:${PORT}`));
