// structure

var results = document.querySelector('.results');
var search = document.querySelector('input');

// event listeners

search.addEventListener('change', onInputEnter);

function init() {
	restaurantSearch("94115");
}

// update page

function loadRestaurants(restaurants) {
	results.innerHTML = "";
	restaurants.forEach(createRestaurant);
}

function createRestaurant(restaurant, index) {
	var restaurantLi = document.createElement("li");
	var restaurantName = document.createElement("h2");
	var restaurantAddress = document.createElement("p");
	var restaurantPhone = document.createElement("a");

	restaurantName.textContent = restaurant.name;
	restaurantAddress.textContent = restaurant.street_address;
	if(restaurant.phone) {
		restaurantPhone.textContent = restaurant.phone;
		restaurantPhone.href = "tel:" + restaurant.phone.replace(/[^\/\d]/g,'');
	}

	restaurantLi.appendChild(restaurantName);
	restaurantLi.appendChild(restaurantAddress);
	restaurantLi.appendChild(restaurantPhone);
	results.appendChild(restaurantLi);

	// animate items in
	var delayTime = index * 0.2;
	TweenMax.from(restaurantLi, 1, {y:100, alpha:0, ease:Bounce.easeOut, delay:delayTime});
	TweenMax.from(restaurantName, 1, {alpha:0, ease:Quad.easeOut, delay:delayTime});
	TweenMax.from(restaurantAddress, 1, {alpha:0, ease:Quad.easeOut, delay:delayTime+1});
	TweenMax.from(restaurantPhone, 1, {alpha:0, ease:Quad.easeOut, delay:delayTime+1.1});
}

// load json

function restaurantSearch(value) {
	var baseUrl = 'https://api.locu.com/v1_0/venue/search/?api_key=0a5e07596109debc309c578a09b967f576900d87';
	var variables = "&postal_code=" + value;
	var url = baseUrl + variables;
	//$.getJSON(url, loadJSON);
	var script = document.createElement('script');
	script.src = url + "&callback=loadJSON";
	document.body.appendChild(script);
}

function loadJSON(data) {
	//console.log(data.objects);
	loadRestaurants(data.objects);
}

// event handlers

function onInputEnter(e) {
	restaurantSearch(e.target.value);
}