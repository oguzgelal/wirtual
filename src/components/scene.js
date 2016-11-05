import Api from '../api';

export default class Scene {

    constructor(el) {
        // Pointer to the parent
        this.el = el;
        // Scene
        this.scene = null;
        // Camera group
        this.cameraDolly = null;
        // Initialise
        this.init();
    }

    // Take element with 'wr-container' class and create the scene based on it
    static compile(el) {
        // Remove any previous references if exist (for recompiling)
        if (el.vTarget){ delete el.vTarget; }
        // Instantiate scene object and attach it to the element 
        el.vTarget = new Scene(el);
    }

    init(){
        // Create the scene
        this.createScene();
        // Add default camera
        this.addCamera();
        // Add default environment light
        this.addEnvLight();
    }

    // Create the scene
    createScene() {
        this.scene = new THREE.Scene(); 
    }

    // Create camera with default options
    addCamera() {
        // Create camera group and add it to the scene
        this.cameraDolly = new THREE.Group();
        this.scene.add(this.cameraDolly);
        // Create default perspective camera and add it to the camera group
        this.perspectiveCamera = new THREE.PerspectiveCamera(120, window.innerWidth / window.innerHeight, 1, 5000);
        this.cameraDolly.add(this.perspectiveCamera);
    }

    // Create environment light with default options
    addEnvLight(){
        // Create particleLight and att it to the screen
        this.particleLight = new THREE.Mesh(
            new THREE.SphereGeometry(1, 5, 5),
            new THREE.MeshBasicMaterial({ color: 0xffffff })
        );
        this.scene.add(this.particleLight);
    }

}