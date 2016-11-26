import Api from '../api';
import CompileError from '../errors/compileError';
import Utils from '../utils';

import Spin from '../properties/spin'

export default class Emoji { 

    constructor(el) {
        // Pointer to the parent
        this.el = el;
        // Make sure DOM representation exists
        if (!this.el.dTarget){ CompileError.dTargetNotFound('emoji'); return; }
        // Set default detail level for spheres
        this.defaultDetail = 25;
        // Emoji files
        this.emojis = {
            'smile': 'smile.jpg',
            'tongue': 'tongue.jpg',
            'mock': 'mock.jpg'
        };
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
        el.vTarget = new Emoji(el);
    }

    // Sphere creation is being chained by callbacks because they have to be
    // synchronous - as additional assets may needed to be loaded 
    init(){
        // Create sphere geometry
        this.createSphereGeometry(() => {
            // Create material
            this.createSphereMaterial(() => {
                // Create sphere
                this.createEmoji();
                // Set sphere position
                this.setEmojiPosition();
                // Add sphere to scene
                this.addScene();
                // Attach runnables
                this.attachRenderLoop();
            });
        });
    }

    createSphereGeometry(callback){
        let radius = 20;
        // Fetch sphere radios from 'data-size' attribute
        if (this.el.dTarget.dataset && this.el.dTarget.dataset.size){ radius = this.el.dTarget.dataset.size; }
        // Create geometry
        this.sphereGeometry = new THREE.SphereGeometry(radius, this.defaultDetail, this.defaultDetail);
        // Invoke the callback
        callback();
    }

    createSphereMaterial(callback){
        let self = this;
        // Sphere texture cover set
        if (self.el.dTarget.dataset && self.el.dTarget.dataset.smiley){
            if (!self.emojis[self.el.dTarget.dataset.smiley]){
                CompileError.invalidEmojiType(self.el.dTarget.dataset.smiley);
                return;
            }
            // Set the path of the emoji
            let path = self.emojis[self.el.dTarget.dataset.smiley];
            if (self.el.dTarget.dataset.path && self.el.dTarget.dataset.path!==""){
                path = self.el.dTarget.dataset.path + "/" + path;
            }
            // Load texture image
            self.loadTexture(path,
            // Got texture reference back from the method
            (texture) => {
                Utils.log(texture);
                // Create the material with the texture
                let alpha = 1, beta = 0.5, gamma = 1;
                let diffuseColor = new THREE.Color().setHSL(alpha, 0.5, gamma * 0.5);
                self.sphereMaterial = new THREE.MeshLambertMaterial({
                    map: texture,
                    color: diffuseColor,
					reflectivity: beta
                });

                callback();
            });
        }
        // Emoji type not set
        else { CompileError.noEmojiType(); }
    }

    loadTexture(cover, callback){
        let textureLoader = new THREE.TextureLoader();
        //textureLoader.crossOrigin = 'use-credentials';
        textureLoader.load(cover, (texture) => {
            callback(texture);
        });
    }

    createEmoji(){
        // Create the sphere
        this.sphere = new THREE.Mesh(this.sphereGeometry, this.sphereMaterial);
        // Set the main target
        this.mainTarget = this.sphere; 
    }
    
    setEmojiPosition(){
        // Set default grid system (in case payload not found)
        let depth = 50, axis = 0, level = 0;
        // Fetch grid system variables from element payload
        if (this.el.payload){
            if (this.el.payload.depth){ depth = this.el.payload.depth; }
            if (this.el.payload.axis){ axis = this.el.payload.axis; }
            if (this.el.payload.level){ level = this.el.payload.level; }
        }
        // Calculate elements x y z coordinates based on grid system variables
        let pos = Utils.calculatePosition(depth, axis, level);
        this.sphere.position.x = pos.x;
        this.sphere.position.y = pos.y;
        this.sphere.position.z = pos.z;
        this.sphere.rotation.y = pos.rotation * -1;
    }

    addScene(){
        let scene = Api.get().getScene();
        if (!scene){ CompileError.sceneNotFound(); }
        scene.add(this.sphere);
    }

    attachRenderLoop(){
        // Utilise spin if set
        Spin.init(this.el);
    }

}