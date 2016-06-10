var scene;
var camera;
var renderer;

var cubes;
var cubeNum = 50;

function init() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor(0xE3E3E3);
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	document.body.appendChild( renderer.domElement );

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

	cubes = new THREE.Object3D();
	scene.add(cubes);

	for(var i = 0; i < cubeNum; i++) {
		var geometry = new THREE.BoxGeometry( 1, 1, 1 );
		var material = new THREE.MeshPhongMaterial( { color: Math.random()*0xFFFFFF, 
													  specular: Math.random()*0xFFFFFF, 
													  emissive: 0x000000, 
													  shininess: Math.random()*50, 
													  shading: THREE.FlatShading });
		var cube = new THREE.Mesh( geometry, material );
		cube.castShadow = true;
		cube.receiveShadow = true;
		TweenMax.to(cube.rotation, 10, {x:i*0.05, y:i*0.05, z:i*0.05, ease:Back.easeInOut, yoyo:true, repeat:-1});
		TweenMax.to(cube.scale, 10, {y:i*0.005, ease:Bounce.easeInOut, yoyo:true, repeat:-1});
		TweenMax.to(cube.position, 10, {y:-10+Math.random()*20, ease:Back.easeInOut, yoyo:true, repeat:-1});
		cubes.add( cube );
	}

	
	TweenMax.to(cubes.rotation, 20, {x:Math.random()*2, y:Math.random()*2, z:Math.random()*2, ease:Quad.easeInOut, yoyo:true, repeat:-1});
	camera.position.z = 5;
}

function render() {
	renderer.render(scene, camera);
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}