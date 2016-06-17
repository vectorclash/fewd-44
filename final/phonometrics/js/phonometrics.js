var scene;
var camera;
var renderer;

var mainContainer;
var mainSwitch;

var logo;
var interfaceContiner;

// chaotic cube module

var cubeContainer;
var cubes = new Array();
var cubeNum = 50;
var chaoticCubesSwitch;
var cubeNumberSlider;
var cubeNumberField;
var cubeScaleSlider;
var cubeRotationCheckbox;
var cubeRotation = false;
var cubeMovementSpeed = 5;
var currentCubes = 100;
var cubeSpeedSlider;
var cubeSpeedField;

// gradient sphere module

var gradientSphereContainer;
var gradientSphere;
var gradientSpherePicker;
var gradientSphereSwitch;
var gradientPickerOne,
	gradientPickerTwo,
	gradientPickerThree;

var gradientColorOne,
	gradientColorTwo,
	gradientColorThree;

var voronoiSwitch;
var gradientSphereMax = 1;
var gradientSphereCurrent = 0;

// toroids

var torusContainer;
var torusNum = 10;
var torusRotation = 0;
var torusThickness = 0.5;
var torusSides = 6;

var torusSwitch,
	torusNumberSlider,
	torusSidesSlider,
	torusThicknessSlider,
	torusScaleSlider;

var torusNumberField,
	torusSidesField,
	torusThicknessField;

// phone movement

var hX = 0;
var hY = 0;
var hZ = 0;

var ohX = 0;
var ohY = 0;
var ohZ = 0;

// sound reactivity

var soundReactive = false;
var context;
var source, sourceJs;
var microphone;
var analyser;
var buffer;
var byteArray = new Array();
var total;

// temporal

var time = 0.0;
var interval = 0.001;

function init() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor(0xE3E3E3);
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	var threeRendererElement = renderer.domElement;
	threeRendererElement.id = "phonometrics";
	document.body.appendChild( threeRendererElement );

	logo = document.querySelector(".logo-container");

	interfaceContiner = document.querySelector("main");

	mainSwitch = document.querySelector("#main-switch");
	mainSwitch.addEventListener("change", onCheck);

	// set chaotic cube elements

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

	// set gradient sphere elements

	gradientSphereSwitch = document.querySelector("#gradient-sphere-switch");
    gradientSphereSwitch.addEventListener("change", onCheck);

    gradientPickerOne = document.querySelector("#gradient-picker-one");
    gradientPickerOne.addEventListener("change", onInputChange);
    gradientPickerOne.addEventListener("mousedown", fuckyouApple);

    gradientPickerTwo = document.querySelector("#gradient-picker-two");
    gradientPickerTwo.addEventListener("change", onInputChange);
    gradientPickerTwo.addEventListener("mousedown", fuckyouApple);

    gradientPickerThree = document.querySelector("#gradient-picker-three");
    gradientPickerThree.addEventListener("change", onInputChange);
    gradientPickerThree.addEventListener("mousedown", fuckyouApple);

    voronoiSwitch = document.querySelector("#voronoi-switch");
    voronoiSwitch.addEventListener("change", onCheck);

    // set torus elements

    torusSwitch = document.querySelector("#torus-switch");
    torusSwitch.addEventListener("change", onCheck);

    torusNumberSlider = document.querySelector("#torus-number-slider");
    torusNumberSlider.addEventListener("input", onInputChange);

    torusSidesSlider = document.querySelector("#torus-sides-slider");
    torusSidesSlider.addEventListener("input", onInputChange);

    torusThicknessSlider = document.querySelector("#torus-thickness-slider");
    torusThicknessSlider.addEventListener("input", onInputChange);

    torusScaleSlider = document.querySelector("#torus-scale-slider");
    torusScaleSlider.addEventListener("input", onInputChange);

    torusNumberField = document.querySelector("#torus-number");
    torusSidesField = document.querySelector("#torus-sides");
    torusThicknessField = document.querySelector("#torus-thickness");

	camera.position.z = -500;

	scene = new THREE.Scene();
	//scene.fog = new THREE.Fog(0xCCCCCC, 1, 10);
	scene.add(camera);

	// close modules

	var modules = document.querySelectorAll("section");
	for(var i = 0; i < modules.length; i++) {
		var module = modules[i];
		if(module.className == "module-closed") {
			disableModule(module);
		}
	}

	buildElements();

	// begin audio

	navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
	if(navigator.getUserMedia) {
		soundReactive = true;
		navigator.getUserMedia({
				audio: true,
				video: false
			},
			function(mediaStream) {
				context = new AudioContext();
				microphone = context.createMediaStreamSource(mediaStream);

				sourceJs = context.createScriptProcessor(2048, 1, 1);
				sourceJs.connect(context.destination);
				analyser = context.createAnalyser();
				analyser.smoothingTimeConstant = 0.6;
				analyser.fftSize = 512;

				microphone.connect(analyser);
				analyser.connect(sourceJs);
				sourceJs.connect(context.destination);

				sourceJs.onaudioprocess = function(e) {
						byteArray = new Uint8Array(analyser.frequencyBinCount);
						analyser.getByteFrequencyData(byteArray);
						total = 0;
						for (var i = 0; i < byteArray.length; i++) {
							total += byteArray[i];
						}
				};
			},
			function(error) {
				console.log("There was an error when getting microphone input: " + err);
			}
		);
	}

	// turn this on to test non sound reactive experiences
	// soundReactive = false;

	window.addEventListener("resize", onWindowResize);
	TweenMax.ticker.addEventListener("tick", render);
}

