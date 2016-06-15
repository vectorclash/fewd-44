var scene;
var camera;
var renderer;

var mainContainer;

var cubeContainer;
var cubes = new Array();
var cubeNum = 50;
var chaoticCubesSwitch;
var cubeNumberSlider;
var cubeNumberField;
var cubeScaleSlider;
var cubeRotationCheckbox;
var cubeRotation = false;
var cubeMovementSpeed = 10;
var currentCubes = 50;
var cubeSpeedSlider;
var cubeSpeedField;

// phone movement

var hX = 0;
var hY = 0;
var hZ = 0;

var ohX = 0;
var ohY = 0;
var ohZ = 0;

function init() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor(0xE3E3E3);
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	document.body.appendChild( renderer.domElement );


	chaoticCubesSwitch = document.querySelector("#chaotic-cubes-switch");
	chaoticCubesSwitch.addEventListener("change", onCheck);
	cubeNumberSlider = document.querySelector("#cube-number-slider");
	cubeNumberSlider.addEventListener("input", onInputChange);
	cubeNumberField = document.querySelector("#cube-number");
	cubeRotationCheckbox = document.querySelector("#cube-rotation-checkbox");
	cubeRotationCheckbox.addEventListener("change", onCheck);
	cubeScaleSlider = document.querySelector("#cube-scale-slider");
	cubeScaleSlider.addEventListener("input", onInputChange);
	cubeSpeedSlider = document.querySelector("#cube-speed-slider");
	cubeSpeedSlider.addEventListener("input", onInputChange);
	cubeSpeedField = document.querySelector("#cube-speed");

	camera.position.z = -500;

	scene = new THREE.Scene();
	//scene.fog = new THREE.Fog(0xCCCCCC, 1, 10);
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

	var ambientLight = new THREE.AmbientLight( 0xFFCCFF );
	ambientLight.intensity = 0.9;
	scene.add(ambientLight);

	mainContainer = new THREE.Object3D();
	scene.add(mainContainer);

	var geometry = new THREE.SphereGeometry(50, 64, 64);

	var shadowTexture = new THREE.Texture(randomGradientTexture());
    shadowTexture.needsUpdate = true;

    var material = new THREE.MeshBasicMaterial({
        map: shadowTexture,
        side: THREE.DoubleSide
    });

    var sphere = new THREE.Mesh(geometry, material);
    mainContainer.add(sphere);
    randomContainerMovement(sphere);

	cubeContainer = new THREE.Object3D();
	mainContainer.add(cubeContainer);
	randomContainerMovement(cubeContainer);

	for(var i = 0; i < cubeNum; i++) {
		addCube();
	}

	camera.position.z = 5;
	window.addEventListener("devicemotion", onPhoneMovement);
}

// the render loop

function render() {
	renderer.render(scene, camera);
	while(currentCubes < cubeContainer.children.length) {
		cubeContainer.children.pop();
	} 

	if(currentCubes > cubeContainer.children.length) {
		addCube();
	}
}

function addCube() {
	var geometry = new THREE.BoxGeometry( 1, 1, 1 );

	var material = new THREE.MeshPhongMaterial( { color: tinycolor.random().toHexString(), 
	 											  specular: tinycolor.random().toHexString(), 
	 											  emissive: 0x000000, 
	 											  shininess: Math.random()*50, 
	 											  shading: THREE.FlatShading,
	 											  needsUpdate: true });
	var cube = new THREE.Mesh( geometry, material );
	cube.castShadow = true;
	cube.receiveShadow = true;
	cubes.push(cube);
	cubeContainer.add( cube );

	TweenMax.delayedCall(0.1, randomCubeMovement, [cube]);
	//randomCubeMovement(cube);

	TweenMax.from(cube.scale, 2, {x:0, y:0, z:0, ease:Bounce.easeInOut});
}

function randomContainerMovement(container) {
	TweenMax.to(container.rotation, 20, {x:Math.random()*2, y:Math.random()*2, z:Math.random()*2, ease:Quad.easeInOut, onComplete:randomContainerMovement, onCompleteParams:[container]});
}

