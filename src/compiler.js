import Utils from './utils';
import CompileError from './errors/compileError';
import Api from './api';

export default class Compiler {
    constructor() {
        Utils.log('Compiler initiated...');

        this._randomIDLength = 10;
        this._dataHandle = 'data-wid';

        // Start compilation
        this.compile();
    }

    compile(wid) {
        if (!wid) {
            // Fetch the main container
            let container = document.getElementsByClassName('wr-container');
            // Make sure there is only one container
            if (container.length === 0) { CompileError.containerNotFound(); return; }
            if (container.length > 1) { CompileError.multipleContainersFound(); return; }
            // Stamp it with a random ID
            let randomID = '_w' + Utils.random(this._randomIDLength - 2);
            container[0].setAttribute(this._dataHandle, randomID);
            let el = {
                id: randomID,
                dTarget: container[0],
                vTarget: null,
                hash: this.hash(container[0])
            };
            // Add the element to the DOM tree and recurse 
            Api._addElement(randomID, el);
            this.compile(randomID);
        }
        else {
            var element = Api._getElement(wid);
            Utils.log(element);
        }
    }

    hash(el) {
        return el.innerHTML
            .replace(/\s/g, '')
            .replace(/\n/g, '')
            .replace(/\t/g, '')
            .replace(/<!--[\s\S]*?-->/g, '')
            .trim();
    }
}