function buildElements() {
	var directionalLight = new THREE.DirectionalLight( 0xffCCff, 1 );
	directionalLight.position.set( 0, 1, 1 );
	directionalLight.castShadow = true;
	//directionalLight.intensity = 1;
	scene.add( directionalLight );

	var ambientLight = new THREE.AmbientLight( 0xFFCCFF );
	ambientLight.intensity = 0.9;
	scene.add(ambientLight);

	mainContainer = new THREE.Object3D();
	scene.add(mainContainer);

	gradientSphereContainer = new THREE.Object3D();
	gradientSphereContainer.visible = false;
	mainContainer.add(gradientSphereContainer);
	updateGradientSphere();

	cubeContainer = new THREE.Object3D();
	mainContainer.add(cubeContainer);
	randomContainerMovement(cubeContainer);

	for(var i = 0; i < cubeNum; i++) {
		addCube();
	}

	torusContainer = new THREE.Object3D();
	torusContainer.rotation.x = 90;
	torusContainer.visible = false;
	mainContainer.add(torusContainer);
	randomContainerMovement(torusContainer);

	buildToroids();

	camera.position.z = 50;
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

	// sound reactivity

	// chaotic cubes

	for(var i = 0; i < byteArray.length; i++) {
		var cube = cubeContainer.children[i];
		var scale = 1 + byteArray[i] * 0.009;
		if(cube) {
			cube.scale.x = scale;
			cube.scale.y = scale;
			cube.scale.z = scale;
		}
	}

	// torus

	if(!soundReactive) {
		for(var i = 0; i < torusContainer.children.length; i++) {
			var torus = torusContainer.children[i];

			if(torus) {
				torus.rotation.x += noise.perlin2(100, time) * (0.05 * i);
				torus.rotation.y += noise.perlin2(100, time) * (0.05 * i);
				torus.rotation.z += noise.perlin2(100, time) * (0.05 * i);
			}
		}
	} else {
		for(var i = 0; i < byteArray.length; i++) {
			var torus = torusContainer.children[i];
			var rotation = (total * 0.00002) * i;
			var scale = 1 + byteArray[i] * 0.002;

			if(torus) {
				torus.rotation.x = rotation;
				torus.rotation.y = rotation;
				torus.rotation.z = rotation;

				torus.scale.x = scale;
				torus.scale.y = scale;
				torus.scale.z = scale;
			}
		}
	}

	time += interval;
}

// animation and geometry functions

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

