// TODO : not tested
/*
export default class Test {
    constructor() {
        this.scene, this.camera, this.renderer;
        this.box, this.sphere, this.light;
        this.particleLight;
        this.manager, this.vrEffect, this.vrControls;
        this.cameraDolly;
        this.pi = 3.1415;

        this.init();
        this.loadScene();
        window.addEventListener('resize', this.onWindowResize, false);
    }

    init() {
        this.scene = new THREE.Scene();
        window.scene = this.scene;
        // Create a group around the camera for moving around. If you want to move
        // the camera update the position of the cameraDolly to allow for VR Headsets
        // that track position.
        this.cameraDolly = new THREE.Group();
        this.scene.add(cameraDolly);

        // add light
        this.particleLight = new THREE.Mesh(
            new THREE.SphereGeometry(4, 4, 4),
            new THREE.MeshBasicMaterial({ color: 0xffffff })
        );
        this.scene.add(this.particleLight);
        //scene.add(new THREE.AmbientLight(0x222222));
        var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(25, 25, 25).normalize();
        this.scene.add(directionalLight);
        var pointLight = new THREE.PointLight(0xffffff, 2, 800);
        this.particleLight.add(pointLight);

        this.camera = new THREE.PerspectiveCamera(125, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.cameraDolly.add(this.camera);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setPixelRatio(window.devicePixelRatio);
        // Append the canvas element created by the renderer to document body element.
        document.body.appendChild(this.renderer.domElement);
        this.vrControls = new THREE.VRControls(camera);
        this.vrEffect = new THREE.VREffect(renderer);
        onWindowResize();
        this.manager = new WebVRManager(renderer, vrEffect, {
            hideButton: false
        });
    }

    loadScene() {
        var loader = new THREE.TextureLoader();
        loader.load('../earth.jpg', function (texture) {
            var geometry = new THREE.SphereGeometry(25, 25, 25);
            var material = new THREE.MeshLambertMaterial({
                map: texture,
                overdraw: 0.5
            });
            this.sphere = new THREE.Mesh(geometry, material);
            this.sphere.position.z = -45;
            this.sphere.name = 'sphere';
            window.sphere = this.sphere;
            this.scene.add(sphere);
        });

        // Start the loop
        this.startRenderLoop();
    }

    onWindowResize() {
        var width = window.innerWidth;
        var height = window.innerHeight;
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.vrEffect.setSize(width, height);
    }

    startRenderLoop() {
        var ths = this;
        var oldTimestamp = 0;
        function animate(timestamp) {
            // Calculate time since last frame in seconds
            var timestampDelta = (oldTimestamp !== 0) ? (timestamp - oldTimestamp) / 1000.0 : 0.0;
            oldTimestamp = timestamp;
            // Update Animations
            if (THREE.AnimationHandler) { THREE.AnimationHandler.update(timestampDelta); }
            var timer = Date.now() * 0.00025;
            ths.particleLight.position.x = Math.sin(timer * 3) * 100;
            ths.particleLight.position.y = Math.cos(timer * 5) * 200;
            ths.particleLight.position.z = Math.cos(timer * 3) * 300;
            if (ths.sphere) { ths.sphere.rotation.y += 0.1 * timestampDelta; }
            // Update camera position with latest input values
            vrControls.update();
            // Render the scene using the WebVR manager
            manager.render(ths.scene, ths.camera, timestamp);
            requestAnimationFrame(animate);
        }
        requestAnimationFrame(animate);
    }

    toDegrees(radians) { return radians * (180 / this.pi); }
    toRadians(degrees) { return degrees * (this.pi / 180); }
}

*/