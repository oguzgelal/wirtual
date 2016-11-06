(function () {
  'use strict';

  var scene, camera, renderer;
  var sphere, light;
  var particleLight;
  var manager, vrEffect, vrControls;
  var cameraDolly;
  const pi = 3.1415;

  function toDegrees(radians) { return radians * (180 / pi); }
  function toRadians(degrees) { return degrees * (pi / 180); }

  function init() {
    scene = new THREE.Scene();
    window.scene = scene;
    // Create a group around the camera for moving around. If you want to move
    // the camera update the position of the cameraDolly to allow for VR Headsets
    // that track position.
    cameraDolly = new THREE.Group();
    scene.add(cameraDolly);

    // add light
    
    particleLight = new THREE.Mesh(
      new THREE.SphereGeometry(1, 5, 5),
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    //scene.add(particleLight);
    //var pointLight = new THREE.PointLight(0xffffff, 10, 800);
    //particleLight.add(pointLight);
    


    //var directionalLight = new THREE.DirectionalLight(0xffffff, .5);
    //directionalLight.position.set(5, 25, 25).normalize();
    //scene.add(directionalLight);

    var light = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(light);


    var skyGeometry = new THREE.CubeGeometry(5000, 5000, 5000);
    var skyMaterialArray = [];
    for (var i = 1; i < 7; i++) {
      skyMaterialArray.push(new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture('space/space' + i + '.png'),
        side: THREE.BackSide
      }));
    }
    var skyMaterial = new THREE.MeshFaceMaterial(skyMaterialArray);
    var skyBox = new THREE.Mesh(skyGeometry, skyMaterial);
    scene.add(skyBox);



    camera = new THREE.PerspectiveCamera(120, window.innerWidth / window.innerHeight, 1, 5000);
    window.camera = camera;
    cameraDolly.add(camera);
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    // Append the canvas element created by the renderer to document body element.
    document.body.appendChild(renderer.domElement);
    vrControls = new THREE.VRControls(camera);
    vrEffect = new THREE.VREffect(renderer);
    onWindowResize();
    manager = new WebVRManager(renderer, vrEffect, {
      hideButton: false
    });
    window.manager = manager;
  }

  function loadScene() {
    var loader = new THREE.TextureLoader();
    loader.load('earth.jpg', function (texture) {
      var geometry = new THREE.SphereGeometry(30, 25, 25);
      var material = new THREE.MeshLambertMaterial({
        map: texture,
        overdraw: 0.5
      });
      sphere = new THREE.Mesh(geometry, material);
      sphere.position.x = 0;
      sphere.position.y = 0;
      sphere.position.z = -50;
      sphere.name = 'sphere';
      window.sphere = sphere;
      scene.add(sphere);
    });

    //

    // Start the loop
    startRenderLoop();
  }

  function onWindowResize() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    vrEffect.setSize(width, height);
  }

  function startRenderLoop() {
    var oldTimestamp = 0;
    function animate(timestamp) {
      // Calculate time since last frame in seconds
      var timestampDelta = (oldTimestamp !== 0) ? (timestamp - oldTimestamp) / 1000.0 : 0.0;
      oldTimestamp = timestamp;
      // Update Animations
      if (THREE.AnimationHandler) { THREE.AnimationHandler.update(timestampDelta); }


      var timer = Date.now() * 0.001;
      var spherePosX = 0;
      var spherePosY = 0;
      var spherePosZ = 0;
      if (sphere) { spherePosX = sphere.position.x; }
      if (sphere) { spherePosY = sphere.position.y; }
      if (sphere) { spherePosZ = sphere.position.z; }
      particleLight.position.x = spherePosX + Math.sin(timer * 2) * 30;
      particleLight.position.y = spherePosY + Math.cos(timer * 3) * 30;
      particleLight.position.z = spherePosZ - Math.sin(timer * 3) * 30;



      if (sphere) { sphere.rotation.y += 0.1 * timestampDelta; }
      // Update camera position with latest input values
      vrControls.update();
      // Render the scene using the WebVR manager
      manager.render(scene, camera, timestamp);
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }

  init();
  loadScene();

  window.addEventListener('resize', onWindowResize, false);

} ());