function addTorus() {
	var num = 1 + torusContainer.children.length;

	var geometry = new THREE.TorusGeometry( num*2, torusThickness, 20, torusSides );

	var material = new THREE.MeshPhongMaterial( { color: tinycolor({ h: num/torusNum*350, s: 100, v: 100 }).toHexString(), 
	 											  specular: tinycolor.random().toHexString(), 
	 											  emissive: 0x000000, 
	 											  shininess: Math.random()*50, 
	 											  shading: THREE.FlatShading,
	 											  needsUpdate: true });
	var torus = new THREE.Mesh( geometry, material );
	torus.castShadow = true;
	torus.receiveShadow = true;
	torusContainer.add( torus );
}

function buildToroids() {
	for(var i = 0; i < torusNum; i++) {
		addTorus();
	}
}

function rebuildToroids() {
	while(torusContainer.children.length > 0) {
		torusContainer.children.pop();
	}

	buildToroids();
}

function updateGradientSphere() {
	var geometry = new THREE.SphereGeometry(500, 24, 24);

	var newGradientTexture = new THREE.Texture(gradientTexture());
    newGradientTexture.needsUpdate = true;

    var material = new THREE.MeshBasicMaterial({
        map: newGradientTexture,
        side: THREE.DoubleSide,
    });

    gradientSphere = new THREE.Mesh(geometry, material);
    
    while(gradientSphereCurrent >= gradientSphereMax) {
    	gradientSphereContainer.remove(gradientSphereContainer.children[0]);
    	gradientSphereCurrent--;
    }

    gradientSphereContainer.add(gradientSphere);

    gradientSphere.rotation.x = Math.random() * 20;
    gradientSphere.rotation.y = Math.random() * 20;
    gradientSphere.rotation.z = Math.random() * 20;

    randomContainerMovement(gradientSphere);
    gradientSphereCurrent++;
}

function randomContainerMovement(container) {
	TweenMax.to(container.rotation, 20, {x:Math.random()*5, y:Math.random()*5, z:Math.random()*5, ease:Quad.easeInOut, onComplete:randomContainerMovement, onCompleteParams:[container]});
}

function randomCubeMovement(object) {
	if(cubeRotation == true) {
		TweenMax.to(object.rotation, cubeMovementSpeed, {x:Math.random()*5, y:Math.random()*5, z:Math.random()*5, ease:Back.easeInOut});
	} else {
		TweenMax.to(object.rotation, cubeMovementSpeed, {x:0, y:0, z:0, ease:Back.easeInOut});
	}
	TweenMax.to(object.material.color, cubeMovementSpeed, {r:Math.random()*1, g:Math.random()*1, b:Math.random()*1, ease:Bounce.easeInOut});
	TweenMax.to(object.position, cubeMovementSpeed, {x:-10+Math.random()*20, y:-10+Math.random()*20, z:-10+Math.random()*20, ease:Back.easeInOut, onComplete:randomCubeMovement, onCompleteParams:[object]});
}

// utility functions

function removeObject(container, object) {
	console.log("removing cube");
	container.remove(object);
}

function gradientTexture() {
	var gradientCanvas = document.createElement("canvas");
	gradientCanvas.width = 512;
	gradientCanvas.height = 512;
	var gradientCanvasContext = gradientCanvas.getContext("2d");

    var gradient = gradientCanvasContext.createLinearGradient(0,0,512,0);

    var color1 = new tinycolor(gradientPickerOne.value);
    var color2 = new tinycolor(gradientPickerTwo.value);
    var color3 = new tinycolor(gradientPickerThree.value);

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
	TweenMax.to(module, 0.4, {className:"module-open"});
	var moduleSettings = module.querySelector(".module-settings");
	TweenMax.set(moduleSettings, {height:"auto"});
	TweenMax.from(moduleSettings, 0.5, {height:0, ease:Back.easeOut});
}

function disableModule(module) {
	TweenMax.to(module, 0.4, {className:"module-closed"});
	var moduleSettings = module.querySelector(".module-settings");
	TweenMax.to(moduleSettings, 0.5, {height:0, ease:Expo.easeOut});
}

