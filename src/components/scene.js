import Api from '../api';
import CompileError from '../errors/compileError';
import Utils from '../utils';

export default class Scene {

    constructor(el) {
        // Pointer to the parent
        this.el = el;
        // Make sure DOM representation exists
        if (!this.el.dTarget){ CompileError.dTargetNotFound('scene'); return; }
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
        // Add skybox if exists
        this.addSkyBox();
        // Add default renderers
        this.addRenderers();
        // Append the canvas element to the DOM
        this.appendDOM();
        // Initiate VR handlers
        this.initVR();
        // Set aspect ratio and scales according to device screen size
        this.setRatio();
        // Set window resize listener
        this.onWindowResize();
        // Attach Render Loop runnable
        this.attachRenderLoop();
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
        /*
        * Read light intensity
        * Format: data-brightness="..."
        * Value: 'high', 'medium', 'low'
        */ 
        let intensity = 0xffffff;
        if (this.el.dTarget.dataset && this.el.dTarget.dataset.brightness){
            if (this.el.dTarget.dataset.brightness==='high'){ intensity = 0xffffff; }
            else if (this.el.dTarget.dataset.brightness==='medium'){ intensity = 0x808080; }
            else if (this.el.dTarget.dataset.brightness==='low'){ intensity = 0x404040; }
        }

        // Create the ambient light and add it to the screen
        this.ambientLight = new THREE.AmbientLight(intensity);
        this.scene.add(this.ambientLight);
    }

    addSkyBox(){
        if (this.el.dTarget.dataset && this.el.dTarget.dataset.skybox && this.el.dTarget.dataset.skyboxFormat){
            /* 
            * Read the skybox data
            * Format: data-skybox="..." data-skybox-format="png"
            * Value: /path/to/skyboxfolder
            * ie. data-skybox="assets/space" data-skybox-format="png"
            *  -> In this scenario, there should be a folder called 'assets' in the
            *  -> same directory with the index.html, inside of the assets folder, there
            *  -> should be a 'space' folder, and inside of the space folder, there should be
            *  -> 6 images, space1.png to space6.png (extension indicated by data-skybox-format attribute)
            */
            // Get skybox path
            let skyboxPath = this.el.dTarget.dataset.skybox;
            // Strip the last character if user placed a slash in the end
            if (skyboxPath.substr(-1)==='/'){ skyboxPath = skyboxPath.slice(0, -1); }
            // Split path by slashes and get the name 
            let pathArray = skyboxPath.split('/');
            let skyboxName = pathArray[pathArray.length - 1];
            // Get the image format
            let skyboxFormat = this.el.dTarget.dataset.skyboxFormat;
            // Strip the first character if user placed a dot in the beginning
            if (skyboxFormat.substr(0, 1)==='.'){ skyboxFormat = skyboxFormat.substr(1); }
            // Create the cube that will hold the skybox images 
            let skyGeometry = new THREE.CubeGeometry(5000, 5000, 5000);
            // Generate the skybox material array
            let skyMaterialArray = [];
            for (let i = 1; i < 7; i++) {
                skyMaterialArray.push(new THREE.MeshBasicMaterial({
                    map: THREE.ImageUtils.loadTexture(skyboxPath + '/' +  skyboxName + i + '.' + skyboxFormat),
                    side: THREE.BackSide
                }));
            }
            // Create the material that will make up the skybox
            let skyMaterial = new THREE.MeshFaceMaterial(skyMaterialArray);
            // Create the actual skybox element
            this.skybox = new THREE.Mesh(skyGeometry, skyMaterial);
            this.scene.add(this.skybox);
        }
    }

    addRenderers(){
        // Initiate the WebGL renderers and set the pixel ratio
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setPixelRatio(window.devicePixelRatio);
    }

    appendDOM(){
        // Remove all canvas elements (for re-compiling)
        let canvasElements = document.getElementsByTagName('canvas');
        for (let i = 0; i < canvasElements.length; i++){
            canvasElements[i].parentElement.removeChild(canvasElements[i]);
        }
        // Append the canvas element to DOM
        document.body.appendChild(this.renderer.domElement);
    }

    initVR(){
        // Initiate VR handler libraries
        this.vrControls = new THREE.VRControls(this.perspectiveCamera);
        this.vrEffect = new THREE.VREffect(this.renderer);
        this.vrManager = new WebVRManager(this.renderer, this.vrEffect, { hideButton: false });
    }

    setRatio(){
        let width = window.innerWidth;
        let height = window.innerHeight;
        // Set aspect ratio of the camera
        this.perspectiveCamera.aspect = width / height;
        this.perspectiveCamera.updateProjectionMatrix();
        // Set VR aspect ratio
        this.vrEffect.setSize(width, height);
    }

    onWindowResize(){
        let self = this;
        // Set window resize listener
        window.addEventListener('resize', () => {
            // Recalculate aspect ratio according to the new screen size
            self.setRatio();
        }, false);
    }

    attachRenderLoop(){
        let self = this;
        let renderLoopRunnable = (timestamp) => {
            // Update camera position with latest input values
            self.vrControls.update();
            // Render the scene using the WebVR manager
            self.vrManager.render(self.scene, self.perspectiveCamera, timestamp);
        };

        Api.get().attachRenderLoopRunnable('scene_update', renderLoopRunnable);
    }

}