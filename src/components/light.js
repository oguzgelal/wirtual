import Api from '../api';
import CompileError from '../errors/compileError';
import Utils from '../utils';

export default class Light {

    constructor(el) {
        // Pointer to the parent
        this.el = el;
        // Make sure DOM representation exists
        if (!this.el.dTarget){ CompileError.dTargetNotFound('light'); return; }
        // For returning the main target through the API
        this.mainTarget = null;
        // Initialise
        this.init();
    }

    // Take element with 'wr-container' class and create the scene based on it
    static compile(el) {
        // Remove element from the scene if it is already there
        let scene = Api.get().getScene();
        if (scene && el.vTarget){ scene.remove(el.vTarget.mainTarget); }
        // Remove any previous references if exist (for recompiling)
        if (el.vTarget){ delete el.vTarget; }
        // Instantiate scene object and attach it to the element 
        el.vTarget = new Light(el);
    }
 
    init(){
        // Create the light object
       this.createLight();
       // Create point light
       this.createPointLight();
       // Add the light to the scene
       this.addScene();
    }

    createLight(){
        // Create the main light object
        this.light = new THREE.Mesh(
            new THREE.SphereGeometry(1, 5, 5),
            new THREE.MeshBasicMaterial({ color: 0xffffff })
        );
        // Set the main object
        this.mainTarget = this.light; 
    }

    createPointLight(){
        this.pointLight = new THREE.PointLight(0xffffff, 4, 800);
        this.light.add(this.pointLight);
    }

    addScene(){
        let scene = Api.get().getScene();
        if (!scene){ CompileError.sceneNotFound(); }
        scene.add(this.light);
    }

}