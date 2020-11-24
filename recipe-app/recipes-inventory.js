let count = 0;

function nextId(){
  count++;
  return count;
}


 const recipes = {
	"0": {
	author: "Sarah",
	title: "Seafood Pasta", 
	ingredients: [
		"3 tablespoons olive oil",
		"1/2 cup onion",
		"2 teaspoons garlic",
		"1/4 teaspoon crushed red pepper", 
		"28 ounce can San Marzano Whole Tomatoes",
		"salt and pepper",
		"2 tablespoons butter",
		"12 ounces spaghetti",
		"1/2 pound shrimp",
		"1/2 pound sea scallops",
		"1/2 pound clams",
		"1/2 pound mussels",
		"2 tablespoons parsley",
	], 
	instructions: [
		"Heat 2 tablespoons of the olive oil in a large pan over medium heat. Add the onions and cook for 4-5 minutes or until softened. Add the garlic and cook for 1 more minute.",
		"Stir in the red pepper flakes (optional), then add the pureed tomatoes. Season with salt and pepper to taste.",
		"Bring to a simmer and cook for 20 minutes or until sauce has just started to thicken. Stir in the butter, then remove the sauce from the heat.",
		"While the sauce is simmering, cook the spaghetti in a large pot of salted water according to package directions.",
		"Drain the pasta, reserving 3/4 cup of the pasta cooking liquid.",
		"Heat the remaining tablespoon of olive oil in a large pan over high heat. Season the scallops with salt and pepper, then add them to the pan.",
		"Cook the scallops for 1-2 minutes per side or until browned and opaque.",
		"Remove the scallops from the pan. Season the shrimp with salt and pepper and add them to the pan. Cook for 3-4 minutes or until pink and opaque.",
		"Cover and cook for 4-6 minutes or until clams and mussels have opened. Discard any shells that did not open.",
		"Add the shrimp and scallops back to the pan along with the tomato sauce and spaghetti. Toss to coat everything with the sauce.",
		"Sprinkle with parsley, then serve.",
	],
	}

};

module.exports = {
    recipes,
    nextId,
};