import Api from '../api';
import CompileError from '../errors/compileError';
import Utils from '../utils';

export default class Text {

    constructor(el) {
        // Pointer to the parent
        this.el = el;
        // Make sure DOM representation exists
        if (!this.el.dTarget){ CompileError.dTargetNotFound('text'); return; }
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
        el.vTarget = new Text(el);
    }
 
    init(){
        let self = this;
        self.loadFont(function(){
            // Create the text object
            self.createText();

            // Add text to screen
            self.addScreen();
        });
    }

    loadFont(callback){
        let self = this;
        let loader = new THREE.FontLoader();
        loader.load('assets/fonts/helvetiker_regular.typeface.json', function(response){
            self.font = response;
            if (callback){ callback(); }
        });
    }

    createText(){
        this.createMaterial();
        this.createGeometry();
        this.mesh();
    }

    createMaterial(){
        // Create the materials
        this.materialFront = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
        this.materialSide = new THREE.MeshBasicMaterial( { color: 0x000088 } );
        this.materialArray = [this.materialFront, this.materialSide];
    }

    createGeometry() {
        let inputText = "";
        let size = 10;
        let depth = 5;
        let curveSegments = 3;
        let bevelSize = 1;
        let bevelThickness = 1;

        if (this.el.dTarget.dataset && this.el.dTarget.dataset.text){ inputText = this.el.dTarget.dataset.text; }
        if (this.el.dTarget.dataset && this.el.dTarget.dataset.size){ size = this.el.dTarget.dataset.size; }
        if (this.el.dTarget.dataset && this.el.dTarget.dataset.depth){ depth = this.el.dTarget.dataset.depth; }
        if (this.el.dTarget.dataset && this.el.dTarget.dataset.curveSegments){ curveSegments = this.el.dTarget.dataset.curveSegments; }
        if (this.el.dTarget.dataset && this.el.dTarget.dataset.bevelSize){ bevelSize = this.el.dTarget.dataset.bevelSize; }
        if (this.el.dTarget.dataset && this.el.dTarget.dataset.bevelThickness){ bevelThickness = this.el.dTarget.dataset.bevelThickness; }

        let self = this;
        this.textGeom = new THREE.TextGeometry(inputText, {
            size: size,
            height: depth,
            curveSegments: curveSegments,
            font: self.font,
            bevelThickness: bevelThickness,
            bevelSize: bevelSize,
            bevelEnabled: true,
            material: 0,
            extrudeMaterial: 1
        });
    }

    mesh(){
        // Create text mesh
        this.textMaterial = new THREE.MeshFaceMaterial(this.materialArray);
	    this.text = new THREE.Mesh(this.textGeom, this.textMaterial );
        this.mainTarget = this.text;
        this.setRotation();
        this.setPosition();
    }

    setRotation(){
        let rotation = 0;
        if (this.el.dTarget.dataset && this.el.dTarget.dataset.rotation){ rotation = this.el.dTarget.dataset.rotation; }
        this.text.rotation.x = rotation;
    }

    setPosition(){
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
        this.text.position.x = pos.x;
        this.text.position.y = pos.y;
        this.text.position.z = pos.z;
        this.text.rotation.y = pos.rotation * -1;

        // Compute the positioning of the text object
        this.textGeom.computeBoundingBox();
        this.textWidth = this.textGeom.boundingBox.max.x - this.textGeom.boundingBox.min.x;
        this.text.position.x -= (this.textWidth / 2.0);
    }

    addScreen() {
        // Add element to canvas
        let scene = Api.get().getScene();
        if (!scene){ CompileError.sceneNotFound(); }
        scene.add(this.text);
    }
   

}