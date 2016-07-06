// structure

var results = document.querySelector('.results');
var search = document.querySelector('input');

// event listeners

function init() {
	search.addEventListener("change", onInputEnter);
}

// update page

function loadMovies(movies) {
	results.innerHTML = "";
	movies.forEach(createMovie);
}

function createMovie(movie, index) {
	var movieLi = document.createElement('li');
	var title = document.createElement('h2');
	var year = document.createElement('p');
	var image = document.createElement('img');
	var link = document.createElement('a');

	title.textContent = movie.Title;
	year.textContent = movie.Year;
	image.src = movie.Poster;
	link.href = "http://www.imdb.com/title/" + movie.imdbID;
	link.target = "_blank";

	link.appendChild(image);
	movieLi.appendChild(link);
	movieLi.appendChild(title);
	movieLi.appendChild(year);

	results.appendChild(movieLi);

	TweenMax.from(movieLi, 1, {alpha:0, x:-500+Math.random()*1000, y:-250+Math.random()*500, delay:index*0.02, ease:Bounce.easeOut});
}

// event handlers

function onInputEnter(e) {
	//console.log(e.target.value);
	var baseURL = "http://www.omdbapi.com/?";
	var url = baseURL + "s=" + e.target.value; 
	$.getJSON(url, loadJSON);
	e.target.value = "";
}

function loadJSON(data) {
	console.log(data);
	loadMovies(data.Search);
}