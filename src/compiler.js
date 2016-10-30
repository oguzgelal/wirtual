import Utils from './utils';
import CompileError from './errors/compileError';
import Api from './api';

export default class Compiler {

    constructor() {
        Utils.log('Compiler initiated...');

        this.heartbeatRate = 500;
        this.heartbeat = null;
        this.stopHeartbeat = false;

        // Start compilation
        this.initialize();
    }

    initialize() {
        let self = this;
        // Fetch the main container
        let container = document.getElementsByClassName('wr-container');
        // Make sure there is only one container
        if (container.length === 0) { CompileError.containerNotFound(); return; }
        if (container.length > 1) { CompileError.multipleContainersFound(); return; }
        // Stamp it with a random ID
        let randomID = this.stamp(container[0], { parent: null });
        // Set the container as a root element
        Api.get()._setRootElementID(randomID);
        // Stamp and store all the DOM nodes
        this.mark(randomID, 0, function () {
            // TODO: Initially compile starting from the root once.
            // Init watcher
            self.initHeartbeat();
        });
    }

    // Mark (stamp and store) every DOM element
    mark(wid, recursionLevel, callback) {
        let elementCurrentDOM = this.getCurrentDOMState(wid);
        // Recurse throuh children
        for (let child of elementCurrentDOM.children) {
            let childID = '';
            // Child is not stamped
            if (!child.dataset.wid) {
                // Stamp child
                childID = this.stamp(child, { parent: wid });
                // Add child to its parent 
                Api.get()._addElementChildren(wid, childID);
            }
            // Child is stamped
            else { childID = child.dataset.wid; }
            // Call recursion with the child
            this.mark(childID, recursionLevel + 1);
        }
        // All elements marked
        if (recursionLevel === 0) {
            if (callback) { callback(); }
        }
    }

    initHeartbeat() {
        let self = this;
        this.heartbeat = setInterval(function () {
            if (!self.stopHeartbeat) { self.scan(null); }
        }, this.heartbeatRate);
    }

    // Scan for changes starting from given element
    // Manage the store, compile / recompile partially when necessary.
    scan(wid) {
        let self = this;
        // If wid not set, start from the root
        if (!wid) { wid = Api.get()._getRootElementID(); }
        let elementStored = Api.get()._getElement(wid);
        // If the children count changes, some might be unmarked
        // Call mark starting from the current element
        if (this.hasChildrenChange(wid)) {
            // Stop the heartbeat
            this.stopHeartbeat = true;
            // Mark everhthing under current element.
            this.mark(wid, 0, function () {
                // Start heartbeat again
                self.stopHeartbeat = false;
            });
        }
        if (!this.stopHeartbeat) {
            // Only step in if the component has a change
            // Keep stepping in until you find the element that has no change
            // Then, recompile its parent
            if (this.hasChange(wid)) {
                // Element has no children and has a change
                // This means the change is with itself, re-compile
                if (!elementStored.children) { this.compile(wid); }
                // Element has children
                else {
                    // TODO: It compiles the changed element, but also compiled all its parents. Why ?
                    var childrenHasChange = false;
                    for (let childID of elementStored.children) {
                        if (self.hasChange(childID)) {
                            self.scan(childID);
                            childrenHasChange = true;
                        }
                    }
                    // There are changes which is not with children, compile
                    if (!childrenHasChange) { self.compile(wid); }
                }
            }
        }
    }

    // Compile / recompile given element and all its children
    compile(wid) {
        Utils.log('Compiling: ' + wid);
        var currentDOMState = this.getCurrentDOMState(wid);
        Api.get()._setElementField(wid, 'hash', this.hash(currentDOMState))
    }

    // Did the structure of HTML changed
    hasChange(wid) {
        // Fetch stored element data 
        let elementStored = this.getStoredDOMState(wid);
        // Get current state of the DOM element
        let elementCurrentDOM = this.getCurrentDOMState(wid);
        // DOM change if hashes are not the same
        /*
        console.log('Current');
        console.log(elementCurrentDOM);
        console.log('Stored');
        console.log(elementStored);
        console.log('Current - hash');
        console.log(this.hash(elementCurrentDOM));
        console.log('Stored - hash');
        console.log(elementStored.hash);
*/
        return elementStored.hash !== this.hash(elementCurrentDOM);
    }

    // Did more elements have been added or some removed
    hasChildrenChange(wid) {
        // Fetch stored element data 
        let elementStored = this.getStoredDOMState(wid);
        let elementStoredChildren = elementStored.children.length || 0;
        // Get current state of the DOM element
        let elementCurrentDOM = this.getCurrentDOMState(wid);
        let elementCurrentDOMChildren = elementCurrentDOM.children.length || 0;
        // More or less child if not equal 
        return elementStoredChildren !== elementCurrentDOMChildren;
    }

    getStoredDOMState(wid) { return Api.get()._getElement(wid); }
    getCurrentDOMState(wid) { return document.querySelectorAll("[data-wid='" + wid + "']")[0]; }

    elementRemovedFromDOM(wid) {
    }

    isStamped(el) {
    }

    // Stamp DOM element with a random ID and store
    stamp(el, options) {
        let randomID = '_w' + Utils.random(10);
        el.setAttribute('data-wid', randomID);
        let opts = options || {};
        opts.id = randomID;
        opts.dTarget = el;
        opts.vTarget = null;
        // TODO: I think the data-wid property not included in hash. Check it!
        opts.hash = this.hash(el);
        Api.get()._addElement(randomID, opts);
        return randomID;
    }

    hash(el) {
        return el.outerHTML
            .replace(/\s/g, '')
            .replace(/\n/g, '')
            .replace(/\t/g, '')
            .replace(/<!--[\s\S]*?-->/g, '')
            .trim();
    }
}