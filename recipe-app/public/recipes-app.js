/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/recipes-app.js":
/*!****************************!*\
  !*** ./src/recipes-app.js ***!
  \****************************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services */ "./src/services.js");



var homeButton = document.querySelector('.home');
var recipeList = document.querySelector('.recipes');
var navigationContainer = document.querySelector('.navigation-panel');
var displayContainer = document.querySelector('.display-panel');
var status = document.querySelector('.status');
var errorMessage = {
  'network-error': 'No connection to the network!',
  'missing-field': 'Please fill out all the fields.',
  'invalid-username': 'Sorry, dog is not allowed.',
  'missing-username': 'Please enter your username.',
  'unauthorized-user': 'Unauthorized access! No uid or invalid uid in cookies. '
};
(0,_services__WEBPACK_IMPORTED_MODULE_0__.getHomePage)().then(function (res) {
  showHomePage(res);
})["catch"](function (err) {
  updateErrorStatus(err);
});

function updateErrorStatus(err) {
  status.innerHTML = errorMessage[err.code] || err.code;
}

;

function clearErrorStatus() {
  status.innerHTML = "";
}

;

function showLoginPage() {
  if (!userLoginState.loggedInFlag) {
    navigationContainer.innerHTML = "\n        <input class=\"username\" type=\"text\" name=\"text\"placeholder=\"Enter Username\" >\n        <button class=\"submit-login\">Submit</button>\n        ";
    displayContainer.innerHTML = "";
    displayContainer.append(status);
  }
}

;

function showNavigation() {
  if (userLoginState.loggedInFlag) {
    navigationContainer.innerHTML = "\n        <div class=\"welcome\">\n        <span>Welcome ".concat(userLoginState.user, "! You may add your recipes now. </span>\n        </div>\n        <button class=\"add-recipe\">Add New Recipe</button>\n        <button class=\"logout\">Logout</button>\n        ");
  } else {
    navigationContainer.innerHTML = "\n            <button class=\"login\">Login</button>\n        ";
  }

  navigationContainer.append(homeButton);
  resetDisplayContainer();
}

;

function showRecipeList(recipe) {
  resetDisplayContainer();
  var recipes = Object.keys(recipe).map(function (key) {
    return "\n        <li>\n            <span data-id=\"".concat(key, "\" class=\"recipe-list\">").concat(recipe[key].title, "</span>\n            <span class = \"author\" data-id=\"").concat(key, "\"> [Posted by : ").concat(recipe[key].author, "]</span>\n        </li>");
  }).join('\n');
  recipeList.innerHTML = recipes;
}

;

function renderRecipe(recipe) {
  displayContainer.innerHTML = "\n        <div><span class=\"display-title\">".concat(recipe.title, "</span></div>\n        <div><span class=\"display-author\">Author: ").concat(recipe.author, "</span></div>\n        <div><div class=\"display-ingredients\">Ingredients</div><span class=\"details-area\">").concat(recipe.ingredients, "</span></div>\n        <div><div class=\"display-instructions\">Instructions</div><span class=\"details-area\">").concat(recipe.instructions, "</span></div>\n    ");
}

;

function showAddRecipe() {
  if (userLoginState.loggedInFlag) {
    displayContainer.innerHTML = "\n            <input type=\"text\" class=\"recipe-title\" placeholder=\"Add Recipe Title\">\n            <div><textarea class=\"ingredients\" cols=\"50\" rows=\"25\" placeholder=\"Add Ingredients\"></textarea></div>\n            <div><textarea class=\"instructions\" cols=\"50\" rows=\"25\"placeholder=\"Add Instructions\"></textarea></div>\n            <div><button class=\"submit-recipe\">Submit Recipe</button></div>\n        ";
    displayContainer.append(status);
  }
}

;

function resetDisplayContainer() {
  displayContainer.innerHTML = " ";
  displayContainer.append(recipeList);
  displayContainer.append(status);
}

;
var userLoginState = {
  loggedInFlag: false,
  user: ""
};

function showHomePage(response) {
  if (response.uid) {
    userLoginState.loggedInFlag = true;
    userLoginState.user = response.username;
  } else {
    userLoginState.loggedInFlag = false;
  }

  clearErrorStatus();
  showNavigation();
  showRecipeList(response.recipeList);
}

;
displayContainer.addEventListener('click', function (event) {
  var id = event.target.dataset.id;
  event.preventDefault();

  if (event.target.classList.contains('submit-recipe')) {
    addNewRecipe();
  }

  if (event.target.classList.contains('recipe-list')) {
    showRecipe(id);
  }
});

function showRecipe(id) {
  (0,_services__WEBPACK_IMPORTED_MODULE_0__.getRecipeContent)(id).then(function (recipe) {
    renderRecipe(recipe);
  })["catch"](function (err) {
    updateErrorStatus(err);
  });
}

;