function enableInterface() {
	TweenMax.to(interfaceContiner, 0.5, {alpha:1, x:0, ease:Quad.easeOut});
	TweenMax.to(logo, 0.5, {alpha:1, ease:Quad.easeIn});
	TweenMax.to(".wrapper", 0.5, {alpha:1, ease:Quad.easeOut});
}

function disableInterface() {
	TweenMax.to(interfaceContiner, 0.5, {alpha:0, x:100, ease:Quad.easeOut});
	TweenMax.to(logo, 0.5, {alpha:0, ease:Back.easeIn});
	TweenMax.to(".wrapper", 0.5, {alpha:0.2, ease:Quad.easeOut});
	TweenMax.to(window, 1, {scrollTo:{y:0}});
}

// event handlers

function onInputChange(e) {
	if(e.currentTarget == cubeNumberSlider) {
		currentCubes = parseInt(e.currentTarget.value);
		cubeNumberField.textContent = "Cube number: " + e.currentTarget.value;
	} else if(e.currentTarget == cubeScaleSlider) {
		TweenMax.to(cubeContainer.scale, 1, {x:e.currentTarget.value, y:e.currentTarget.value, z:e.currentTarget.value, ease:Quad.easeInOut});
	} else if(e.currentTarget == cubeSpeedSlider) {
		cubeMovementSpeed = e.currentTarget.value;
		cubeSpeedField.textContent = "Cube movement speed: " + e.currentTarget.value;
	} else  if(e.currentTarget == gradientPickerOne) {
		updateGradientSphere();
	} else  if(e.currentTarget == gradientPickerTwo) {
		updateGradientSphere();
	} else  if(e.currentTarget == gradientPickerThree) {
		updateGradientSphere();
	} else if(e.currentTarget == torusNumberSlider) {
		torusNum = e.currentTarget.value;
		torusNumberField.textContent = "Torus number: " + e.currentTarget.value;
		rebuildToroids();
	} else if(e.currentTarget == torusSidesSlider) {
		torusSides = e.currentTarget.value;
		torusSidesField.textContent = "Torus sides: " + e.currentTarget.value;
		rebuildToroids();
	} else if(e.currentTarget == torusThicknessSlider) {
		torusThickness = e.currentTarget.value;
		torusThicknessField.textContent = "Torus thickness: " + e.currentTarget.value;
		rebuildToroids();
	} else if(e.currentTarget == torusScaleSlider) {
		TweenMax.to(torusContainer.scale, 1, {x:e.currentTarget.value, y:e.currentTarget.value, z:e.currentTarget.value, ease:Quad.easeInOut});
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
	} else if(e.currentTarget == gradientSphereSwitch) {
		gradientSphereContainer.visible = e.currentTarget.checked;
		if(e.currentTarget.checked == false) {
			disableModule(e.currentTarget.parentNode);
		} else {
			enableModule(e.currentTarget.parentNode);
		}
	} else if(e.currentTarget == mainSwitch) {
		if(e.currentTarget.checked == false) {
			disableInterface();
		} else {
			enableInterface();
		}
	} else if(e.currentTarget == voronoiSwitch) {
		if(e.currentTarget.checked == false) {
			gradientSphereMax = 1;
			updateGradientSphere();
		} else {
			gradientSphereMax = 4;
			updateGradientSphere();
		}
	} else if(e.currentTarget == torusSwitch) {
		torusContainer.visible = e.currentTarget.checked;
		if(e.currentTarget.checked == false) {
			disableModule(e.currentTarget.parentNode);
		} else {
			enableModule(e.currentTarget.parentNode);
		}
	}
}

function fuckyouApple(e) {
	e.preventDefault();
}

function onPhoneMovement(e) {
	var x = e.accelerationIncludingGravity.y;
	var y = e.accelerationIncludingGravity.x;
	var z = e.accelerationIncludingGravity.z;

	hX += (x - ohX) / 50;
	hY += (y - ohY) / 50;
	hZ += (z - ohZ) / 50;

	mainContainer.rotation.x = hX*0.4;
	mainContainer.rotation.y = hY*0.4;
	mainContainer.rotation.z = hZ*0.4;

	ohX = hX;
	ohY = hY;
	ohZ = hZ;
}

function onWindowResize(e) {
	camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}