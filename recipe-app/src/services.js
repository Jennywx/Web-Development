export const getHomePage = () => {
    return fetch('/home', {
        method: 'GET',
      })
      .catch( () => {
        return Promise.reject({code: 'network-error'});
      })
      .then( (response) => {
            if (!response.ok) {
                return response.json().then(result => Promise.reject(result));
            }
            console.log(response);
            return response.json();
        });
};

export const getLogIn = (username) => {
    return fetch('/session', {
        method: 'POST',
        headers: new Headers({
        'content-type': 'application/json',
        }),
        body: JSON.stringify({ username }),
    })
    .catch( () => {
        return Promise.reject({code: 'network-error'});
    })
    .then( (response) => {
            if (!response.ok) {
                return response.json().then(result => Promise.reject(result));
            }
            return response.json();
        });
};

export const getLoginPage = () => {
    return fetch('/session', {
        method: 'GET',
      })
      .catch( () => {
        return Promise.reject({code: 'network-error'});
      })
      .then( (response) => {
            if (!response.ok) {
                return response.json().then(result => Promise.reject(result));
            }
            return response.json();
        });
};

export const getLogout = () => {
    return fetch('/session', {
        method : 'DELETE',
    })
    .catch( () => {
        return Promise.reject({code: 'network-error'});
    })
    .then( (response) => {
            if (!response.ok) {
                return response.json().then(result => Promise.reject(result));
            }
            return response.json();
        });     
};

export const getRecipe = () => {
    return fetch('/recipe', {
        method : 'GET',
    })
    .catch( () => {
        return Promise.reject({code: 'network-error'});
    })
    .then( (response) => {
            if (!response.ok) {
                return response.json().then(result => Promise.reject(result));
            }
            return response.json();
        });   
};

export const getNewRecipe = (title, author, ingredients, instructions) => {
    return fetch('/recipe', {
        method: 'POST',
        headers: new Headers({
        'content-type': 'application/json',
        }),
        body: JSON.stringify({ title, author, ingredients, instructions }),
    })
    .catch( () => {
        return Promise.reject({code: 'network-error'});
    })
    .then( (response) => {
            if (!response.ok) {
                return response.json().then(result => Promise.reject(result));
            }
            return response.json();
        });
};

export const getRecipeContent = (id) => {
	console.log("Enter getFetchRecipeDetails");
    return fetch(`/recipe/${id}`, {
        method : 'GET',
    })
    .catch( () => {
        return Promise.reject({code: 'network-error'});
    })
    .then( (response) => {
            if (!response.ok) {
                return response.json().then(result => Promise.reject(result));
            }
            console.log(response);
            return response.json();
        });
};