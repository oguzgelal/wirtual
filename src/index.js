import Compiler from './compiler';
import Api from './api';
import Utils from './utils';

export default class Wirtual {
    constructor(settings) {

        // ----- Initiate the api -----
        // This instantiates the Api class, which exposes the api object 
        // to the 'window' variable. After this is done, all other components
        // can access the api through the window objects.
        new Api(settings);

        // ----- Initiate the compiler -----
        // This will start the compilation of the page 
        new Compiler();

    }
}

// Initiate the library (on page load)
new Wirtual({ debug: true });