function randomCubeMovement(object) {
	if(cubeRotation == true) {
		TweenMax.to(object.rotation, cubeMovementSpeed, {x:Math.random()*5, y:Math.random()*5, z:Math.random()*5, ease:Back.easeInOut});
	} else {
		TweenMax.to(object.rotation, cubeMovementSpeed, {x:0, y:0, z:0, ease:Back.easeInOut});
	}
	TweenMax.to(object.material.color, cubeMovementSpeed, {r:Math.random()*1, g:Math.random()*1, b:Math.random()*1, ease:Bounce.easeInOut});
	TweenMax.to(object.scale, cubeMovementSpeed, {x:Math.random()*2, y:Math.random()*2, z:Math.random()*2, ease:Bounce.easeInOut});
	TweenMax.to(object.position, cubeMovementSpeed, {x:-10+Math.random()*20, y:-10+Math.random()*20, z:-10+Math.random()*20, ease:Back.easeInOut, onComplete:randomCubeMovement, onCompleteParams:[object]});
}

// utility functions

function removeObject(container, object) {
	console.log("removing cube");
	container.remove(object);
}

function randomGradientTexture() {
	var gradientCanvas = document.createElement("canvas");
	gradientCanvas.width = 512;
	gradientCanvas.height = 512;
	var gradientCanvasContext = gradientCanvas.getContext("2d");

    var gradient = gradientCanvasContext.createLinearGradient(0,0,512,0);

    var color1 = new tinycolor("#EAE0FF");
    var color2 = new tinycolor("#FFD5F5");
    var color3 = new tinycolor("#E6FFA0");

    gradient.addColorStop(0, color1.toHexString());
    gradient.addColorStop(0.25, color2.toHexString());
    gradient.addColorStop(0.5, color3.toHexString());
    gradient.addColorStop(0.75, color2.toHexString());
    gradient.addColorStop(1, color1.toHexString());

    gradientCanvasContext.fillStyle = gradient;
    gradientCanvasContext.fillRect(0,0,512,512);

    return gradientCanvas;
}

function enableModule(module) {
	TweenMax.to(module, 0.5, {css:{opacity:0.9, borderLeft:"0px solid #224577"}});
	var moduleSettings = module.querySelector(".module-settings");
	TweenMax.set(moduleSettings, {height:"auto"});
	TweenMax.from(moduleSettings, 1, {height:0, ease:Back.easeOut});
}

function disableModule(module) {
	TweenMax.to(module, 0.5, {css:{opacity:0.4, borderLeft:"20px solid black"}});
	var moduleSettings = module.querySelector(".module-settings");
	TweenMax.to(moduleSettings, 1, {height:0, ease:Expo.easeOut});
}

// event listeners

function onInputChange(e) {
	if(e.currentTarget == cubeNumberSlider) {
		currentCubes = parseInt(e.currentTarget.value);
		cubeNumberField.textContent = "Cube number: " + e.currentTarget.value;
	} else if(e.currentTarget == cubeScaleSlider) {
		TweenMax.to(cubeContainer.scale, 1, {x:e.currentTarget.value, y:e.currentTarget.value, z:e.currentTarget.value, ease:Quad.easeInOut});
	} else if(e.currentTarget == cubeSpeedSlider) {
		cubeMovementSpeed = e.currentTarget.value;
		cubeSpeedField.textContent = "Cube movement speed: " + e.currentTarget.value;
	}
	
}

function onCheck(e) {
	if(e.currentTarget == chaoticCubesSwitch) {
		cubeContainer.visible = e.currentTarget.checked;
		if(e.currentTarget.checked == false) {
			disableModule(e.currentTarget.parentNode);
		} else {
			enableModule(e.currentTarget.parentNode);
		}
	} else if(e.currentTarget == cubeRotationCheckbox) {
		cubeRotation = e.currentTarget.checked;
	}
}

function onPhoneMovement(e) {

	var x = e.accelerationIncludingGravity.y;
	var y = e.accelerationIncludingGravity.x;
	var z = e.accelerationIncludingGravity.z;

	hX += (x - ohX) / 25;
	hY += (y - ohY) / 25;
	hZ += (z - ohZ) / 25;

	mainContainer.rotation.x = hX*0.2;
	mainContainer.rotation.y = hY*0.2;
	mainContainer.rotation.z = hZ*0.2;

	ohX = hX;
	ohY = hY;
	ohZ = hZ;
}

function onWindowResize(e) {
	camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}