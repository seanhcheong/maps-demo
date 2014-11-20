/* app.js -- our application code */

"use strict";

// UW coordinates:
// lat: 47.655
// lng: -122.3080

var mapOptions = {center: {lat:47.655, lng: -122.3080},zoom:14};

var mapElem = document.getElementById('map');

var map = new google.maps.Map(mapElem, mapOptions);

var position = {
	lat:47.655,
	lng: -122.3080
}
var marker = new google.maps.Marker({
	position:position,
	map:map
});


var infoWin = new google.maps.InfoWindow();

function onGeoPos(position) {
	console.log("Lat" + position.coors.latitude);
	console.log("Long" + position.coors.longitude);

	var myLocPos = {
		lat: position.coords.latitude,
		lng:position.coords.longitude
	}

	var myLocation = new google.maps.Marker({
		position: {
			lat: position.coords.latitude,
			lng: position.coords.longitude
		},
		map:map
	});

	infoWin.setContent('<p>Hello World! My lat is ' + position.coords.latitude + ' and my long is ' + position.coords.longitude'</p>'

	);

	infoWin.open(map, myLocation);

	google.maps.event.addListener(myLocation, 'click', onMarkerClick)
}

function onGeoErr(error){
	//enter error code here
}

if(navigator.geolocation){
	navigator.geolocation.getCurrentPosition(onGeoPos, onGeoErr, {enableHighAccuracy: true, maximumAge: 30000});
} else {
	console.log("geolocation not supported");
}

function onMakerClick (){
	map.panTo(this.getPosition());
	infoWin.open(map, this);
}

$.getJSON('http://data.seattle.gov/resource/65fc-btcc.json')
	.done(function(data)){
		console.log(data);
	})
	.fail(function(error)){

	})
	.always(function(error)){

	})
