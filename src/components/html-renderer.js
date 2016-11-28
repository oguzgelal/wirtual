import Api from '../api';
import CompileError from '../errors/compileError';
import Utils from '../utils';

export default class HtmlRenderer {

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
        // Remove DOM element
        console.log('RENDEREDDDDDD');
        //if (el.dTarget && el.dTarget.parentNode){ el.dTarget.parentNode.removeChild(el.dTarget); }
        // Remove any previous references if exist (for recompiling)
        if (el.vTarget){ delete el.vTarget; }
        // Instantiate scene object and attach it to the element 
        el.vTarget = new HtmlRenderer(el);
    }
 
    init(){ 

        // Get position
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

        // create cdd3d object

        // Fetch content from the stash
        if (this.el.stash){ this.el.dTarget.innerHTML = this.el.stash; }

        // Create an el with <wrhashignore></wrhashignore>
        // which will be detached form the change detection
        var replacementDiv = document.createElement('wrhashignore');
        replacementDiv.className = this.el.dTarget.className;
        replacementDiv.id = this.el.dTarget.id;
        // Copy contents of original renderable to <wrhashignore></wrhashignore>
        replacementDiv.innerHTML = this.el.dTarget.innerHTML;
        // Replace renderable with populated <wrhashignore></wrhashignore>
        this.el.dTarget.parentNode.insertBefore(replacementDiv, this.el.dTarget);
        this.el.dTarget.parentNode.removeChild(this.el.dTarget);
        this.el.dTarget = replacementDiv;

        console.log('*-*-*-*-*-*');
        console.log(replacementDiv);
        console.log(this.el.dTarget);

        // Wrap the contents in a container div
        var containerDiv = document.createElement('DIV');
        containerDiv.innerHTML = this.el.dTarget.innerHTML;

        console.log(containerDiv);

        // Save the content to stash
        if (!this.el.stash){ this.el.stash = ''; }
        this.el.stash = this.el.dTarget.innerHTML;

        this.el.dTarget.innerHTML = '';
        this.el.dTarget.appendChild(containerDiv);
        
        // Create the object.
        var cssObject = new THREE.CSS3DObject(containerDiv);
        
        // reference the same position and rotation
        cssObject.position.x = pos.x;
        cssObject.position.y = pos.y;
        cssObject.position.z = pos.z;
        cssObject.rotation.y = pos.rotation * -1;

        this.mainTarget = cssObject; 

        // get data
        let scene = Api.get().getScene();
        if (!scene){ CompileError.sceneNotFound(); }
        scene.add(cssObject);
        
    }

}