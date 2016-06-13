var scene;
var camera;
var renderer;

var cubeContainer;
var cubes = new Array();
var cubeNum = 50;

var sliderOne;
var cubeNumberField;
var currentCubes;

function init() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor(0xE3E3E3);
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	document.body.appendChild( renderer.domElement );

	sliderOne = document.querySelector("#slider-one");
	sliderOne.addEventListener("input", onInputChange);
	cubeNumberField = document.querySelector("#cube-number");

	camera.position.z = -500;

	scene = new THREE.Scene();
	scene.fog = new THREE.Fog(0xCCCCCC, 1, 5000);
	scene.add(camera);

	buildElements();

	window.addEventListener("resize", onWindowResize);
	TweenMax.ticker.addEventListener("tick", render);
}

function buildElements() {
	var directionalLight = new THREE.DirectionalLight( 0xffCCff, 1 );
	directionalLight.position.set( 0, 1, 1 );
	directionalLight.castShadow = true;
	scene.add( directionalLight );

	cubeContainer = new THREE.Object3D();
	scene.add(cubeContainer);
	randomContainerMovement(cubeContainer);

	for(var i = 0; i < cubeNum; i++) {
		addCube(i);
	}
	currentCubes = 50;
	
	camera.position.z = 5;
}

function render() {
	renderer.render(scene, camera);
	if(currentCubes < cubes.length) {
		var cube = cubes.pop();
		if(cube) {
			TweenMax.to(cube.scale, 3, {x:0, y:0, z:0, ease:Bounce.easeOut, onComplete:removeObject, onCompleteParams:[cubeContainer, cube]});
			TweenMax.to(cube.position, 3, {x:0, y:0, z:0, ease:Bounce.easeOut});
			TweenMax.to(cube.rotation, 3, {x:0, y:0, z:0, ease:Bounce.easeOut});
		}
	} else if(currentCubes > cubes.length) {
		addCube(Math.random()*100);
	}
}

function removeObject(container, object) {
	console.log("removing cube");
	container.remove(object);
}

function addCube(offset = 0) {
	var geometry = new THREE.BoxGeometry( 1, 1, 1 );
	var material = new THREE.MeshPhongMaterial( { color: Math.random()*0xFFFFFF, 
												  specular: Math.random()*0xFFFFFF, 
												  emissive: 0x000000, 
												  shininess: Math.random()*50, 
												  shading: THREE.FlatShading });
	var cube = new THREE.Mesh( geometry, material );
	cube.castShadow = true;
	cube.receiveShadow = true;

	TweenMax.delayedCall(0.5, randomMovement, [cube, offset]);
	//randomMovement(cube, offset);

	TweenMax.from(cube.scale, 2, {x:0, y:0, z:0, ease:Bounce.easeInOut});
	cubeContainer.add( cube );
	cubes.push(cube);
}

function randomContainerMovement(container) {
	TweenMax.to(container.rotation, 20, {x:Math.random()*2, y:Math.random()*2, z:Math.random()*2, ease:Quad.easeInOut, onComplete:randomContainerMovement, onCompleteParams:[container]});
}

function randomMovement(object, offset) {
	TweenMax.to(object.rotation, 10, {x:Math.random()*5, y:Math.random()*5, z:Math.random()*5, ease:Back.easeInOut});
	TweenMax.to(object.scale, 10, {x:Math.random()*2, y:Math.random()*2, z:Math.random()*2, ease:Bounce.easeInOut});
	TweenMax.to(object.position, 10, {x:-10+Math.random()*20, y:-10+Math.random()*20, z:-10+Math.random()*20, ease:Back.easeInOut, onComplete:randomMovement, onCompleteParams:[object]});
}

function onInputChange(e) {
	currentCubes = parseInt(e.currentTarget.value);
	cubeNumberField.textContent = "Cube Number: " + e.currentTarget.value;
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}