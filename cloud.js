let cloudParticles = [];

function changeColor(id) {
      document.body.style.background = document.getElementById(id).innerHTML;
  }

function init() {  
//create the scene
var scene = new THREE.Scene( );
var ratio = window.innerWidth/window.innerHeight;
var camera = new THREE.PerspectiveCamera(45,ratio,0.1,1000);

//set the camera position
camera.position.set(0,0,25);
// and the direction
camera.lookAt(0,0,1);

//create the webgl renderer
var renderer = new THREE.WebGLRenderer( {alpha:true});
renderer.setClearColor(0xffffff,0);

//set the size of the rendering window
renderer.setSize(window.innerWidth,window.innerHeight);

//add the renderer to the current document
document.body.appendChild(renderer.domElement );


//lighting
//basic light from camera towards the scene
var cameralight = new THREE.PointLight( new THREE.Color(1,1,1), 0.5 );
camera.add( cameralight );
scene.add(camera);

//ambient lighting
var ambientlight = new THREE.AmbientLight(new THREE.Color(1,1,1),0.2);
scene.add(ambientlight);

//hemi lights
var hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.61 );
hemiLight.position.set( 0, 50, 0 );
scene.add( hemiLight );

controls = new THREE.OrbitControls( camera, renderer.domElement );

  var loader = new THREE.TextureLoader().load("smoke-1.png", function(texture){
    cloudGeo = new THREE.PlaneBufferGeometry(500,500);
    cloudMaterial = new THREE.MeshLambertMaterial({
      map:texture,
      transparent: true 
    });

  for(var p=0; p<50; p++) {
    var cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
    cloud.position.set(
      Math.random()*800 -400, 
      500, 
      Math.random()*500-500
    );
    cloud.rotation.x = 1.16;
    cloud.rotation.y = -0.12;
    cloud.rotation.z = Math.random()*2*Math.PI;
    cloud.material.opacity = 0.55;
    cloudParticles.push(cloud);
    scene.add(cloud);
  }
});
render();
}
function render() {
  cloudParticles.forEach(p => {
  p.rotation.z -=0.001;
  renderer.render(scene,camera);
  requestAnimationFrame(render);
}
init();
