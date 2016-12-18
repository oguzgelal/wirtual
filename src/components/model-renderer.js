import Api from '../api';
import CompileError from '../errors/compileError';
import Utils from '../utils';

import Spin from '../properties/spin'

export default class ModelRenderer {

    constructor(el) {
        // Pointer to the parent
        this.el = el;
        // Make sure DOM representation exists
        if (!this.el.dTarget) { CompileError.dTargetNotFound('model'); return; }
        // For returning the main target through the API
        this.mainTarget = null;
        // Initialise
        this.init();
    }

    // Take element with 'wr-container' class and create the scene based on it
    static compile(el) {
        // Remove element from the scene if it is already there
        let scene = Api.get().getScene();
        if (scene && el.vTarget) { scene.remove(el.vTarget.mainTarget); }
        // Remove DOM element
        //if (el.dTarget && el.dTarget.parentNode){ el.dTarget.parentNode.removeChild(el.dTarget); }
        // Remove any previous references if exist (for recompiling)
        if (el.vTarget) { delete el.vTarget; }
        // Instantiate scene object and attach it to the element 
        el.vTarget = new ModelRenderer(el);
    }

    init() {
        let self = this;
        let scene = Api.get().getScene();
        if (!scene) { CompileError.sceneNotFound(); }

        let format, path, textureFormat, fullPath, fullTexturePath;
        if (this.el.dTarget.dataset && this.el.dTarget.dataset.model) { path = this.el.dTarget.dataset.model; }
        if (this.el.dTarget.dataset && this.el.dTarget.dataset.modelFormat) { format = this.el.dTarget.dataset.modelFormat; }
        if (this.el.dTarget.dataset && this.el.dTarget.dataset.textureFormat) { textureFormat = this.el.dTarget.dataset.textureFormat; }

        if (path && format) {
            fullPath = path + '.' + format;
            fullTexturePath = path + '.mtl';
        }

        // Call collada loader
        if (format === 'dae') {
            let loader = new THREE.ColladaLoader();
            loader.load(fullPath, function (colladaModel) {
                self.mainTarget = colladaModel.scene;
                self.setPosition();
                scene.add(self.mainTarget);
                self.attachRenderLoop();
            });
        }
        // Call obj + mtl loader
        else if (format === 'obj') {
            let objLoader = new THREE.OBJLoader();
            let mtlLoader = new THREE.MTLLoader();
            // first load the material that will cover the model
            mtlLoader.load(fullTexturePath, function (materials) {
                materials.preload();
                // now load the model
                objLoader.setMaterials(materials);
                objLoader.load(fullPath, function (objModel) {
                    self.mainTarget = objModel;
                    self.setPosition();
                    scene.add(self.mainTarget);
                    self.attachRenderLoop();
                });
            });
        }
    }

    setPosition() {
        // Set default grid system (in case payload not found)
        let depth = 50, axis = 0, level = 0, scale = 1;

        // Get the scale
        if (this.el.dTarget.dataset && this.el.dTarget.dataset.scale) { scale = parseFloat(this.el.dTarget.dataset.scale); }

        // Fetch grid system variables from element payload
        if (this.el.payload) {
            if (this.el.payload.depth) { depth = this.el.payload.depth; }
            if (this.el.payload.axis) { axis = this.el.payload.axis; }
            if (this.el.payload.level) { level = this.el.payload.level; }
        }

        // Calculate elements x y z coordinates based on grid system variables
        let pos = Utils.calculatePosition(depth, axis, level);

        // reference the same position and rotation
        this.mainTarget.position.x = pos.x;
        this.mainTarget.position.y = pos.y;
        this.mainTarget.position.z = pos.z;
        this.mainTarget.rotation.y = pos.rotation * -1;

        // Update the scale
        this.mainTarget.scale.x *= scale;
        this.mainTarget.scale.y *= scale;
        this.mainTarget.scale.z *= scale;
    }

    attachRenderLoop() {
        // Utilise spin if set
        Spin.init(this.el);
    }

}