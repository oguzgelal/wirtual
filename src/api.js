import Utils from './utils';
import WirtualKeyboard from './builtin/keyboard';

export default class Api {

    constructor(settings) {
        this.settings = settings;
        this.scene = null;
        this.domRoot = null;
        this.dom = {};
        this.renderLoopRunnables = {};
        this.keyboard = new WirtualKeyboard();
    }

    // Returns the active instance of the API
    static get() { return window.Wirtual; }

    isDebug() { return this.settings && this.settings.debug; }

    _addElement(wid, options) { this.dom[wid] = options; }
    _getElement(wid) { return this.dom[wid]; }
    _addElementChildren(wid, childID) {
        let children = this._getElementField(wid, 'children');
        if (!children) { children = []; }
        children.push(childID);
        this._setElementField(wid, 'children', children);
    }
    _getElementField(wid, key) {
        if (this.dom[wid]) { return this.dom[wid][key]; }
        return null;
    }
    _setElementField(wid, key, value) {
        if (this.dom[wid]) { this.dom[wid][key] = value; }
    }

    _setRootElementID(wid) { this.domRoot = wid; }
    _getRootElementID() { return this.domRoot; }

    // Return render loop runnable functions
    _getRenderLoopRunnables(){ return this.renderLoopRunnables; }

    _getWidByID(id) {
        let el = document.getElementById(id);
        if (el){ return el.dataset.wid; }
        return null;
    }

    // Get element with the 'id' attribute (NOT wid)
    getElementByID(id){
        let wid = this._getWidByID(id);
        let dataEl = this._getElement(wid);
        // Return the main threejs object (not internal objects)
        if (dataEl && dataEl.vTarget && dataEl.vTarget.mainTarget){
            return dataEl.vTarget.mainTarget;
        }
        return null;
    }
    // Get the root element
    getRootElement(){
        return this._getElement(this._getRootElementID());
    }
    // Get the active scene
    getScene(){
        var rootElement = this.getRootElement();
        if (!rootElement){ return null; }
        if (!rootElement.vTarget){ return null; } 
        return rootElement.vTarget.scene; 
    }
    // Get the renderer
    getRenderer(){
        var rootElement = this.getRootElement();
        if (!rootElement){ return null; }
        if (!rootElement.vTarget){ return null; } 
        return rootElement.vTarget.renderer; 
    }
    // Get the camera
    getCamera(){
        var rootElement = this.getRootElement();
        if (!rootElement){ return null; }
        if (!rootElement.vTarget){ return null; } 
        return rootElement.vTarget.perspectiveCamera; 
    }

    // Attach runnable to an element through wid
    _attachRunnable(wid, runnableName, runnable){
        let el = this._getElement(wid);
        if (el && typeof runnable === "function"){
            if (!el.runnables){ el.runnables = {}; }
            el.runnables[runnableName] = runnable;
        }
    }

    // Attach runnable to an element using the id attribute (not wid)
    attachRunnable(id, runnableName, runnable){
        let wid = this._getWidByID(id);
        if (wid){ this._attachRunnable(wid, runnableName, runnable); }
    }

    // Attach a function to run on every render loop
    attachGlobalRunnable(runnableName, runnable){ this.renderLoopRunnables[runnableName] = runnable; }
    // Detach a function - useful when an element is removed from DOM
    detachGlobalRunnable(runnableName){ this.renderLoopRunnables[runnableName] = null; }
    
}