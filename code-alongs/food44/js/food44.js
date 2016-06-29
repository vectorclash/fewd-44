// structure

var results = document.querySelector('.results');

function init() {
	//loadRestaurants(json.objects);
	loadJSON(loadRestaurants);
}

// update page

function loadRestaurants(restaurants) {
	restaurants.forEach(createRestaurant);
}

function createRestaurant(restaurant, index) {
	var restaurantLi = document.createElement("li");
	var restaurantName = document.createElement("h2");
	var restaurantAddress = document.createElement("p");
	var restaurantPhone = document.createElement("a");

	restaurantName.textContent = restaurant.name;
	restaurantAddress.textContent = restaurant.street_address;
	restaurantPhone.textContent = restaurant.phone;
	restaurantPhone.href = "tel:" + restaurant.phone.replace(/[^\/\d]/g,'');

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

function loadJSON(callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'https://api.locu.com/v1_0/venue/search/?name=pizza&api_key=0a5e07596109debc309c578a09b967f576900d87', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            //callback(xobj.responseText);
            console.log(xobj.responseText);
          }
    };
    xobj.send(null);  
 }