function addNewRecipe() {
  var title = document.querySelector('.recipe-title').value;
  var ingredients = document.querySelector('.ingredients').value;
  var instructions = document.querySelector('.instructions').value;
  (0,_services__WEBPACK_IMPORTED_MODULE_0__.getNewRecipe)(title, userLoginState.user, ingredients, instructions).then(function (id) {
    showRecipe(id);
  })["catch"](function (err) {
    updateErrorStatus(err);
  });
}

;
navigationContainer.addEventListener('click', function (event) {
  if (event.target.classList.contains('home')) {
    getReturnToHomePage();
  }

  if (event.target.classList.contains('login')) {
    getUserLogin();
  }

  if (event.target.classList.contains('logout')) {
    getUserLogout();
  }

  if (event.target.classList.contains('add-recipe')) {
    getRecipePage();
  }

  if (event.target.classList.contains('submit-login')) {
    getUserLoggedInPage();
  }
});

function getReturnToHomePage() {
  (0,_services__WEBPACK_IMPORTED_MODULE_0__.getHomePage)().then(function (response) {
    showHomePage(response);
  })["catch"](function (err) {
    updateErrorStatus(err);
  });
}

;

function getRecipePage() {
  (0,_services__WEBPACK_IMPORTED_MODULE_0__.getRecipe)().then(function () {
    showNavigation();
    showAddRecipe();
  })["catch"](function (err) {
    updateErrorStatus(err);
  });
}

;

function getUserLoggedInPage() {
  var selectedUsername = document.querySelector('.username');
  var username = selectedUsername.value;
  (0,_services__WEBPACK_IMPORTED_MODULE_0__.getLogIn)(username).then(function (allRecipes) {
    userLoginState.loggedInFlag = true;
    userLoginState.user = username;
    showNavigation();
    showRecipeList(allRecipes);
    clearErrorStatus();
  })["catch"](function (err) {
    selectedUsername.value = "";
    updateErrorStatus(err);
  });
}

;

function getUserLogin() {
  (0,_services__WEBPACK_IMPORTED_MODULE_0__.getLoginPage)().then(function () {
    showLoginPage();
  })["catch"](function (err) {
    updateErrorStatus(err);
  });
}

;

function getUserLogout() {
  (0,_services__WEBPACK_IMPORTED_MODULE_0__.getLogout)().then(function (allRecipes) {
    userLoginState.loggedInFlag = false;
    showNavigation();
    showRecipeList(allRecipes);
  })["catch"](function (err) {
    updateErrorStatus(err);
  });
}

;

/***/ }),

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/*! namespace exports */
/*! export getHomePage [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getLogIn [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getLoginPage [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getLogout [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getNewRecipe [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getRecipe [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getRecipeContent [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getHomePage": () => /* binding */ getHomePage,
/* harmony export */   "getLogIn": () => /* binding */ getLogIn,
/* harmony export */   "getLoginPage": () => /* binding */ getLoginPage,
/* harmony export */   "getLogout": () => /* binding */ getLogout,
/* harmony export */   "getRecipe": () => /* binding */ getRecipe,
/* harmony export */   "getNewRecipe": () => /* binding */ getNewRecipe,
/* harmony export */   "getRecipeContent": () => /* binding */ getRecipeContent
/* harmony export */ });
var getHomePage = function getHomePage() {
  return fetch('/home', {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      code: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (result) {
        return Promise.reject(result);
      });
    }

    console.log(response);
    return response.json();
  });
};
var getLogIn = function getLogIn(username) {
  return fetch('/session', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      username: username
    })
  })["catch"](function () {
    return Promise.reject({
      code: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (result) {
        return Promise.reject(result);
      });
    }

    return response.json();
  });
};
var getLoginPage = function getLoginPage() {
  return fetch('/session', {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      code: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (result) {
        return Promise.reject(result);
      });
    }

    return response.json();
  });
};
var getLogout = function getLogout() {
  return fetch('/session', {
    method: 'DELETE'
  })["catch"](function () {
    return Promise.reject({
      code: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (result) {
        return Promise.reject(result);
      });
    }

    return response.json();
  });
};
var getRecipe = function getRecipe() {
  return fetch('/recipe', {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      code: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (result) {
        return Promise.reject(result);
      });
    }

    return response.json();
  });
};
var getNewRecipe = function getNewRecipe(title, author, ingredients, instructions) {
  return fetch('/recipe', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      title: title,
      author: author,
      ingredients: ingredients,
      instructions: instructions
    })
  })["catch"](function () {
    return Promise.reject({
      code: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (result) {
        return Promise.reject(result);
      });
    }

    return response.json();
  });
};
var getRecipeContent = function getRecipeContent(id) {
  console.log("Enter getFetchRecipeDetails");
  return fetch("/recipe/".concat(id), {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      code: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (result) {
        return Promise.reject(result);
      });
    }

    console.log(response);
    return response.json();
  });
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/recipes-app.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=recipes-app.js.map