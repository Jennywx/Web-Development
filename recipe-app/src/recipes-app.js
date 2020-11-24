'use strict';

import {
    getHomePage,
    getLogIn,
    getLoginPage,
    getRecipe,
    getNewRecipe,
    getRecipeContent,
    getLogout,

} from './services';

const homeButton = document.querySelector('.home');
const recipeList = document.querySelector('.recipes');
const navigationContainer = document.querySelector('.navigation-panel');
const displayContainer = document.querySelector('.display-panel');
const status = document.querySelector('.status');

const errorMessage = {
    'network-error': 'No connection to the network!',
    'missing-field': 'Please fill out all the fields.',
    'invalid-username': 'Sorry, dog is not allowed.',
    'missing-username': 'Please enter your username.',
    'unauthorized-user':'Unauthorized access! No uid or invalid uid in cookies. ',
};

getHomePage()
.then((res) => {
    showHomePage(res);
})
.catch((err) => {
    updateErrorStatus(err);
});

function updateErrorStatus(err){
    status.innerHTML = errorMessage[err.code] || err.code;
};

function clearErrorStatus(){
    status.innerHTML="";
};


function showLoginPage(){
    if(!userLoginState.loggedInFlag){
        navigationContainer.innerHTML = `
        <input class="username" type="text" name="text"placeholder="Enter Username" >
        <button class="submit-login">Submit</button>
        `;
        displayContainer.innerHTML = "";
        displayContainer.append(status);
    }  
};

function showNavigation(){
    if(userLoginState.loggedInFlag){
        navigationContainer.innerHTML = `
        <div class="welcome">
        <span>Welcome ${userLoginState.user}! You may add your recipes now. </span>
        </div>
        <button class="add-recipe">Add New Recipe</button>
        <button class="logout">Logout</button>
        `;
    }else{
        navigationContainer.innerHTML = `
            <button class="login">Login</button>
        `;
    }
    navigationContainer.append(homeButton);
    resetDisplayContainer();
};

function showRecipeList(recipe){
    resetDisplayContainer();
    const recipes = Object.keys(recipe).map(
    (key) => {
    return`
        <li>
            <span data-id="${key}" class="recipe-list">${recipe[key].title}</span>
            <span class = "author" data-id="${key}"> [Posted by : ${recipe[key].author}]</span>
        </li>`;
    }).join('\n');

    recipeList.innerHTML = recipes;
};


function renderRecipe(recipe){
    displayContainer.innerHTML = `
        <div><span class="display-title">${recipe.title}</span></div>
        <div><span class="display-author">Author: ${recipe.author}</span></div>
        <div><div class="display-ingredients">Ingredients</div><span class="details-area">${recipe.ingredients}</span></div>
        <div><div class="display-instructions">Instructions</div><span class="details-area">${recipe.instructions}</span></div>
    `;
};

function showAddRecipe(){
    if(userLoginState.loggedInFlag){
        displayContainer.innerHTML = `
            <input type="text" class="recipe-title" placeholder="Add Recipe Title">
            <div><textarea class="ingredients" cols="50" rows="25" placeholder="Add Ingredients"></textarea></div>
            <div><textarea class="instructions" cols="50" rows="25"placeholder="Add Instructions"></textarea></div>
            <div><button class="submit-recipe">Submit Recipe</button></div>
        `;
        displayContainer.append(status);
    }
};

function resetDisplayContainer(){
    displayContainer.innerHTML = " ";
    displayContainer.append(recipeList);
    displayContainer.append(status);
};


const userLoginState = {
    loggedInFlag : false,
    user : "",
};

function showHomePage(response){    
    if(response.uid){
        userLoginState.loggedInFlag = true;
        userLoginState.user = response.username;
    }else{
        userLoginState.loggedInFlag = false;
    }
    clearErrorStatus();
    showNavigation();
    showRecipeList(response.recipeList);
};



displayContainer.addEventListener('click', (event) => {
    const id = event.target.dataset.id;
    event.preventDefault();
    if(event.target.classList.contains('submit-recipe')){
        addNewRecipe();
    }

    if(event.target.classList.contains('recipe-list')){
        showRecipe(id);
    }
});

function showRecipe(id){
    getRecipeContent(id)
    .then((recipe) => {
        renderRecipe(recipe);
    })
    .catch((err) =>{
        updateErrorStatus(err);
    })
};


function addNewRecipe(){
    let title = document.querySelector('.recipe-title').value;
    let ingredients = document.querySelector('.ingredients').value;
    let instructions = document.querySelector('.instructions').value;

    getNewRecipe(title, userLoginState.user, ingredients, instructions)
    .then((id) => {
        showRecipe(id);
    })  
    .catch((err) => {
        updateErrorStatus(err);
    })  
};

navigationContainer.addEventListener('click', (event) =>{

    if(event.target.classList.contains('home')){
        getReturnToHomePage();
    }

    if(event.target.classList.contains('login')){
        getUserLogin();
    }

    if(event.target.classList.contains('logout')){
        getUserLogout();
    }

    if(event.target.classList.contains('add-recipe')){
        getRecipePage();
    }

    if(event.target.classList.contains('submit-login')){
        getUserLoggedInPage();
    }

});


function getReturnToHomePage(){
    getHomePage()
    .then((response) => {
        showHomePage(response);
    })
    .catch((err) => {
        updateErrorStatus(err);
    });
};

function getRecipePage(){
    getRecipe()
    .then(() => {
        showNavigation();
        showAddRecipe();
    })
    .catch((err) => {
        updateErrorStatus(err);
    })
};

function getUserLoggedInPage(){
    const selectedUsername = document.querySelector('.username');
    const username = selectedUsername.value;
    getLogIn(username)
    .then( (allRecipes) => {
        userLoginState.loggedInFlag = true;
        userLoginState.user = username;
        showNavigation();
        showRecipeList(allRecipes);
        clearErrorStatus();
    })
    .catch( (err) => {
        selectedUsername.value = "";
        updateErrorStatus(err);
    });
};

function getUserLogin(){
    getLoginPage()
    .then(() => {
        showLoginPage();
    })
    .catch((err) => {
        updateErrorStatus(err);
    });
};

function getUserLogout(){
    getLogout()
    .then((allRecipes) => {
        userLoginState.loggedInFlag = false;
        showNavigation();
        showRecipeList(allRecipes);
    })
    .catch( (err) => {
        updateErrorStatus(err);
    });
};