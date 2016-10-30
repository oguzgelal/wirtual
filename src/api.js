import Utils from './utils';

export default class Api {

    constructor(settings) {

        this.settings = settings;
        this.scene = null;
        this.domRoot = null;
        this.dom = {};
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

    _setScene(scene) { }
}