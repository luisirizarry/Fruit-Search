const input = document.querySelector("#fruit");
const suggestions = document.querySelector(".suggestions ul");

const fruit = ["Apple", "Apricot", "Avocado 🥑", "Banana", "Bilberry", "Blackberry", "Blackcurrant", "Blueberry", "Boysenberry", "Currant", "Cherry", "Coconut", "Cranberry", "Cucumber", "Custard apple", 
	"Damson", "Date", "Dragonfruit", "Durian", "Elderberry", "Feijoa", "Fig", "Gooseberry", "Grape", "Raisin", "Grapefruit", "Guava", "Honeyberry", "Huckleberry", "Jabuticaba", "Jackfruit", "Jambul", 
	"Juniper berry", "Kiwifruit", "Kumquat", "Lemon", "Lime", "Loquat", "Longan", "Lychee", "Mango", "Mangosteen", "Marionberry", "Melon", "Cantaloupe", "Honeydew", "Watermelon", "Miracle fruit", "Mulberry", 
	"Nectarine", "Nance", "Olive", "Orange", "Clementine", "Mandarine", "Tangerine", "Papaya", "Passionfruit", "Peach", "Pear", "Persimmon", "Plantain", "Plum", "Pineapple", "Pomegranate", "Pomelo", "Quince", 
	"Raspberry", "Salmonberry", "Rambutan", "Redcurrant", "Salak", "Satsuma", "Soursop", "Star fruit", "Strawberry", "Tamarillo", "Tamarind", "Yuzu"];

function search(str) {
	let results = [];

	// Filters the fruits that include the str, while also checking for upper and lower case
	const fruitFilter = fruit.filter(currFruit => 
        currFruit.toLowerCase().includes(str.toLowerCase())
    );

	results = fruitFilter;

	return results;
}

function searchHandler(e) {
	// Grab the users current word
	const inputVal = e.target.value;

	// search for the word in the fruit array, and return the filtered results
	const results = search(inputVal);

	// Show suggestions
	showSuggestions(results, inputVal);

	// Clear suggestions if the input is empty
    if (inputVal === '') {
        suggestions.classList.remove('has-suggestions');
    }
}

function showSuggestions(results, inputVal) {
	// Clears suggestions from before
    suggestions.innerHTML = "";

	// As long as there are results, show the suggestions
    if (results.length > 0) {
        results.forEach((result) => {
            const li = document.createElement("li");
			// Find the index where the inputVal starts
            const index = result.toLowerCase().indexOf(inputVal.toLowerCase());

			// Split result into 3 parts, two normal, and the inputVal
            const beforeMatch = result.slice(0, index);
            const match = result.slice(index, index + inputVal.length);
            const afterMatch = result.slice(index + inputVal.length);

			// Join the 3 strings
			// Got the idea for the tags from here https://www.shecodes.io/athena/7273-create-a-bold-word-in-javascript-using-the-b-tag#:~:text=You%20can%20create%20a%20bold,See%20example%20below.
            li.innerHTML = `${beforeMatch}<b>${match}</b>${afterMatch}`;

			// Since the text for the li wont be the fruit name because of the bold tags,
			// its easier to just have the fruit name in a dataset for later
            li.dataset.value = result;

			// Append li
            suggestions.appendChild(li);
        });
		// If there are suggestions, add the class so that they show
        suggestions.classList.add("has-suggestions");
    } 
}

function useSuggestion(e) {
	// Takes the value of the li, and puts that value into the search bar
	if (e.target.tagName === "LI") {
		// Grab fruit name from the data set from earlier
        input.value = e.target.dataset.value;
		// Clear suggestions
        suggestions.innerHTML = "";
    }
}



input.addEventListener("keyup", searchHandler);
suggestions.addEventListener("click", useSuggestion);
